import {inject} from 'aurelia-framework';
import {Server} from 'backend/server';

@inject(Server)
export class Profile {
  key = 'profile';
  current = undefined;
  options = ['developer', 'new-developer', 'architect', 'manager'];
  display = [
    {name: 'developer',     value: 'developer',      text: 'a web developer'},
    {name: 'new-developer', value: 'new-developer',  text: 'new to web dev or SPA'},
    {name: 'architect',     value: 'architect',      text: 'an architect'},
    {name: 'manager',       value: 'manager',        text: 'a manager or CTO'}
  ];

  constructor(server) {
    this.server = server;
  }

  getTutorials() {
    return this.server.getTutorialsForProfile(this.current);
  }
}
