import {customElement, bindable} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';
import {inject} from 'aurelia-dependency-injection';
import {isTouch} from 'aurelia-interface-platforms';
import {DOM} from 'aurelia-pal';

const clickEvent = isTouch ? 'touchstart' : 'click';

@customElement('au-select-item')
@inject(Element)
@bindable({
  name: 'value',
  attribute: 'value',
  changeHandler: 'valueChanged',
  defaultBindingMode: bindingMode.twoWay
})
export class SelectItemElement {
  @bindable options = null;
  @bindable active = null;
  @bindable value = null;

  _options = [];
  display = null;

  constructor(element) {
    this.element = element;
    this.element.tabIndex = '0';
    this.onClick = this.onClick.bind(this);
  }

  bind() {
    this.parentElement = this.element.parentElement;
    this.optionsChanged(this.options);
  }

  valueChanged(value, oldValue) {
    this.change && this.change(value, oldValue);
    this.setDisplay(value);
  }

  activeChanged(value) {
    if (this.options.length < 2) return;
    if (value) this.addListeners();

    if (this.container) {
      this.container.style.height = this.parentElement.clientHeight + 'px';
    }
    if (this.parentElement) {
      this.parentElement.classList[value ? 'add' : 'remove']('active-item');
    }
  }

  optionsChanged(options) {
    this._options = options.map((o)=> {
      if (typeof o === 'string') {
        return {text: o, value: o};
      } else {
        return o;
      }
    });
    this.setDisplay(this.value);
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

  setDisplay(value) {
    this.display = this._options.find(o => {
      if (typeof o === 'string' && o === value) {
        return true;
      } else if (o.value === value) {
        return true;
      }
      return false;
    });
  }
}
