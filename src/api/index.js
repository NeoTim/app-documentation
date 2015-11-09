import {inject} from 'aurelia-framework';
import {Server} from 'backend/server';

@inject(Server)
export class Index {
  constructor(server) {
    this.server = server;
    this.isApi = true;
  }

  configureRouter(config, router){
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
