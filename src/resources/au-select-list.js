import {inlineView, customElement, bindable, inject} from 'aurelia-framework';


@customElement('au-select-list')
@inject(Element)
export class SelectListElement {
  @bindable active = null;
  items = [];

  constructor(element) {
    this.element = element;
  }

  attached(){

  }

  activeChanged(activeItem) {
    this.element.classList[activeItem ? 'add' : 'remove']('active-item');
  }

  getHeight() {
    return this.element.clientHeight
  }
}
