import {bindable, inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {Router} from 'aurelia-router';
import {Server} from 'backend/server';
import {DOM} from 'aurelia-pal';


function scrollToElement(element) {
  let scrollPosition = element.offsetTop + element.offsetParent.offsetTop;
  let scrollContainer = DOM.getElementById("page-host");
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

  scrollTo(type, name) {
    let element = DOM.getElementById(`${type}-${name}`);
    scrollToElement(element);
  }
}


// export class BaseAPI {
//   static parent = undefined;
//   static opts   = undefined;
//   constructor(opts) {
//     BaseAPI.ops = BaseAPI.opts || opts;
//     BaseAPI.parent = BaseAPI.parent || this;
//     Object.assign(this, BaseAPI.ops);
//   }
//   init(name) {
//     BaseAPI.parent[new.target.name]
//   }
//   get(){}
//   post(){}
//   update(){}
//   remove(){}
// }


// export class Users extends BaseAPI {
//   constructor() {
//     super();
//   }


// }













// function get() {}
// function post() {}
// function update() {}
// function remove() {}

// export class PrivateAPI {
//   get() {}
//   post() {}
//   update() {}
//   remove() {}
// }

// export class API {
//   constructor(nameOrUrl, parent) {
//     if (parent) {
//       this.name =  nameOrUrl;
//       this.url  = parent.url;
//     } else {
//       this.url = url;
//     }
//   }

//   createChild(name) {
//     this[name] = new API(name, this);
//   }

//   get() { return get(this.url) }
//   post(...args) { return post(this.url, ...args) }
//   update(...args) { return update(this.url, ...args) }
//   delete(...args) { return remove(this.url, ...args)}
// }


// var api = new API('myhost.com');

// api.get();
// api.createChild('users', 'myhost.com/users');

// api.users.get();



















// class BaseModel {

//   constuctor(opts, parent) {
//     this.url = opts.url;
//       this.token = opts.token;
//   }

//   request(url, method, form, statusCode) {
//   }

//   get(url) {
//     return this.request(url, 'GET');
//   }

//   post(url, params) {
//     return this.request(url, 'POST', params);
//   }

//   put(url, params) {
//     return this.request(url, 'PUT', params);
//   }

//   delete(url, params) {
//     return this.request(url, 'DELETE', params);
//   }
// }

// export class GitLabUsers




