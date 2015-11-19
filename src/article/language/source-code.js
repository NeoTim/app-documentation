import {inject, Container} from 'aurelia-dependency-injection';
import {bindable, processContent, noView, TargetInstruction} from 'aurelia-templating';
import {Aurelia} from 'aurelia-framework';
import {join} from 'aurelia-path';
import {Loader} from 'aurelia-loader';

@noView()
@processContent(extractRawSource)
@inject(TargetInstruction, Loader)
export class SourceCode {
  @bindable src;
  @bindable lang;

  constructor(instruction, loader) {
    this.raw = instruction.elementInstruction.raw;
    this.loader = loader;
  }

  bind(context) {
    if (this.src) {
      this.path = join(context.url, '../../../' + this.src);
      if (context.local) {
        this.path = './' + this.path;
      }
    }
  }

  loadText() {
    if (this.path) {
      return this.loader.loadText(this.path).then(x => this.raw = x);
    }

    return Promise.resolve(this.raw);
  }

  createApp(host) {
    this.app = new Aurelia(this.loader, new Container());
    this.app.use.standardConfiguration();
    this.app.start().then(a => a.setRoot(this.path, host));
  }
}

function extractRawSource(compiler, resources, element, instruction) {
  instruction.raw = unescape(element.innerHTML);
  element.innerHTML = '';
  return false;
}
