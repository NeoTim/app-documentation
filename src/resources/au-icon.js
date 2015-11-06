import {inlineView, customElement, inject, bindable} from 'aurelia-framework';

const faRegex = /^fa\-/;
function faPrefix(icon, isfa) {
  isfa = isfa || isFa(icon);
  return isfa ? icon : `fa-${icon}`;
}

function isFa(icon) {
  return faRegex.test(icon);
}

const aiRegex = /ai\-/gi;
function auPrefix(className) {
  return aiRegex.test(className) ? className : `au-${className}`;
}

@customElement('au-icon')
@inlineView('<template class="${actualClass}"><i ref="iel"><content></content></i></template>')
@inject(Element)
export class IconElement {

  @bindable icon   = null;
  @bindable faIcon = null;
  @bindable nextIcon = null;
  @bindable next = null;

  taxtValue = null;

  className = 'au-icon aucon';
  constructor(element) {
    element.className += ` ${this.className}`;
    this.element = element;
  }

  transformers = {
    scale: 1,
    rotate:0,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
  };

  attached() {
    if (!this.icon) {
      this.fetchIcon();
    }
    this.iel.setAttribute('data-text', this.textValue);
    this.iel.innerText = '';
  }

  iconChanged(icon) {
    this.iconClass = auPrefix(icon.toLowerCase());
    this.actualClass = this.iconClass;
  }

  nextIconChanged(icon) {
    this.nextClass = auPrefix(icon.toLowerCase());
  }

  nextChanged(value) {
    if (value) {
      this.element.style.transform = 'rotate(180deg)';
      this.actualClass = this.nextClass;
    } else {
      this.element.style.transform = 'rotate(0deg)';
      this.actualClass = this.iconClass;
    }
  }

  fetchIcon() {
    let icon = '';
    icon = this.textValue || (this.iel ? (this.iel.innerText) : icon).toString().toLowerCase();
    this.textValue = icon;
    this.icon = icon;
  }

  rotateChanged(rotate) {
    this.transformers.rotate = rotate;
    this.element.style.transform = this.transform;
  }
}
