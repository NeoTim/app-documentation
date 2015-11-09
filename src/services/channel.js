import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class AUChannel {
  constructor(channel) {
    this.channel = channel;
  }

  subscribe(eventName, callback) {
    return this.channel.subscribe(eventName, (payload)=> {
      callback(payload)
    });
  }

  publish(eventName, payload) {
    return this.channel.publish(eventName, payload);
  }

  createInstruction(context, name, bindablekey) {
    let self = this;
    return context.channelInstruction = {context, name, isValue, validate};
    //////////////////

    function isValue(value) {
      value = value ? value : bindablekey ? context[bindablekey] : true;
      return  (bindablekey && context[bindablekey]) === value;
    }

    function validate(_context) {
      return _context === context;
    }
  }
}
