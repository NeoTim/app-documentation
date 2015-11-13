import {bindable, inject} from 'aurelia-framework';
import {Server} from 'backend/server';
import {Profile} from 'services/profile'
import {AUChannel} from 'services/channel'

@inject(Server, Profile, AUChannel)
export class ArticleMenu {
  tutorials = null;
  constructor(server, profile, channel) {
    this.profile = profile;
    this.server = server;
    this.channel = channel;
    this.selectedProfile = this.profile.current;
  }

  bind() {
    this.profileObserver = this.profile.onChange((profile)=> this.profileChanged(profile));
  }

  unbind() {
    this.profileObserver.dispose();
  }

  activate() {
    this.server.getProfile().then(profileName => {
      if(profileName) {
        this.profile.current = this.profile.getValue(profileName) || this.profile.options[0];
      }
    });
  }

  profileChanged(profile) {
    this.server.saveProfile(this.profile.current.name);

    return this.server.getTutorialsForProfile(this.profile.current.name)
      .then(tutorials => {
        this.tutorials = tutorials;
      });
  }
}
