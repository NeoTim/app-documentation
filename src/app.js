import {Culture} from 'services/culture';
import {Language} from 'services/language';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, Culture, Language, EventAggregator)
export class App {
  constructor(element, culture, language, events) {
    this.culture = culture;
    this.language = language;
    this.events = events;
    this.element = element;
  }

  configureRouter(config, router) {
    config.title = 'Aurelia Docs';
    config.map([
      { route: '', moduleId: 'article/index', title: 'Article' },
      { route: ':userName/:productName/:version/doc/article', moduleId: 'article/index', title: 'Article' },
      { route: 'doc/article', moduleId: 'article/index', title: 'Local Article', name: 'local' },

      { route: 'api', moduleId: 'api/index', title: 'API' },
      { route: ':userName/:productName/:version/doc/api', moduleId: 'api/index', title: 'API' }
    ]);
    this.router = router;
  }

  activate() {
    this.events.subscribe('screen-navigation', (payload)=> this.element.classList.add(`active-navigation-${payload.type}`))
    this.events.subscribe('stop-screen-navigation', (payload)=> this.element.classList.remove(`active-navigation-${payload.type}`))
  }

  openAside($event) {
    this.title = this.router.currentInstruction.config.title;
    this.events.publish('toggle-aside', {open: true});
  }
}
