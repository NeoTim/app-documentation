import {bindable, inject} from 'aurelia-framework';
import {fixIndent} from './util';
import {LocalAPI} from 'services/local';

let map = Array.prototype.map;

@inject(Element, LocalAPI)
export class Example {
  @bindable selectedSource;
  @bindable title;

  constructor(element, api) {
    this.api      = api;
    this.element  = element;
    this.language = api.getLanguage();
  }

  attached() {
    // This should return x.au.controller.model, but for someReason only viewModel exist
    this.availableSources = map.call(this.element.getElementsByTagName('source-code'), x => x.au.controller.viewModel);

    this.languageSubscription =
    this.languageSubscription = this.api.channel.subscribe('language-changed', () => this.selectSourceForLanguage());
    this.selectSourceForLanguage();
  }

  detached() {
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

    function getSource(_x, index) {return 'lang' in _x && _x.lang === priorities[index];}

    for (let i = 0, ii = priorities.length; i < ii; ++i) {
      found = this.availableSources.find(getSource, i);
      if (found) {
        break;
      }
    }
    this.select(found);
  }

  select(source) {
    this.selectedSource = source;
    source.loadText().then(content => {
      this.code.innerHTML = fixIndent(content);
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
