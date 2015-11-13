import {noView, customElement, bindable, inject} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';
import {AUChannel} from 'services/channel';
import {OverlayController} from 'resources/au-overlay';
import {onTransitionEnd, onDocumentEvent, clickEvent, resolvePromise} from './util';


const ACTIVE_CLASSNAME = 'is-active';
const DEFAULT_CLASSNAME = 'au-aside';

@customElement('au-aside')
@inject(Element, AUChannel, OverlayController)
export class AuAsideElement {

  @bindable active = null;

  name = 'aside';
  bindableKey = 'active';
  eventListeners = [];
  subscriptions = [];

  constructor(element, channel, overlayController) {
    element.className += ` ${DEFAULT_CLASSNAME}`;
    channel.createInstruction(this, this.name, this.bindableKey);

    this.element  = element;
    this.channel  = channel;
    this.overlay  = overlayController.createOverlay(this);
    this.onTransitionEnd = onTransitionEnd(this.element);
    window.aside = this;
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
      }),
    );
  }

  unbind() {
    this.subscriptions.forEach(event => event.dispose());
  }

  activeChanged(value) {
    this.element.classList[value ? 'add' : 'remove'](ACTIVE_CLASSNAME);
  }

  open() {
    return this.invokeAnimationLifecycle();
  }

  close() {
    if (!this.active) return;
    return new Promise( resolve => {
      let event = this.channel.subscribe('au-on-deactivate:aside', (promise) => {
        event.dispose();
        resolve(promise);
      })
      DOM.dispatchEvent(new Event(clickEvent));
    });
  }

  invokeAnimationLifecycle() {
      this.overlay.attach()
    return this.setActive(true)
      .then(() => this.addListeners())
      .then(() => this.setActive(false))
      .then(() => this.overlay.detach())
      .then(() => this.channel.publish('au-on-deactivate:aside'))
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
  attached(){}
}
