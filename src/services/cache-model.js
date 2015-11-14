import {inject, ObserverLocator} from 'aurelia-framework';
import {Cache} from './cache';

@inject(ObserverLocator, Cache)
export class CacheModel {
  _handlers = [];

  constructor(observerLocator, cache, id, options, current) {
    this.cache = cache;
    this.observerLocator = observerLocator;
  }

  init(id, options, current) {
    current || options[0];

    this.id = id;
    this.options = options;
    this.observerLocator.getObserver(this, 'current')
      .subscribe(newValue => this._currentChanged(newValue));

    this.current = this.cache.getItem(`${this.id}.current`) || this.base;
    this.base = this.current || current;
  }

  _currentChanged(newValue) {
    this.cache.setItem(`${this.id}.current`, newValue);
    this._handlers.forEach(x => x(newValue));
  }

  onChange(callback) {
    let handlers = this._handlers;
    handlers.push(callback);
    return {
      dispose() {
        let index = handlers.indexOf(callback);

        if (index !== -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }
}
