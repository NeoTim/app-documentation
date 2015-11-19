import {isAndroid} from 'aurelia-interface-platforms';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-animator-css')
    .plugin('aurelia-interface-platforms', config => {
      config.setClassList(document.documentElement);
      if (isAndroid) {
        let meta = document.getElementById('metatag');
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
      }
    })
    .feature('article/language')
    .feature('services')
    .globalResources('resources/au-icon', 'resources/au-preview');

  aurelia.start().then(a => a.setRoot());
}
