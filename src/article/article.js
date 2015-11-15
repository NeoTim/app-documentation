import {bindable, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Server} from 'backend/server';
import {LocalAPI} from 'services/local';

@inject(Server, Router, LocalAPI)
export class ArticleView {
  tutorials = [];

  constructor(server, router, api) {
    this.api    = api;
    this.server = server;
    this.router = router;
    this.culture = api.getCulture();
    window.art = this
  }

  attached() {
    this.cultureSubscription = this.api.channel.subscribe('culture-changed', (culture)=> {
      this.loadArticle();
      this.culture = culture;
    })
  }

  activate(params, config, instruction) {
    this.articleSlug = params.articleSlug;
    this.local = instruction.parentInstruction.config.name === 'local';

    let getProductVersion = this.local
      ? this.server.getTestProductVersion()
      : this.server.getProduct(params.userName, params.productName)

          .then(product => {
            let tutorial = product.getTutorialBySlug(params.articleSlug);
            if(tutorial) {
              tutorial.select();
            }

            return product.getVersion(params.version)
          });

    return getProductVersion.then(productVersion => {
      this.productVersion = productVersion;
      return this.loadArticle();
    });
  }

  loadArticle() {
    return this.productVersion.getArticle(this.articleSlug, this.culture.current)
      .then(article => this.article = article);
  }

  detached() {
    this.cultureSubscription && this.cultureSubscription.dispose();
  }
}
