import {customElement} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';


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
