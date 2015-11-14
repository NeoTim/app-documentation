import {bindable, inject} from 'aurelia-framework';
import {Server} from 'backend/server';
import {Profile} from 'services/profile'
import {AUChannel} from 'services/channel'

@inject(Server, Profile, AUChannel)
export class ArticleMenu {
  tutorials = null;
  @bindable selectedProfile;

  constructor(server, profile, channel) {
    this.profile = profile;
    this.server = server;
    this.channel = channel;
    this.selectedProfile = this.profile.current.value;
  }

  activate() {
    this.profileChanged(this.profile.current);
  }

  profileChanged(profile) {
    this.server.getTutorialsForProfile(profile.value).then(tutorials => {
      this.tutorials = tutorials;
    });
  }

  selectedProfileChanged(profile) {
    profile = profile.value ? profile : this.profile.getValue(profile);
    this.profile.current = profile;
    this.profileChanged(profile);
  }
}
