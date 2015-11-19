import {inject} from 'aurelia-dependency-injection';
import {Server} from 'backend/server';
import {AUChannel} from 'services/channel';

@inject(Server, AUChannel)
export class APIMenu {
  constructor(server, channel) {
    this.server = server;
    this.channel = channel;
    this.isApi = true;
  }

  activate() {
    return this.server.getOfficialProducts().then(products => this.products = products);
  }
}
