import {inject} from 'aurelia-framework';
import {Server} from 'backend/server';
import {LocalAPI} from 'services/local';
import {AUChannel} from 'services/channel';

@inject(Server, AUChannel, LocalAPI)
export class ArticleMenu {
  tutorials = null;

  constructor(server, channel, api) {
    this.api = api;
    this.server = server;
    this.channel = channel;
    this.profile = api.getProfile();
    this.profile.getTutorials().then(tutorials => {
      this.tutorials = tutorials;
    });
  }

  activate() {
    this.changedHandler = this.channel.subscribe('profile-changed', (profile)=> {
      profile.getTutorials().then( tutorials => {
        this.tutorials = tutorials;
      });


      this.profile = profile;
    });
  }

  deactivate() {
    this.changedHandler.dispose();
  }

}

const Vowels = ['a', 'e', 'i', 'o', 'u'];
export class VowelValueConverter {
  toView(text) {
    let first = text[0];
    return (Vowels.indexOf(first) < 0) ? ('a ' + text ) : ('an ' + text);
  }
}
