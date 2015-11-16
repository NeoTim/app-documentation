import {database} from './database';
import {HttpClient} from 'aurelia-http-client';
import {Cache} from 'services/cache';
import {inject} from 'aurelia-framework';
import {
  Product,
  ProductVersion,
  Article,
  GroupModel,
  ClassModel,
  ConstructorModel,
  MethodModel,
  InterfaceModel,
  PropertyModel,
  VariableModel,
  SignatureModel,
  FunctionModel
} from './model';

@inject(Cache)
export class Server {
  constructor(cache) {
    this.cache = cache;
    this.officialProducts = [];
    this.otherProducts = [];
  }

  getOfficialProducts() {
    if (this.officialProducts.length > 0) {
      return Promise.resolve(this.officialProducts);
    }

    this.officialProducts = database.officialProducts.map(x => new Product(x, this));
    return Promise.resolve(this.officialProducts);
  }

  getTutorialsForProfile(profileName) {
    return this.getOfficialProducts().then(products => {
      let temp = [];

      for (let i = 0, ii = products.length; i < ii; ++i) {
        temp = products[i].getTutorialForProfile(profileName).concat(temp);
      }

      return temp.sort((a, b) => a.getOrderForProfile(profileName) < b.getOrderForProfile(profileName) ? -1 : 1);
    });
  }

  getProduct(userName, productName) {
    let found = this.otherProducts.find(x => x.userName === userName && x.productName === productName);
    if (found) {
      return Promise.resolve(found);
    }

    return this.getOfficialProducts().then(officialProducts => {
      found = officialProducts.find(x => x.userName === userName && x.productName === productName);

      if (!found) {
        found = new Product({userName: userName, productName: productName, latestVersion: 'latest'}, this);
        this.otherProducts.push(found);
      }

      return found;
    });
  }

  getProductVersion(product, version) {
    if (product.isLoaded) {
      return this._loadProductVersion(product, version);
    }

    return this._loadProductDescription(this.changeLogParser, product)
      .then(x => this._loadProductVersion(product, version));
  }

  getTestProductVersion() {
    let product = new Product({
      userName: 'test',
      productName: 'product',
      tutorials: []
    }, this);

    let productVersion = new ProductVersion(
      product,
      'local',
      this,
      true
    );

    product.versions.push(productVersion);

    return Promise.resolve(productVersion);
  }

  loadArticleTranslation(translation) {
    let found = translation.local ? null : this.cache.getItem(translation.url);
    let loaded = found
      ? Promise.resolve(found)
      : new HttpClient().createRequest(translation.url)
          .asGet()
          .withResponseType('text')
          .send().then(response => response.content)
          .catch(() => '')
          .then(content => {
            if (!translation.local) {
              this.cache.setItem(translation.url, content, this.cache.farFuture());
            }

            return content;
          });

    return loaded.then(content => {
      translation.content = content;

      if (!content) {
        translation.unavailable = true;
      }

      return translation;
    });
  }

  _loadProductVersion(product, version) {
    if (version === 'latest') {
      version = product.latestVersion;
    }

    let productVersion = new ProductVersion(product, version, this);
    product.versions.push(productVersion);

    let http = new HttpClient();

    return Promise.all([
      http.get(productVersion.apiUrl).then(response => {
        productVersion.children = response.content.children;
        productVersion.groups = response.content.groups;
        checkForChildren(productVersion);
        checkForGroups(productVersion);
      }),
      http.get(productVersion.packageUrl).then(response => {
        let pack = response.content;

        productVersion.description = pack.description;
        productVersion.bugsUrl = pack.bugs.url;
        productVersion.repositoryUrl = pack.repository.url;
        productVersion.changeLogUrl = `https://github.com/${product.userName}/${product.productName}/blob/master/doc/CHANGELOG.md`;
        productVersion.licenseUrl = `https://github.com/${product.userName}/${product.productName}/blob/master/LICENSE`;

        if (pack.jspm && pack.jspm.dependencies) {
          productVersion.dependencies = Object.keys(pack.jspm.dependencies)
            .filter(x => x.startsWith('aurelia-'))
            .map(x => x.replace('aurelia-', ''))
            .map(x => this.officialProducts.find(y => y.productName === x) || this.otherProducts.find(y => y.productName === x));
        }

        if (pack.aurelia && pack.aurelia.documentation) {
          productVersion.articles = pack.aurelia.documentation.articles || [];
          productVersion.articles = productVersion.articles.map(x => new Article(x, productVersion, this));
        }

        pack.keywords.forEach(keyword => {
          productVersion.keywords.push(keyword);
        });
      })
    ]).then(() => productVersion);
  }

  _loadProductDescription(changeLogParser, product) {
    let tagList = `https://api.github.com/repos/${product.userName}/${product.productName}/tags`;
    let content = this.cache.getItem(tagList);
    let loaded;

    if (content) {
      loaded = Promise.resolve(content);
    } else {
      loaded = new HttpClient()
        .createRequest(tagList)
        .asGet()
        .send()
        .then(response => this.cache.setItem(tagList, response.content));
    }

    return loaded.then(_content => {
      product.availableVersions = this._getVersions(_content.map(x => x.name));
      product.configureLatestVersion();
    }).then(() => {
      product.isLoaded = true;
      return product;
    });
  }

  _getVersions(all) {
    let mmpRegex = /(\d+)/g;
    let versions = all.map(x => {
      let [major, minor, patch] = x.match(mmpRegex);
      return {major, minor, patch};
    });

    let majors = {};

    versions.forEach(x => {
      let major = majors[x.major];
      if (!major) {
        majors[x.major] = major = {};
      }

      let minor = major[x.minor];
      if (!minor) {
        major[x.minor] = minor = [];
      }
      let patch = minor.find(y => y === x.patch);
      if (!patch) {
        minor.push(parseInt( x.patch, 10));
      }
    });

    let available = [];

    for (let major in majors) {
      let minors = majors[major];

      for (let minor in minors) {
        let patches = minors[minor].sort();
        let patch = patches[patches.length - 1];
        available.push({
          major: parseInt(major, 10),
          minor: parseInt(minor, 10),
          patch: patch,
          version: major + '.' + minor + '.' + patch,
          display: major + '.' + minor + '.x'
        });
      }
    }

    available.sort((a, b) => {
      if (a.major > b.major) return -1;
      if (a.major < b.major) return 1;

      if (a.minor > b.minor) return -1;
      if (a.minor < b.minor) return 1;

      return 0;
    });

    return available;
  }
}

function checkForChildren(obj) {
  if (obj && obj.children) {
    obj.children.forEach(child => {
      let newChild = castObjectAsType(child, obj);
      checkForChildren(newChild);
    });
  }
}

function checkForGroups(obj) {
  if (obj && obj.groups) {
    obj.groups.forEach(group => {
      group.kindName = group.kind.name;
      obj.groups.push(new GroupModel(group));
      checkForGroups(group);
    });
  }
}

// Finds the type and casts the object as it so we can recursively search objects
function castObjectAsType(obj, parent) {
  let type = obj.kindString;
  let thisObject;

  switch (type) {
  case 'Class':
    thisObject = new ClassModel(obj);
    parent.classes.push(thisObject);
    break;
  case 'Constructor':
    thisObject = new ConstructorModel(obj);
    thisObject.signature = new SignatureModel(thisObject.signatures[0]);
    parent.constructorMethod = thisObject;
    break;
  case 'Method':
    thisObject = new MethodModel(obj);
    thisObject.signature = new SignatureModel(thisObject.signatures[0]);
    parent.methods.push(thisObject);
    break;
  case 'Interface':
    thisObject = new InterfaceModel(obj);
    parent.interfaces.push(thisObject);
    break;
  case 'Property':
    thisObject = new PropertyModel(obj);
    parent.properties.push(thisObject);
    break;
  case 'Variable':
    thisObject = new VariableModel(obj);
    parent.variables.push(thisObject);
    break;
  case 'Signature':
    thisObject = new SignatureModel(obj);
    parent.signature.push(thisObject);
    break;
  case 'Function':
    thisObject = new FunctionModel(obj);
    parent.functions.push(thisObject);
    break;
  default:
  // Do nothing
  }

  return thisObject;
}
