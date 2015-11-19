import {Analytics} from './analytics';
import {ConsoleAppender} from 'aurelia-logging-console';
import * as LogManager from 'aurelia-logging';

export function configure(config) {
  let isLocal = window.location.protocol !== 'http' && window.location.protocol !== 'https';

  if (isLocal) {
    LogManager.addAppender(new ConsoleAppender());
    LogManager.setLevel(LogManager.logLevel.debug);
  }

  config.postTask(() => {
    let instance = config.container.get(Analytics);
    instance.enableTracking(!isLocal);
    instance.enableLogging(isLocal);
    instance.init('UA-38441871-6', 'ga');
  	instance.attach();
  });
}
