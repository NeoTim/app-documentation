import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';
import {isTouch} from 'aurelia-interface-platforms';
import {DOM} from 'aurelia-pal';

const clickEvent = isTouch ? 'touchstart' : 'click';

@customElement('au-dropdown')
@inject(Element)
@bindable({
  name: 'value',
  attribute: 'value',
  changeHandler: 'valueChanged',
  defaultBindingMode: bindingMode.twoWay
})
export class DropdownElement {
  @bindable options = null;
  @bindable active = null;

  constructor(element) {
    this.element = element;
    this.onClick = this.onClick.bind(this);
  }

  valueChanged(value) {
    this.change && this.change(value);
    this.active = false;
  }

  activeChanged(value) {
    this.element.classList[value ? 'add' : 'remove']('is-active');
    if (value) this.addListeners();
  }

  addListeners() {
    DOM.addEventListener(clickEvent, this.onClick, true);
  }

  removeListeners() {
    DOM.removeEventListener(clickEvent, this.onClick, true);
  }

  onClick(event) {
    if (!this.element.contains(event.target)) {
      this.active = false;
      this.removeListeners();
    }
  }
}
