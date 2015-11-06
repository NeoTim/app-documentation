import {customElement, bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('au-settings-button')
@inject(Element, EventAggregator)
export class AuSettingsButtonElement {
  @bindable active = null;
  clickEvent = 'touchstart';

  constructor(element, events) {
    this.element = element;
    this.events = events;
    this.onClick = this.onClick.bind(this);
    this.onDocumentTouch = this.onDocumentTouch.bind(this);

    if (document.aureliaInterface && !document.aureliaInterface.device.isTouch()) {
      this.clickEvent = 'click';
    }

    events.subscribe('screen-navigation', payload => {
      if (payload.type !== 'settings-button') this.active = false;
    });
  }

  attached(){
    this.pageHost = document.getElementById('pageHost');
  }

  detached() {
    this.button.removeEventListener(this.clickEvent, this.touchstart);
  }

  activeChanged(value) {
    this.element.classList[value ? 'add' : 'remove']('is-active');
    this.pageHost.classList[value ? 'add' : 'remove']('is-active-settings');

    if (value) {
      this.events.publish('screen-navigation', {nav:this, type:'settings-button'});
    } else {
      this.events.publish('stop-screen-navigation', {nav:this, type:'settings-button'});
    }
  }

  onClick($event) {
    this.active = !this.active;
  }

  onDocumentTouch($event) {
    if (!this.element.contains($event.target)) {
      this.active = false;
    }
  }
}
