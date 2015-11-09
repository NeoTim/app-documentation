import {noView, customElement, bindable, inject, singleton} from 'aurelia-framework';
import {AUChannel} from '../services/channel';
import {DOM} from 'aurelia-pal';
import {isTouch} from 'aurelia-interface-platforms';

const ACTIVE_CLASSNAME = 'is-active';
const DEFAULT_CLASSNAME = 'au-overlay';
const clickEvent = isTouch ? 'touchstart' : 'click';

export class OverlayElement {
  element = DOM.createElement('overlay');
  eventListeners = [];

  constructor(parent) {
    this.parent = parent;
    this.element.addEventListener(clickEvent, this._onClick.bind(this), false);
    return this;
  }

  attach() {
    this.parent.element.appendChild(this.element);
  }

  detach() {
    this.parent.fragment.appendChild(this.element);
  }

  destroy() {
    this.element.removeEventListener(clickEvent, this._onClick);
    this.element.remove();
  }

  _onClick($event) {
    this.destroy();
    this.eventListeners.forEach(e => e($event));
  }

  onClick(callback) {
    this.eventListeners.push(callback);
  }
}

@inject(AUChannel)
export class OverlayController {
  element = DOM.createElement('au-overlay');
  fragment = DOM.createDocumentFragment();
  constructor(channel) {
    this.channel = channel;
  }

  registerContainer(context, element) {
    this.context = context;
    this.container = element;
    this.container.appendChild(this.element);
    return this;
  }

  destroyContainer() {
    this.container.removeChild(this.element);
  }

  createOverlay() {
    return new OverlayElement(this);
  }

  activate() {
    this.element.classList.add(ACTIVE_CLASSNAME);
  }

  deactivate() {
    this.element.classList.remove(ACTIVE_CLASSNAME);
  }
}
