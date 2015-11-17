
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('aurelia-interface-platforms', config => {
      config.setClassList(document.documentElement);
    })
    .feature('article/language')
    .globalResources('resources/au-icon', 'resources/au-preview');

  aurelia.start().then(a => a.setRoot());
}
