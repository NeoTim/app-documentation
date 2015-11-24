import {noView, customAttribute, customElement, bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {AUChannel} from 'services/channel';
import {isTouch} from 'aurelia-interface-platforms';

function translateIndicator(element, indicator) {
  if (!indicator) return;
  let top = element.offsetTop + 'px';
  let translate = `translate(0, ${top})`;
  indicator.style.webkitTransform = translate;
  indicator.style.mozTransform = translate;
  indicator.style.msTransform = translate;
  indicator.style.oTransform = translate;
  indicator.style.transform = translate;
}

@customElement('au-menu')
@inject(Element, AUChannel)
export class AuMenuElement {

  @bindable name = null;
  subscriptions = [];
  initialized = false;

  constructor(element, channel) {
    this.element = element;
    this.channel = channel;
    this.onTouchend = this.onTouchend.bind(this);
  }
  bind() {
    let channel = this.channel;
    let subscriptions = this.subscriptions;
    subscriptions.push(
      // Handles menu-indicator, Published from individual menu-items when selected
      channel.subscribe('au-menu:set-active', (element) => {
        translateIndicator(element, this.indicator);
      })
    );

    // Handles issue when on touch device, a menuItem is navigated, the sidebar should close;
    if (isTouch) {
      this.element.addEventListener('touchend', this.onTouchend, true);
    }
  }

  unbind() {
    this.subscriptions.forEach(evt => evt());

    // Handles issue when on touch device, a menuItem is navigated, the sidebar should close;
    if (isTouch) {
      this.element.removeEventListener('touchend', this.onTouchend, true);
    }
  }

  onTouchend(event) {
    this.channel.publish('au-deactivate:aside');
  }
}

@customAttribute('au-menu-item')
@noView
@inject(Element, AUChannel)
export class AuMenuItemAttribute {
  @bindable item = null;
  @bindable active = null;
  @bindable indicator = null;

  constructor(element, channel) {
    this.element = element;
    this.channel = channel;
  }

  attached() {
    if (this.active) {
      this.channel.publish('au-menu:set-active', this.element);
    }
  }

  activeChanged(value) {
    this.element.classList[value ? 'add' : 'remove']('active');
    if (value) this.channel.publish('au-menu:set-active', this.element);
  }
}
