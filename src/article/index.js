import {bindable, inject} from 'aurelia-framework';
import {Server} from 'backend/server';
import {Profile} from 'services/profile'
import {AUChannel} from 'services/channel'

@inject(Server, Profile, AUChannel)
export class Index {

  constructor(server, profile, channel) {
    this.profile = profile;
    this.server = server;
    this.channel = channel
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
