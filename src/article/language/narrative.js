import {bindable, processContent, noView, inject} from 'aurelia-framework';
import {fixIndent} from './util';
import commonmark from 'commonmark';

@processContent(false)
@noView()
@inject(Element)
export class Narrative {
  @bindable format = 'markdown';
  @bindable version;
  @bindable uid;
  @bindable versionMatches;
  @bindable value;

  constructor(element) {
    this.element = element;

    if (element.innerHTML) {
      this.setContent(element.innerHTML);
    }
  }

  valueChanged(newValue) {
    if (newValue) {
      this.setContent(newValue);
    }
  }

  setContent(markdown) {
    markdown = fixIndent(markdown);
    markdown = fixBlockQuotes(markdown);
    this.element.innerHTML = getHtml(markdown);
    updateAnchorTargets(this.element);
  }
}

let reader = new commonmark.Parser();
let writer = new commonmark.HtmlRenderer();

function isExternalLink(url) {
  return ( ( url.indexOf(':') > -1 || url.indexOf('//') > -1 ) && checkDomain(location.href) !== checkDomain(url) );
}

function getHtml(markdown) {
  return writer.render(reader.parse(markdown));
}

function fixBlockQuotes(markdown) {
  return markdown.replace(/^(\s*)&gt;/gim, (match, p1) => p1 + '>');
}

function updateAnchorTargets(element) {
  // external links need target="_blank"
  let anchors = element.getElementsByTagName('a');

  for (let i = 0, ii = anchors.length; i < ii; i++) {
    if (isExternalLink(anchors[i].href)) {
      anchors[i].target = '_blank';
    }
  }
}
