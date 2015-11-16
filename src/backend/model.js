import {join} from 'aurelia-path';
import {DOM, FEATURE} from 'aurelia-pal';
import {viewStrategy} from 'aurelia-framework';
import {TemplateRegistryEntry} from 'aurelia-loader';


let baseTranslation = 'en-US';

function prettyName(s) {
  s =  s.replace(/(\-\w)/g, function(m) {
    return m[1].toUpperCase();
  });
  s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export class Product {
  static previousSelection = null;

  constructor(attrs, server) {
    attrs.tutorials = attrs.tutorials || [];
    this.userName = attrs.userName;
    this.productName = attrs.productName;
    this.latestVersion = 'latest';
    this.preferredVersion = this.latestVersion;

    this.tutorials = attrs.tutorials.map(a => new Tutorial(a, this));
    this.isSelected = false;
    this.versions = [];
    this.server = server;
    this.baseUrl = `https://cdn.rawgit.com/${this.userName}/${this.productName}`;
  }

  select() {
    if (Product.previousSelection) {
      Product.previousSelection.isSelected = false;
    }

    Product.previousSelection = this;
    this.isSelected = true;
  }

  getLatestVersion() {
    return this.getVersion(this.latestVersion);
  }

  getVersion(version) {
    version = version || this.preferredVersion;
    let found = this.versions.find(x => x.version === version);

    if (found) {
      return Promise.resolve(found);
    }

    return this.server.getProductVersion(this, version).then(productVersion => {
      this.versions.push(productVersion);
      return productVersion;
    });
  }

  getTutorialBySlug(articleSlug) {
    return this.tutorials.find(x => x.slug === articleSlug);
  }

  getTutorialForProfile(profileName) {
    return this.tutorials.filter(x => x.matchesProfile(profileName));
  }

  configureLatestVersion() {
    if (this.latestVersion === 'latest') {
      this.latestVersion = this.availableVersions[0].version;

      if (this.preferredVersion === 'latest') {
        this.preferredVersion = this.latestVersion;
      }
    }
  }
}

export class ProductVersion {
  classes = [];
  interfaces = [];
  properties = [];
  variables = [];
  events = [];
  methods = [];
  functions = [];
  articles = [];
  keywords = [];

  constructor(product, version, server, local) {
    this.product = product;
    this.version = version;
    this.server = server;
    this.baseUrl = join(product.baseUrl, version);
    this.apiUrl = join(this.baseUrl, 'doc/api.json');
    this.packageUrl = join(this.baseUrl, 'package.json');
    this.local = !!local;
  }

  findClass(className) {
    return this.classes.find(x => x.name === className);
  }

  findInterface(interfaceName) {
    return this.interfaces.find(x => x.name === interfaceName);
  }

  getArticle(slug, culture) {
    let found;

    if (this.local) {
      found = new Article({ title: 'Local Article', href: slug }, this, this.server, true);
    } else {
      found = this.articles.find(x => x.slug === slug);
    }

    if (!found) {
      return Promise.reject();
    }

    return found.getTranslation(culture);
  }
}

@viewStrategy
class ArticleTranslationViewStrategy {
  constructor(articleTranslation) {
    this.articleTranslation = articleTranslation;
  }

  loadViewFactory(viewEngine, compileInstruction, loadContext) {
    if (this.entry) {
      return Promise.resolve(this.entry.factory);
    }

    this.entry = new TemplateRegistryEntry(this.articleTranslation.url);
    this.entry.template = this.articleTranslation.template;
    return viewEngine.loadViewFactory(this.entry, compileInstruction, loadContext);
  }
}

export class Article {
  constructor(attrs, productVersion, server, local) {
    this.title = attrs.title;
    this.productVersion = productVersion;
    this.server = server;
    this.baseUrl = productVersion.baseUrl;
    this.href = attrs.href;
    this.primaryUrl = join(this.baseUrl, attrs.href);
    this.slug = this.primaryUrl.substring(this.primaryUrl.lastIndexOf('/') + 1).replace('.html', '');
    this.translations = {};
    this.local = !!local;
  }

  getTranslation(culture, local) {
    if (culture in this.translations) {
      return Promise.resolve(this.translations[culture]);
    }

    if (baseTranslation in this.translations) {
      return this._loadTranslation(culture);
    }

    return this._loadTranslation(baseTranslation)
      .then(() => this.getTranslation(culture));
  }

  _loadTranslation(culture) {
    let translation = new ArticleTranslation(this, culture, this.local);
    this.translations[culture] = translation;

    return this.server.loadArticleTranslation(translation)
      .then(_translation => {
        if (_translation.unavailable) {
          _translation.subsume(this.translations[baseTranslation]);
          _translation.view = new ArticleTranslationViewStrategy(_translation);
        } else {
          _translation.prepare(this.translations[baseTranslation]);
          _translation.view = new ArticleTranslationViewStrategy(_translation);
        }

        return _translation;
      });
  }
}

let tagsFromSource = ['EXAMPLE', 'DEMO'];

export class ArticleTranslation {
  constructor(article, culture, local) {
    this.culture = culture;

    if (local) {
      this.local = true;
      this.url = `doc/article/${baseTranslation}/${article.href}.html`;
    } else {
      this.url = article.primaryUrl;
    }

    if (culture !== baseTranslation) {
      this.url = this.url.replace(baseTranslation, culture);
    }
  }

  subsume(other) {
    this.title = other.title;
    this.author = other.author;
    this.description = other.description;
    this.keywords = other.keywords;
    this.template = DOM.createTemplateFromMarkup('<template>' + other.originalTemplate.content.innerHTML + '</template>');

    let originalContent = other.originalTemplate.content;
    let template = FEATURE.ensureHTMLTemplateElement(DOM.createElement('template'));
    let current = originalContent.firstChild;

    while (current) {
      template.content.appendChild(current.cloneNode(true));
      current = current.nextSibling;
    }

    this.template = template;
  }

  prepare(primaryTranslation) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(this.content, 'text/html');
    let docChild = doc.firstChild;

    while (docChild) {
      if (docChild.tagName === 'HTML') {
        let htmlChild = docChild.firstChild;

        while (htmlChild) {
          if (htmlChild.nodeType === 1) {
            switch (htmlChild.tagName) {
            case 'HEAD':
              this._handleHEAD(htmlChild);
              break;
            case 'BODY':
              this._handleBODY(htmlChild, primaryTranslation);
              break;
            default:
            }
          }

          htmlChild = htmlChild.nextSibling;
        }
      }

      docChild = docChild.nextSibling;
    }
  }

  _handleHEAD(node) {
    let currentChild = node.firstChild;

    while (currentChild) {
      if (currentChild.nodeType === 1) {
        switch (currentChild.tagName) {
        case 'TITLE':
          this.title = currentChild.innerHTML;
          break;
        case 'META':
          switch (currentChild.getAttribute('name')) {
          case 'description':
            this.description = currentChild.getAttribute('content');
            break;
          case 'keywords':
            this.keywords = currentChild.getAttribute('content').split(',').map(x => x.trim());
            break;
          case 'author':
            this.author = currentChild.getAttribute('content');
            break;
          default:
          }
          break;
        default:
        }
      }

      currentChild = currentChild.nextSibling;
    }
  }

  _handleBODY(node, primaryTranslation) {
    let template = this.template = this._createTemplateFromBody(node);
    let uids = template.content.querySelectorAll('[uid]');
    let sections = {};

    for (let i = 0, ii = uids.length; i < ii; ++i) {
      let current = uids[i];
      sections[current.getAttribute('uid')] = current;
    }

    if (primaryTranslation !== this) {
      this.author = primaryTranslation.author;
      this.keywords = primaryTranslation.keywords;

      for (let uid in primaryTranslation.sections) {
        let primarySection = primaryTranslation.sections[uid];
        let translationSection = sections[uid];

        if (translationSection) {
          let primaryVersion = primarySection.getAttribute('version');
          if (primaryVersion) {
            let translationVersion = translationSection.getAttribute('version');
            translationSection.setAttribute('version-matches', this._determineVersionMatches(primaryVersion, translationVersion));
          }

          if (this._shouldCopyContent(primarySection.tagName)) {
            while (translationSection.firstChild) {
              translationSection.removeChild(translationSection.firstChild);
            }

            let current = primarySection.firstChild;

            while (current) {
              translationSection.appendChild(current.cloneNode(true));
              current = current.nextSibling;
            }

            this.template = template;
          }
        } else {
          this.unavailable = true; //TODO: create english section?
        }
      }
    } else {
      this.sections = sections;

      for (let uid in sections) {
        sections[uid] = sections[uid].cloneNode(true);
      }

      let originalTemplate = FEATURE.ensureHTMLTemplateElement(DOM.createElement('template'));
      let current = template.content.firstChild;

      while (current) {
        originalTemplate.content.appendChild(current.cloneNode(true));
        current = current.nextSibling;
      }

      this.originalTemplate = originalTemplate;
    }
  }

  _createTemplateFromBody(body) {
    return DOM.createTemplateFromMarkup('<template>' + body.innerHTML + '</template>');
  }

  _shouldCopyContent(tagName) {
    return tagsFromSource.indexOf(tagName) !== -1;
  }

  _determineVersionMatches(primaryVersion, translationVersion) {
    let primaryParts = primaryVersion.split('.').map(x => parseInt(x.trim(), 10));
    let translationParts = translationVersion.split('.').map(x => parseInt(x.trim(), 10));

    if (primaryParts[0] === translationParts[0]) {
      if (primaryParts[1] === translationParts[1]) {
        if (primaryParts.length > 1 && translationParts.length > 2) {
          if (primaryParts[2] === translationParts[2]) {
            return 3;
          }
        }

        return 2;
      }

      return 1;
    }

    return 0;
  }
}

export class Tutorial {
  static previousSelection = null;

  constructor(attrs, product) {
    this.title = attrs.title;
    this.slug = attrs.href.substring(attrs.href.lastIndexOf('/') + 1).replace('.html', '');
    this.href = attrs.href;
    this.profiles = attrs.profiles;
    this.product = product;
  }

  getOrderForProfile(profileName) {
    return this.profiles.find(x => x.name === profileName).order;
  }

  matchesProfile(profileName) {
    if (this.profiles) {
      return !!this.profiles.find(x => x.name === profileName);
    }

    return false;
  }

  select() {
    if (Tutorial.previousSelection) {
      Tutorial.previousSelection.isSelected = false;
    }

    Tutorial.previousSelection = this;
    this.isSelected = true;
  }
}

export class ChildModel {
  id = -1;
  kind = -1;
  kindString = '';
  kindName = '';
  name = '';
  originalName = '';
  children = [];
  classes = [];
  groups = [];
  flags = {};
  constructor(data) {
    Object.assign(this, data);
    this.kindName = this.kindString;
    this.prettyName = prettyName(this.name);
  }
}

export class GroupModel {
  id = -1;
  kind = -1;
  kindName = '';
  title = '';
  children = [];
  constructor(data) {
    Object.assign(this, data);
    this.kindName = this.kindName;
  }
}

export class ClassModel {
  comment = {};
  methods = [];
  groups = [];
  flags = {};
  properties = [];
  constructorMethod = {};
  constructor(data) {
    Object.assign(this, data);
    this.kindName = this.kindString;
  }
}

export class MethodModel {
  signature = {};
  constructor(data) {
    Object.assign(this, data);
    this.kindName = this.kindString;
  }
}

export class ConstructorModel {
  signature = {};
  constructor(data) {
    Object.assign(this, data);
    this.kindName = this.kindString;
  }
}

export class InterfaceModel {
  classes = [];
  properties = [];
  variables = [];
  methods = [];
  constructor(data) {
    Object.assign(this, data);
    this.kindName = this.kindString;
  }
}

export class PropertyModel {
  constructor(data) {
    Object.assign(this, data);
    this.kindName = this.kindString;
  }
}

export class SignatureModel {
  comment = {};
  constructor(data) {
    Object.assign(this, data);
    this.kindName = this.kindString;
  }
}

export class VariableModel {
  constructor(data) {
    Object.assign(this, data);
    this.kindName = this.kindString;
  }
}

export class FunctionModel {
  constructor(data) {
    Object.assign(this, data);
    this.kindName = this.kindString;
    this.signature = this.signatures[0];
  }
}
