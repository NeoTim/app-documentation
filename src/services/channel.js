import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class AUChannel {
  constructor(channel) {
    this.channel = channel;
  }

  subscribe(eventName, callback) {
    return this.channel.subscribe(eventName, (payload)=> {
      callback(payload);
    });
  }

  publish(eventName, payload) {
    return this.channel.publish(eventName, payload);
  }

  createInstruction(context, name, bindablekey) {
    context.channelInstruction = {context, name, isValue, validate};
    return context.channelInstruction;

    //////////////////
    function isValue(value) {
      if (!value) value = bindablekey || context[bindablekey];
      value = value || true;
      return  (bindablekey && context[bindablekey]) === value;
    }

    function validate(_context) {
      return _context === context;
    }
  }
}
