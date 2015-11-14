import {noView, customAttribute, customElement, bindable, inject} from 'aurelia-framework';
import {AUChannel} from 'services/channel';


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

  constructor(element, channel) {
    this.element = element;
    this.channel = channel;
  }
  bind() {
    let channel = this.channel;
    let subscriptions = this.subscriptions;

    subscriptions.push(
      channel.subscribe('au-menu:set-active', (element) => {
        translateIndicator(element, this.indicator);
      })
    );
  }

  unbind() {
    this.subscriptions.forEach(evt => evt());
  }

  detached() {}
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

