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
  }

  activate() {
    this.onProfileChange(this.profile.current);
    this.profileChanged = this.channel.subscribe('profile-changed', (profile) => {
      this.onProfileChange(profile);
    })
  }

  deactivate() {
    this.profileChanged.dispose();
  }

  onProfileChange(profile) {
    this.server.getTutorialsForProfile(profile.value).then(tutorials => {
      this.tutorials = tutorials;
    });
  }
}
