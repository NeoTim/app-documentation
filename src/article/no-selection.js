import {Redirect} from 'aurelia-router';
import {Tutorial} from 'backend/model';

export class NoSelection {
  canActivate() {
    if (Tutorial.previousSelection) {
      let product = Tutorial.previousSelection.product;
      return new Redirect(`${product.userName}/${product.productName}/${product.preferredVersion}/doc/article/${Tutorial.previousSelection.slug}`);
    }

    return true;
  }
}
