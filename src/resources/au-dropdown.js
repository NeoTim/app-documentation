import {customElement, bindable, inject} from 'aurelia-framework';

@inject(Element)
@customElement('au-dropdown')
export class AuDropdownElement {
  @bindable value   = null;
  @bindable options = null;
  @bindable active  = null;

  constructor(element) {
    this.element = element;
    this.onBlur = this.onBlur.bind(this);
  }

  attached(){
    this.button.addEventListener('blur', this.onBlur);
  }

  activeChanged(value) {
    this.button.focus();
    this.element.classList[value ? 'add' : 'remove']('is-active');
  }

  onBlur($event) {
    this.active = false;
  }

  onClick($event) {
    this.active = true;
  }

  selectItem($event, item) {
    this.value = item;
    this.active = false;
  }
}
