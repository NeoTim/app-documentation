import {bindable, inject} from 'aurelia-framework';
import {Server} from 'backend/server';

@inject(Server)
export class Index {
  tutorials = null;
  profiles = [
    {displayName: 'a developer', name: 'developer'},
    {displayName: 'an architect', name: 'architect'},
    {displayName: 'a manager or CTO', name: 'manager'}
  ];

  @bindable selectedProfile;

  constructor(server) {
    this.server = server;
    this.selectedProfile = this.profiles[0];
    this.isArticle = true;
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
    this.server.getProfile()
      .then(profileName => {
        if(profileName) {
          this.selectedProfile = this.profiles.find(x => x.name === profileName) || this.profiles[0];
        }

        return this.selectedProfileChanged();
      });
  }

  selectedProfileChanged() {
    this.server.saveProfile(this.selectedProfile.name);

    return this.server.getTutorialsForProfile(this.selectedProfile.name)
      .then(tutorials => this.tutorials = tutorials);
  }
}
