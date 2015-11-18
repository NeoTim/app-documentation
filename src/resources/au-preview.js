import {customElement, bindable, inject} from 'aurelia-framework';


@customElement('au-preview')
@inject(Element)
export class PreviewElement {
  @bindable view = null;
  @bindable viewModel = null;
  titles = [];

  constructor(element) {
    this.element = element;
  }

  attached() {
    let sections = this.element.querySelectorAll('narrative');
    console.log(sections);
  }
}
