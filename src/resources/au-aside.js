import {noView, customAttribute, customElement, bindable, inject, sync} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('au-aside')
@inject(Element, EventAggregator)
export class AuAsideElement {
  @bindable open = null;
  @sync('[au-menu-item]') _items = [];
  items = [];

  constructor(element, events, dom) {
    this.element = element;
    this.closeEvent = this.closeEvent.bind(this);
    this.events = events;
  }

  created() {
    let events = this.events;
    events.subscribe('toggle-aside', (payload)=> {
      this.open = payload.open;
    });

    events.subscribe('screen-navigation', payload => {
      if (!payload.type === 'aside') this.open = false;
    });

    events.subscribe('set-au-menu', (view)=> {
      this.setContent(view.name, view);
    });
  }

  attached() {
    this.parentElement = this.element.parentElement;
  }

  openChanged(value) {
    this.element.classList[value ? 'add' : 'remove']('is-open');

    if (this.parentElement) {
      this.parentElement.classList[value ? 'add' : 'remove']('active-navigation');
    }

    this.setCloseEvent(value, this.parentElement);

    if (value) {
      this.events.publish('screen-navigation', {nav:this, type:'aside'});
    } else {
      this.events.publish('stop-screen-navigation', {nav:this, type:'aside'});
    }
  }

  setCloseEvent(value, parent) {
    if (parent && value) {
      if (!this.isCloseEvent) {
        this.isCloseEvent = true;
        return this.parentElement.addEventListener('click', this.closeEvent, true);
      }
    }

    if (parent && !value) {
      if (this.isCloseEvent) {
        this.isCloseEvent = false;
        return this.parentElement.removeEventListener('click', this.closeEvent, true);
      }
    }
  }

  closeEvent($event) {
    this.open = false;
  }

  setContent(name, view) {
    if (this.activeView) {
      this.content.removeChild(this.activeView.element);
    }

    this.activeView = view;
    this.content.appendChild(this.activeView.element);
  }
}


@customElement('au-aside-placeholder')
@noView
@inject(Element)
export class AuAsidePlaceholderElement {
  constructor(element) {}
  attached(){}
}
