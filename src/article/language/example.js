import {bindable, inject, children} from 'aurelia-framework';
import {fixIndent} from './util';
import {LocalAPI} from 'services/local';

let map = Array.prototype.map;

function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}


@inject(Element, LocalAPI)
export class Example {
  @bindable selectedSource;
  @bindable title;
  @children('source-code') availableSources = [];

  constructor(element, api) {
    this.api      = api;
    this.element  = element;
    this.language = api.getLanguage();
  }

  bind() {
    this.languageSubscription = this.api.channel.subscribe('language-changed', () => this.selectSourceForLanguage());
    this.selectSourceForLanguage();

    let pre = this.element.getElementsByTagName('pre')[0];
    pre.insertBefore(this.tag, pre.firstChild);
  }

  unbind() {
    this.languageSubscription.dispose();
  }

  selectSourceForLanguage() {
    let found;
    let priorities = [
      this.language.current,
      'ES 2016',
      'ES 2015',
      'TypeScript',
      'HTML'
    ];

    for (let i = 0, ii = priorities.length; i < ii; ++i) {
      found = this.availableSources.find(x => x.lang === priorities[i]);
      if (found) {
        break;
      }
    }

    this.select(found || this.availableSources[0]);
  }

  select(source) {
    this.selectedSource = source;
    source.loadText().then(content => {
      this.code.innerHTML = fixIndent(htmlEscape(content));
      applySyntaxHighlighting(source.lang, this.code);
    });
  }
}

function applySyntaxHighlighting(language, element) {
  // trim the code to avoid strange appearance with line numbers.
  element.textContent = element.textContent.trim();
  element.className = (languageLookup[language] || 'language-javascript');
  Prism.highlightElement(element);
}

let languageLookup = {
  'HTML': 'language-markup'
};
