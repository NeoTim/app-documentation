import {noView, customAttribute, customElement, bindable, inject} from 'aurelia-framework';

function translateIndicator(element, indicator) {
  let top = element.offsetTop + 'px';
  let translate = `translate(0, ${top})`;
  indicator.style.webkitTransform = translate;
  indicator.style.mozTransform = translate;
  indicator.style.msTransform = translate;
  indicator.style.oTransform = translate;
  indicator.style.transform = translate;
}

@customAttribute('au-menu-item')
@noView
@inject(Element)
export class AuMenuItemAttribute {
  @bindable item = null;
  @bindable active = null;
  @bindable indicator = null;

  constructor(element) {
    this.element = element;
  }
  bind($parent) {
    this.$parent = $parent.$parent;
  }

  attached(){
    if (this.$parent) {
      this.indicator = this.$parent.indicator;
    }
  }

  activeChanged(value) {
    value && console.log(this);
    if (value && this.indicator) {
      translateIndicator(this.element, this.indicator);
    }
  }
}

