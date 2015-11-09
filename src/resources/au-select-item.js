import {customElement, bindable, inject} from 'aurelia-framework';
import {isTouch} from 'aurelia-interface-platforms';

@inject(Element)
@customElement('au-select-item')
export class SelectItemElement {
  @bindable options = null;
  @bindable active = null;
  @bindable value = null;

  constructor(element) {
    this.onClick = this.onClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.element = element;
    element.tabIndex = '0';
  }

  created(view) {
    this.list = view.container.viewModel;
    this.clickEvent = isTouch ? 'touchstart': 'click';
  }

  attached(){
    this.parentElement = this.element.parentElement;
  }

  detached() {
    this.button.removeEventListener(this.clickEvent, this.onClick, false);
    this.container.removeEventListener(this.clickEvent, this.onSelect);
  }


  activeChanged(value) {
    if (this.container) {
      this.container.style.height = (this.list.getHeight() + 'px');
    }
    if (this.parentElement) {
      this.parentElement.classList[value ? 'add' : 'remove']('active-item');
    }
  }

  onClick(event) {
    if (!this.active) {
      this.active = true;
    }
  }

  onSelect($event, value) {
    this.active = false;
    this.value = value;
  }
}
