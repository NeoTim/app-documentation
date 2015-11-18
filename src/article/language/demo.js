import {bindable, inject, child} from 'aurelia-framework';

@inject(Element)
export class Demo {
  @bindable title;
  @child('source-code') sourceCode;

  constructor(element) {
    this.element = element;
  }

  bind() {
    this.sourceCode.createApp(this.host);
  }
}
