import {inject, ObserverLocator} from 'aurelia-framework';
import {CacheModel} from './cache-model';
import {Cache} from './cache';
import {AUChannel} from './channel';

@inject(ObserverLocator, Cache, AUChannel)
export class Profile extends CacheModel {
  id = 'profile';
  options   = [
    {value: 'developer' , text: 'a developer'},
    {value: 'architect' , text: 'an architect'},
    {value: 'manager'   , text: 'a manager or CTO'}
  ];
  _handlers = [];

  constructor(observerLocator, cache, channel) {
    super(observerLocator, cache);
    this.channel = channel;
    this.init();
  }

  init() {
    super.init(this.id, this.options);

    this.onChange((profile) => {
      this.channel.publish('profile-changed', profile);
    });
  }

  getValue(value) {
    value = value || this.current.value;
    return this.options.find(x => x.value === value);
  }

  setValue(value) {
    this.current = value;
  }
}
