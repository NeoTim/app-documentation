import {inject} from 'aurelia-dependency-injection';
import {ObserverLocator} from 'aurelia-binding';
import {Cache} from './cache';
import {AUChannel} from './channel';
import {Profile} from './profile';
import {Culture} from './culture';
import {Language} from './language';

@inject(ObserverLocator, Cache, AUChannel, Profile, Culture, Language)
export class LocalAPI {

  constructor(observerLocator, cache, channel, profile, culture, language) {
    this.cache = cache;
    this.channel = channel;
    this.observerLocator = observerLocator;
    this.registerModel(profile.key, profile);
    this.registerModel(culture.key, culture);
    this.registerModel(language.key, language);
  }

  registerModel(key, instance) {
    let channel = this.channel;
    let cache   = this.cache;
    let capitalKey = capitalize(key);
    let getKey     = 'get' + capitalKey;
    let setKey     = 'set' + capitalKey;
    let currentKey =  key  + '.current';
    let eventKey   =  key  + '-changed';

    let currentValue = this.cache.getItem(currentKey);
    if (!currentValue) {
      currentValue =  instance.options[0];
      this.cache.setItem(currentKey, currentValue);
    }

    let instruction = {
      channel: channel,
      current: currentValue,
      _handlers: [],

      onChange(cb) {
        this._handlers.push(cb);
        return createDisposable(cb, this._handlers);
      },

      _changed(newValue) {
        cache.setItem( currentKey, newValue);
        channel.publish( eventKey, instance);
      }
    };

    Object.assign(instance, instruction);

    this.observerLocator.getObserver(instance, 'current').subscribe(
      (newValue) => instance._changed(newValue)
    );

    channel.subscribe(`get-${key}`, (callback)=> {
      callback(instance);
    });

    channel.subscribe(`set-${key}`, (newValue)=> {
      instance.current = newValue;
    });

    this[setKey] = (newValue)=> {
      instance.current = newValue;
    };

    this[getKey] = ()=> {
      return instance;
    };

    this[key] = instance;
  }
}

function capitalize(name) {
  return name[0].toUpperCase() + name.slice(1);
}

function createDisposable(callback, handlers) {
  function dispose() {
    let index = handlers.indexOf(callback);
    if (index !== -1) handlers.splice(index, 1);
  }
  return {dispose};
}
