import {customElement, bindable} from 'aurelia-framework';

@customElement('au-preview')
export class PreviewElement {
  @bindable view = null;
  @bindable viewModel = null;
}
