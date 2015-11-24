import {noView, customElement, bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {AUChannel} from 'services/channel';
import {OverlayController} from 'resources/au-overlay';
import {onTransitionEnd, onDocumentEvent, clickEvent, resolvePromise} from './util';
import {ScreenSize} from 'services/screen-size';
import {Cache} from 'services/cache';
const ACTIVE_CLASSNAME = 'is-active';
const DEFAULT_CLASSNAME = 'au-aside';

@customElement('au-aside')
@inject(Element, AUChannel, OverlayController, ScreenSize, Cache)
export class AuAsideElement {

  @bindable active = null;

  name = 'aside';
  bindableKey = 'active';
  eventListeners = [];
  subscriptions = [];

  constructor(element, channel, overlayController, screenSize, cache) {
    element.className += ' ' + DEFAULT_CLASSNAME;
    channel.createInstruction(this, this.name, this.bindableKey);
    this.cache = cache;
    this.element  = element;
    this.channel  = channel;
    this.screenSize = screenSize;
    this.overlay  = overlayController.createOverlay(this);
    this.onTransitionEnd = onTransitionEnd(this.element);
  }

  bind() {
    let channel = this.channel;
    let subscriptions = this.subscriptions;
    subscriptions.push(

      channel.subscribe('au-deactivate:navigation', (payload) => {
        !payload.validate(this) && this.close();
      }),
      channel.subscribe('au-activate:aside', (x)=> {
        resolvePromise(this.open(), x);
      }),
      channel.subscribe('au-deactivate:aside', (x)=> {
        resolvePromise(this.close(), x);
      })
    );

    // Check the screen size to make sure we are atleast large than a medium screen.
    // If larger than Medium, Check the cache for current sidebar state.
    // Set the current active state.
    if (this.screenSize.from('md')) {
      let active = this.cache.getItem('au-sidebar.current');
      if (active !== undefined) {
        this.active = active;
      }
    }
  }

  unbind() {
    this.subscriptions.forEach(event => event.dispose());
  }

  activeChanged(value) {
    this.element.classList[value ? 'add' : 'remove'](ACTIVE_CLASSNAME);

    // If the screen size is atleast greater than medium.
    // Save the current sidebar state.
    if (this.screenSize.from('md')) {
      this.cache.setItem('au-sidebar.current', value);
    }
  }

  open() {
    return this.invokeAnimationLifecycle();
  }

  close() {
    if (this.active) {
      return new Promise( resolve => {
        let event = this.channel.subscribe('au-on-deactivate:aside', (promise) => {
          event.dispose();
          resolve(promise);
        });
        DOM.dispatchEvent(new Event(clickEvent));
      });
    }
  }

  toggle() {
    this[this.active ? 'close' : 'open']();
  }

  invokeAnimationLifecycle() {
    // If the screen is less than medium, the activate the overlay.
    if (this.screenSize.fromTo('xs', 'md')) this.overlay.attach();
    return this.setActive(true)
      .then(() => this.addListeners())
      .then(() => this.setActive(false))
      .then(() => this.overlay.detach())
      .then(() => this.channel.publish('au-on-deactivate:aside'));
  }

  setActive(value) {
    return this.onTransitionEnd( ()=> this.active = value );
  }

  addListeners() {
    return onDocumentEvent(clickEvent, (e, ready)=> {
      if (!this.element.contains(e.target)) return ready();
    }, true);
  }
}

@customElement('au-aside-placeholder')
@noView
@inject(Element)
export class AuAsidePlaceholderElement {
  constructor(element) {}
  attached() {}
}
