import {customElement, bindable, inject, Container} from 'aurelia-framework';

export class TableOfContents {
  naratives = [];
  constructor() {}

  addNarrative(options) {
    this.naratives.push(options);
  }
}

@customElement('au-preview')
@inject(Element, Container)
export class PreviewElement {
  @bindable view = null;
  @bindable viewModel = null;
  titles = [];

  constructor(element, container) {
    this.element = element;
    this.container = container;
  }

  attached() {
  }
}
