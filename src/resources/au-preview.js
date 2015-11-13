import {customElement, bindable, inject} from 'aurelia-framework';

@customElement('au-preview')
export class PreviewElement {
  @bindable view = null;
  @bindable viewModel = null;
}
