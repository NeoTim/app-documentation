import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';
import {Server} from 'backend/server';
import {DOM} from 'aurelia-pal';


function scrollToElement(element) {
  let scrollPosition = element.offsetTop + element.offsetParent.offsetTop;
  let scrollContainer = DOM.getElementById('page-host');
  scrollContainer.scrollTop = scrollPosition;
}

@inject(Server, Router)
export class Repository {

  @bindable selectedVersion;

  constructor(server, router) {
    this.server = server;
    this.router = router;
  }

  activate(params) {
    return this.server.getProduct(params.userName, params.productName)
      .then(product => {
        product.select();
        return product.getVersion(params.version).then(productVersion => {
          product.preferredVersion = productVersion.version;

          this.product = product;
          this.selectedProductVersion = productVersion;
          this.selectedVersion = productVersion.version;
        });
      });
  }

  selectedVersionChanged(newValue, oldValue) {
    if (this.product.preferredVersion !== newValue) {
      this.router.navigate(`#/${this.product.userName}/${this.product.productName}/${newValue}/doc/api/overview`);
    }
  }

  scrollTo(type, name) {
    let element = DOM.getElementById(`${type}-${name}`);
    scrollToElement(element);
  }
}
