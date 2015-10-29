import {customElement, bindable, inject} from 'aurelia-framework';

@inject(Element)
@customElement('au-dropdown')
export class AuDropdownElement {
  @bindable value   = null;
  @bindable options = null;
  @bindable active  = null;

  constructor(element) {
    this.element = element;
  }

  attached(){
    this.button.tabIndex = -1;
  }

  selectItem($event, item) {
    this.value = item;
  }
}
