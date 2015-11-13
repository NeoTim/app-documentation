import {inject, ObserverLocator} from 'aurelia-framework';
import {CacheModel} from './cache-model';
import {Cache} from './cache';

@inject(ObserverLocator, Cache)
export class Language extends CacheModel {
  id = 'langauge';
  options = ['ES 2016', 'ES 2015', 'TypeScript'];
  _handlers = [];

  constructor(observerLocator, cache) {
    super(observerLocator, cache);
    this.init();
  }

  init() {
    super.init(this.id, this.options);
  }
}
