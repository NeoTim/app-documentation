import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class Demo {
  @bindable title;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.element.getElementsByTagName('source-code')[0].au.controller.viewModel.createApp(this.host);
  }
}
