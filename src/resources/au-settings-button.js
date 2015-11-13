import {customElement, bindable, inject} from 'aurelia-framework';
import {OverlayController} from 'resources/au-overlay';
import {AUChannel} from 'services/channel';
import {onTransitionEnd, onDocumentEvent, clickEvent} from './util';
import {DOM} from 'aurelia-pal';
const ACTIVE_CLASSNAME = 'is-active';
const DEFAULT_CLASSNAME = 'au-settings-button';

@customElement('au-settings-button')
@inject(Element, AUChannel, OverlayController)
export class AuSettingsButtonElement {
  @bindable active = null;

  name = 'settings';
  bindableKey = 'active';
  subscriptions = [];

  constructor(element, channel, overlayController) {
    element.className += ` ${DEFAULT_CLASSNAME}`;
    channel.createInstruction(this);

    this.element = element;
    this.channel = channel;
    this.overlay = overlayController.getOrCreateOverlay(this);
  }

  bind() {
    let channel = this.channel;
    let subscriptions = this.subscriptions;

    subscriptions.push(

      channel.subscribe('au-deactivate:navigation', (payload) => {
        !payload.validate(this) && this.close();// if (this.active && !payload.validate(this)) { this.close(); }
      }),

      channel.subscribe('au-activate:settings', (payload) => {
        this.open();
      }),

      channel.subscribe('deactivate-settings', (payload) => {
        this.close();
      })
    );
  }

  unbind() {
    this.subscriptions.forEach(event => event.dispose());
  }

  open() {
    return this.invokeAnimationLifecycle();
  }

  close() {
    if (!this.active) return;
    DOM.dispatchEvent(new Event(clickEvent));
  }

  activeChanged(value) {
    this.onClick = this[value ? 'close' : 'open'];
    this.element.classList[value ? 'add' : 'remove'](ACTIVE_CLASSNAME);
  }

  invokeAnimationLifecycle() {
    this.overlay.attach()
    return this.setActive(true)
      .then(() => this.addListeners())
      .then(() => this.setActive(false))
      .then(() => this.overlay.detach())
      .then(() => this.channel.publish('au-on-deactivate:settings'))
  }

  setActive(value) {
    return onTransitionEnd(this.element, ()=> {
      return this.active = value;
    })
  }

  addListeners() {
    return onDocumentEvent(clickEvent, (e, ready)=> {
      if (!this.element.contains(e.target)) return ready();
    }, true);
  }

  onClick($event) {
    this.open();
  }
}
