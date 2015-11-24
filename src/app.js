import {LocalAPI} from 'services/local';
import {AUChannel} from 'services/channel';
import {OverlayController} from 'resources/au-overlay';
import {inject} from 'aurelia-dependency-injection';
import {isTouch} from 'aurelia-interface-platforms';
// import {doubleTap} from 'resources/util';

@inject(Element, AUChannel, OverlayController, LocalAPI)
export class App {

  constructor(element, channel, overlayController, api) {
    this.culture  = api.getCulture();
    this.language = api.getLanguage();
    this.profile  = api.getProfile();
    this.api      = api;
    this.channel  = channel;
    this.element  = element;
    this.overlayController = overlayController;

    channel.subscribe('au-scrollTo', value => {
      let scrollContainer = document.querySelector('.page-host');
      scrollContainer.scrollTop = value;
    });
  }

  configureRouter(config, router) {
    config.title = 'Aurelia Docs';
    config.addPipelineStep('postcomplete', ScrollToTop);
    config.map([
      {
        route: [''],
        settings: {
          isArticle: true
        },
        viewPorts: {
          default: {moduleId: 'article/index', title: 'Article'},
          menu: {moduleId: 'article/menu', title: 'Article'}
        }
      },
      {
        route: ':userName/:productName/:version/doc/article',
        settings: {
          isArticle: true
        },
        viewPorts: {
          default: {moduleId: 'article/index', title: 'Article'},
          menu: {moduleId: 'article/menu', title: 'Article'}
        }
      },
      {
        route: 'doc/article',
        name: 'local',
        settings: {
          isArticle: true
        },
        viewPorts: {
          default: {moduleId: 'article/index', title: 'Local Article'},
          menu: {moduleId: 'article/menu', title: 'Article'}
        }
      },
      {
        route: 'api',
        settings: {
          isApi: true
        },
        viewPorts: {
          default: {moduleId: 'api/index', title: 'API'},
          menu: {moduleId: 'api/menu', title: 'API'}
        }
      },
      {
        route: ':userName/:productName/:version/doc/api',
        settings: {
          isApi: true
        },
        viewPorts: {
          default: {moduleId: 'api/index', title: 'API'},
          menu: {moduleId: 'api/menu', title: 'API'}
        }
      }
    ]);
    this.router = router;
  }

  activate() {
    this.overlayContainer = this.overlayController.registerContainer(this, this.element);
  }

  attached() {
    if (isTouch) {
      // doubleTap(this.header, (event)=> {
      //   this.channel.publish('au-scrollTo', 0);
      // });
    }
  }

  openAside($event) {
    this.title = this.router.currentInstruction.config.title;
    this.aside.open();
  }
}

@inject(AUChannel)
class ScrollToTop {
  constructor(channel) {
    this.channel = channel;
  }
  run(instruction, next) {
    this.channel.publish('au-scrollTo', 0);
    return next();
  }
}
