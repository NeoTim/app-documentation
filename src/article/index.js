import {bindable, inject} from 'aurelia-framework';
import {Profile} from 'services/profile';
import {Server} from 'backend/server';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Server, Profile)
export class Index {

  tutorials = null;
  constructor(server, profile) {
    this.server    = server;
    this.profile   = profile;
    this.isArticle = true;
    this.profileChanged = this.profileChanged.bind(this);
  }

  configureRouter(config, router) {
    config.map([
      { route: '', moduleId: './no-selection', title: 'API Home' },
      { route: ':articleSlug', moduleId: './article' }
    ]);
    config.mapUnknownRoutes(instruction => instruction.config.moduleId = '');
    this.router = router;
  }

  activate() {
    this.profileChangeEvent = this.profile.onChange(this.profileChanged);
    this.server.getProfile().then(profileName => {
      this.profile.setValue(this.profile.getValue(profileName));
    });
  }

  deactivate() {
    if (this.profileChangeEvent) {
      this.profileChangeEvent.dispose();
    }
  }

  profileChanged(value) {
    this.server.saveProfile(value);
    return this.server.getTutorialsForProfile(value.name)
      .then(tutorials => this.tutorials = tutorials);
  }
}
