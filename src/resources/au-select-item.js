import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';
import {isTouch} from 'aurelia-interface-platforms';
import {DOM} from 'aurelia-pal';

const clickEvent = isTouch ? 'touchstart': 'click';

@customElement('au-select-item')
@inject(Element)
@bindable({
  name:'value',
  attribute:'value',
  changeHandler:'valueChanged',
  defaultBindingMode: bindingMode.twoWay
})
export class SelectItemElement {
  @bindable options = null;
  @bindable active = null;

  constructor(element) {
    this.element = element;
    this.element.tabIndex = '0';
    this.onClick = this.onClick.bind(this);
  }

  bind() {
    this.parentElement = this.element.parentElement;
  }

  valueChanged(value, oldValue) {
    this.change && this.change(value, oldValue);
  }

  activeChanged(value) {
    if (value) this.addListeners();

    if (this.container) {
      this.container.style.height = this.parentElement.clientHeight + 'px';
    }
    if (this.parentElement) {
      this.parentElement.classList[value ? 'add' : 'remove']('active-item');
    }
  }

  addListeners() {
    DOM.addEventListener(clickEvent, this.onClick, true);
  }

  removeListeners() {
    DOM.removeEventListener(clickEvent, this.onClick, true);
  }

  change() {
    this.active = false;
    this.removeListeners();
  }

  onClick(event) {
    if (!this.element.contains(event.target)) {
      this.active = false;
      this.removeListeners();
    }
  }
}
