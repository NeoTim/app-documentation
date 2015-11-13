import {inject, ObserverLocator} from 'aurelia-framework';
import {CacheModel} from './cache-model';
import {Cache} from './cache';

@inject(ObserverLocator, Cache)
export class Culture extends CacheModel {
  id = 'culture';
  options = ['en-US', 'pt-BR'];
  _handlers = [];

  constructor(observerLocator, cache) {
    super(observerLocator, cache);
    this.init();
  }

  init() {
    super.init(this.id, this.options);
  }
}
