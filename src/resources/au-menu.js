import {inlineView, noView, customAttribute, customElement, bindable, inject, sync} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

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
@inject(Element, EventAggregator)
export class AuMenuElement {
  @bindable name = null;
  constructor(element, events) {
    this.element = element;
    this.events = events;
  }

  bind(bindingContext) {
    this.bindingContext = this.bindingContext || bindingContext;
    this.events.publish('set-au-menu', this);
  }

  attached() {
    this.events.subscribe('au-menu:set-active', element => {
      console.log(element.offsetTop)
      translateIndicator(element, this.indicator);
    });
  }

  detached() {}
}

@customAttribute('au-menu-item')
@noView
@inject(Element, EventAggregator)
export class AuMenuItemAttribute {
  @bindable item = null;
  @bindable active = null;
  @bindable indicator = null;

  constructor(element, events) {
    this.element = element;
    this.events = events;
  }

  activeChanged(value) {
    this.element.classList[value ? 'add' : 'remove']('active');
    if (value) this.events.publish('au-menu:set-active', this.element);
  }
}

