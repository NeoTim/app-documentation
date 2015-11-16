import {inject} from 'aurelia-framework';
import {Server} from 'backend/server';
import {LocalAPI} from 'services/local';
import {AUChannel} from 'services/channel';

@inject(Server, LocalAPI, AUChannel)
export class Index {

  constructor(server, api, channel) {
    this.api     = api;
    this.profile = api.getProfile();
    this.server  = server;
    this.channel = channel;
  }

  configureRouter(config, router) {
    config.map([
      { route: '', moduleId: './no-selection', title: 'API Home' },
      { route: ':articleSlug', moduleId: './article' }
    ]);

    config.mapUnknownRoutes(instruction => instruction.config.moduleId = '');

    this.router = router;
  }
}
