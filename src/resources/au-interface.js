import {bindable, containerless} from 'aurelia-framework';

@containerless()
export class AuInterface {
  @bindable value;
  isExpanded = false;
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}