import {bindable, inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {Router} from 'aurelia-router';
import {Server} from 'backend/server';

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

          if (this.selectedProductVersion) {
            this.isDeps       = this.selectedProductVersion.dependencies && this.selectedProductVersion.dependencies.length;
            this.isClasses    = this.selectedProductVersion.classes && this.selectedProductVersion.classes.length > 0;
            this.isInterfaces = this.selectedProductVersion.interfaces && this.selectedProductVersion.interfaces.length > 0;
            this.isVariables  = this.selectedProductVersion.variables && this.selectedProductVersion.variables.length > 0;
            this.isFunctions  = this.selectedProductVersion.functions && this.selectedProductVersion.functions.length > 0;
          }
        });
      });
  }

  selectedVersionChanged(newValue, oldValue) {
    if(this.product.preferredVersion !== newValue){
      this.router.navigate(`#/${this.product.userName}/${this.product.productName}/${newValue}/doc/api/overview`);
    }
  }
}
