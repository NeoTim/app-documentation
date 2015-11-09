import {Culture} from 'services/culture';
import {Language} from 'services/language';
import {Profile} from 'services/profile';
import {AUChannel} from 'services/channel';
import {OverlayController} from 'resources/au-overlay';
import {inject} from 'aurelia-framework';

@inject(Element, Culture, Language, Profile, AUChannel, OverlayController)
export class App {

  constructor(element, culture, language, profile, channel, overlayController) {
    this.culture  = culture;
    this.language = language;
    this.profile  = profile;
    this.channel  = channel;
    this.element  = element;
    this.overlayController = overlayController;
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
     this.overlayContainer = this.overlayController.registerContainer(this, this.element);
  }

  openAside($event) {
    this.title = this.router.currentInstruction.config.title;
    this.channel.publish('activate-aside');
  }
}
