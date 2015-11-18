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

  constructor(element) {
    this.element = element;
    let script = element.getElementsByTagName('script')[0];
    this.setContent(unescape(script.innerHTML));
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

function checkDomain(url) {
  if (url.indexOf('//') === 0 ) {
    url = location.protocol + url;
  }
  return url.toLowerCase().replace(/([a-z])?:\/\//,'$1').split('/')[0];
}

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
