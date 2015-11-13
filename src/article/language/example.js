import {bindable, inject} from 'aurelia-framework';
import {Language} from 'services/language';
import {fixIndent} from './util';

let map = Array.prototype.map;

@inject(Element, Language)
export class Example {
  @bindable selectedSource;
  @bindable title;

  constructor(element, language) {
    this.element = element;
    this.language = language;
  }

  attached() {
    // This should return x.au.controller.model, but for someReason only viewModel exist
    this.availableSources = map.call(this.element.getElementsByTagName('source-code'), x => x.au.controller.viewModel);

    this.languageSubscription = this.language.onChange(() => this.selectSourceForLanguage())
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

    for (let i = 0, ii = priorities.length; i < ii; ++i) {
      found = this.availableSources.find(x => x && (x.lang === priorities[i]) );
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
