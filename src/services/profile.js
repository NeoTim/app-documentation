import {inject, ObserverLocator} from 'aurelia-framework';

@inject(ObserverLocator)
export class Profile {

  _handlers = [];
  options   = [
    {name: 'developer' , displayName: 'a developer'},
    {name: 'architect' , displayName: 'an architect'},
    {name: 'manager'   , displayName: 'a manager or CTO'}
  ];

  constructor(observerLocator) {
    this.current = this.options[0];

    this.observer = observerLocator.getObserver(this, 'current').subscribe(value => {
      value && this._currentChanged(value);
    });
  }

  _currentChanged(value) {
    this._handlers.forEach(cb => cb(value));
  }

  getValue(name) {
    name = name || this.current.name;
    return this.options.find(x => x.name === name);
  }

  setValue(value) {
    this.current = value;
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
