import {customElement, inject} from 'aurelia-framework';


@customElement('au-select-list')
@inject(Element)
export class SelectListElement {

  constructor(element) {
    this.element = element;
  }

  activeChanged(activeItem) {
    this.element.classList[activeItem ? 'add' : 'remove']('active-item');
  }

  getHeight() {
    return this.element.clientHeight;
  }
}
