import {inject} from 'aurelia-framework';
import {Server} from 'backend/server';

@inject(Server)
export class Profile {
  key = 'profile';
  current = undefined;
  options = ['developer', 'architect', 'manager'];
  display = [
    {name: 'developer', value: 'developer',  text: 'a developer'},
    {name: 'architect', value: 'architect',  text: 'an architect'},
    {name: 'manager', value: 'manager',      text: 'a manager or CTO'}
  ];

  constructor(server) {
    this.server = server;
  }

  getTutorials() {
    // if (!this.profilesCleaned) {
    //   this.profilesCleaned = true;
    //   return this.cleanEmptyProfiles().then(args => {
    //     this.options = args.options;
    //     this.current = args.current;
    //     return args.tutorials;
    //   });
    // }
    return this.server.getTutorialsForProfile(this.current);
  }

  cleanEmptyProfiles() {
    let server = this.server;
    let self = this;
    let options = [];
    let current = null;
    let tutorials = null;
    let child;
    return new Promise(resolve => {
      lookup();
      function lookup() {
        child = self.options.pop();
        if (!child) {
          return resolve({options, tutorials, current});
        }
        server.getTutorialsForProfile(child).then(tuts => {
          if (tuts && tuts.length)  {
            tutorials = tutorials || tuts;
            current = current || child;
            options.push(child);
          }
          lookup(child);
        });
      }
    });
  }
}
