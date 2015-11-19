import {inject} from 'aurelia-dependency-injection';
import {Server} from 'backend/server';
import {AUChannel} from 'services/channel';

@inject(Server, AUChannel)
export class Index {

  constructor(server, channel) {
    this.server = server;
    this.channel = channel;
    this.isApi = true;
  }

  configureRouter(config, router) {
    config.map([
      { route: 'overview', moduleId: './product', title: 'API' },
      { route: 'home', moduleId: './no-selection', title: 'API Home' },
      { route: ':classOrInterface/:name', moduleId: './class-or-interface' }
    ]);

    this.router = router;
  }

  activate() {
    return this.server.getOfficialProducts().then(products => this.products = products);
  }
}
