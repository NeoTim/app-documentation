import {bindable, child} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';

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
