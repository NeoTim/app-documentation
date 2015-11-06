System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "es7.decorators",
      "es7.classProperties"
    ]
  },
  paths: {
    "*": "dist/*.js",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "services/*": "dist/services/*.js",
    "models/*": "dist/models/*.js",
    "resources/*": "dist/resources/*.js",
    "api/*": "dist/api/*.js"
  },

  map: {
    "aurelia-animator-css": "github:aurelia/animator-css@0.17.0",
    "aurelia-binding": "github:aurelia/binding@0.10.2",
    "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.18.0",
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.11.2",
    "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.9.0",
    "aurelia-framework": "github:aurelia/framework@0.17.0",
    "aurelia-history": "github:aurelia/history@0.8.0",
    "aurelia-history-browser": "github:aurelia/history-browser@0.9.0",
    "aurelia-http-client": "github:aurelia/http-client@0.12.0",
    "aurelia-interface-platforms": "github:joelcoxokc/aurelia-interface-platforms@master",
    "aurelia-loader": "github:aurelia/loader@0.10.0",
    "aurelia-loader-default": "github:aurelia/loader-default@0.11.2",
    "aurelia-logging": "github:aurelia/logging@0.8.0",
    "aurelia-metadata": "github:aurelia/metadata@0.9.0",
    "aurelia-pal": "github:aurelia/pal@0.2.0",
    "aurelia-path": "github:aurelia/path@0.10.0",
    "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.8.0",
    "aurelia-router": "github:aurelia/router@0.13.0",
    "aurelia-task-queue": "github:aurelia/task-queue@0.8.0",
    "aurelia-templating": "github:aurelia/templating@0.16.0",
    "aurelia-templating-binding": "github:aurelia/templating-binding@0.16.1",
    "aurelia-templating-resources": "github:aurelia/templating-resources@0.16.1",
    "aurelia-templating-router": "github:aurelia/templating-router@0.17.0",
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.25",
    "bootstrap": "github:twbs/bootstrap@3.3.4",
    "commonmark": "npm:commonmark@0.22.0",
    "core-js": "npm:core-js@0.8.4",
    "css": "github:systemjs/plugin-css@0.1.19",
    "font-awesome": "npm:font-awesome@4.3.0",
    "joelcoxokc/aurelia-interface-grid": "github:joelcoxokc/aurelia-interface-grid@master",
    "joelcoxokc/aurelia-interface-platforms": "github:joelcoxokc/aurelia-interface-platforms@master",
    "nprogress": "github:rstacruz/nprogress@0.2.0",
    "github:aurelia/animator-css@0.16.0": {
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3"
    },
    "github:aurelia/animator-css@0.17.0": {
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-templating": "github:aurelia/templating@0.16.0"
    },
    "github:aurelia/binding@0.10.2": {
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.8.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/binding@0.8.6": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.2",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/binding@0.9.1": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/bootstrapper@0.17.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.8.0",
      "aurelia-framework": "github:aurelia/framework@0.16.0",
      "aurelia-history": "github:aurelia/history@0.7.0",
      "aurelia-history-browser": "github:aurelia/history-browser@0.8.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.10.0",
      "aurelia-logging-console": "github:aurelia/logging-console@0.7.1",
      "aurelia-router": "github:aurelia/router@0.12.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.15.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.15.2",
      "aurelia-templating-router": "github:aurelia/templating-router@0.16.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/bootstrapper@0.18.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.9.0",
      "aurelia-framework": "github:aurelia/framework@0.17.0",
      "aurelia-history": "github:aurelia/history@0.8.0",
      "aurelia-history-browser": "github:aurelia/history-browser@0.9.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.11.2",
      "aurelia-logging-console": "github:aurelia/logging-console@0.8.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-pal-browser": "github:aurelia/pal-browser@0.2.0",
      "aurelia-router": "github:aurelia/router@0.13.0",
      "aurelia-templating": "github:aurelia/templating@0.16.0",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.16.1",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.16.1",
      "aurelia-templating-router": "github:aurelia/templating-router@0.17.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/dependency-injection@0.10.1": {
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/dependency-injection@0.11.2": {
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/dependency-injection@0.9.2": {
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/event-aggregator@0.8.0": {
      "aurelia-logging": "github:aurelia/logging@0.7.0"
    },
    "github:aurelia/event-aggregator@0.9.0": {
      "aurelia-logging": "github:aurelia/logging@0.8.0"
    },
    "github:aurelia/framework@0.16.0": {
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/framework@0.17.0": {
      "aurelia-binding": "github:aurelia/binding@0.10.2",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.11.2",
      "aurelia-loader": "github:aurelia/loader@0.10.0",
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-path": "github:aurelia/path@0.10.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.8.0",
      "aurelia-templating": "github:aurelia/templating@0.16.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/history-browser@0.8.0": {
      "aurelia-history": "github:aurelia/history@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/history-browser@0.9.0": {
      "aurelia-history": "github:aurelia/history@0.8.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/http-client@0.11.0": {
      "aurelia-path": "github:aurelia/path@0.9.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/http-client@0.12.0": {
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-path": "github:aurelia/path@0.10.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/loader-default@0.10.0": {
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0"
    },
    "github:aurelia/loader-default@0.11.2": {
      "aurelia-loader": "github:aurelia/loader@0.10.0",
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0"
    },
    "github:aurelia/loader@0.10.0": {
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-path": "github:aurelia/path@0.10.0"
    },
    "github:aurelia/loader@0.8.7": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "core-js": "npm:core-js@0.9.18",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.6.3"
    },
    "github:aurelia/loader@0.9.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.3.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/logging-console@0.7.1": {
      "aurelia-logging": "github:aurelia/logging@0.7.0"
    },
    "github:aurelia/logging-console@0.8.0": {
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0"
    },
    "github:aurelia/metadata@0.7.3": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/metadata@0.8.0": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/metadata@0.9.0": {
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/pal-browser@0.2.0": {
      "aurelia-pal": "github:aurelia/pal@0.2.0"
    },
    "github:aurelia/route-recognizer@0.7.0": {
      "aurelia-path": "github:aurelia/path@0.9.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/route-recognizer@0.8.0": {
      "aurelia-path": "github:aurelia/path@0.10.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/router@0.12.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.8.0",
      "aurelia-history": "github:aurelia/history@0.7.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/router@0.13.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.11.2",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.9.0",
      "aurelia-history": "github:aurelia/history@0.8.0",
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-path": "github:aurelia/path@0.10.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.8.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/task-queue@0.8.0": {
      "aurelia-pal": "github:aurelia/pal@0.2.0"
    },
    "github:aurelia/templating-binding@0.15.0": {
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3"
    },
    "github:aurelia/templating-binding@0.16.1": {
      "aurelia-binding": "github:aurelia/binding@0.10.2",
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-templating": "github:aurelia/templating@0.16.0"
    },
    "github:aurelia/templating-resources@0.15.2": {
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating-resources@0.16.1": {
      "aurelia-binding": "github:aurelia/binding@0.10.2",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.11.2",
      "aurelia-loader": "github:aurelia/loader@0.10.0",
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-path": "github:aurelia/path@0.10.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.8.0",
      "aurelia-templating": "github:aurelia/templating@0.16.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating-router@0.16.1": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-router": "github:aurelia/router@0.12.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3"
    },
    "github:aurelia/templating-router@0.17.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.11.2",
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-path": "github:aurelia/path@0.10.0",
      "aurelia-router": "github:aurelia/router@0.13.0",
      "aurelia-templating": "github:aurelia/templating@0.16.0"
    },
    "github:aurelia/templating@0.13.16": {
      "aurelia-binding": "github:aurelia/binding@0.8.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-loader": "github:aurelia/loader@0.8.7",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.2",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating@0.15.3": {
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.3.0",
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating@0.16.0": {
      "aurelia-binding": "github:aurelia/binding@0.10.2",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.11.2",
      "aurelia-loader": "github:aurelia/loader@0.10.0",
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-path": "github:aurelia/path@0.10.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.8.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/validation@0.3.1": {
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3"
    },
    "github:gooy/aurelia-animator-velocity@0.0.4": {
      "aurelia-templating": "github:aurelia/templating@0.13.16",
      "jsol": "github:daepark/JSOL@master",
      "velocity": "github:julianshapiro/velocity@1.2.3"
    },
    "github:joelcoxokc/aurelia-interface-platforms@master": {
      "aurelia-animator-css": "github:aurelia/animator-css@0.16.0",
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.17.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.8.0",
      "aurelia-framework": "github:aurelia/framework@0.16.0",
      "aurelia-history": "github:aurelia/history@0.7.0",
      "aurelia-history-browser": "github:aurelia/history-browser@0.8.0",
      "aurelia-http-client": "github:aurelia/http-client@0.11.0",
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.10.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.7.0",
      "aurelia-router": "github:aurelia/router@0.12.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.15.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.15.2",
      "aurelia-templating-router": "github:aurelia/templating-router@0.16.1"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.5.1"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.10.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:rstacruz/nprogress@0.2.0": {
      "css": "github:systemjs/plugin-css@0.1.19"
    },
    "github:screendriver/plugin-sass@0.0.5": {
      "fetch": "npm:whatwg-fetch@0.9.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "sass.js": "npm:sass.js@0.9.4",
      "url": "github:jspm/nodelibs-url@0.1.0"
    },
    "github:twbs/bootstrap@3.3.4": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:asn1.js@2.2.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.25": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:browserify-aes@1.0.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-xor": "npm:buffer-xor@1.0.3",
      "cipher-base": "npm:cipher-base@1.0.2",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:browserify-cipher@1.0.0": {
      "browserify-aes": "npm:browserify-aes@1.0.5",
      "browserify-des": "npm:browserify-des@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
    },
    "npm:browserify-des@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "des.js": "npm:des.js@1.0.0",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:browserify-rsa@2.0.1": {
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.1"
    },
    "npm:browserify-sign@3.0.8": {
      "bn.js": "npm:bn.js@2.2.0",
      "browserify-rsa": "npm:browserify-rsa@2.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@3.1.0",
      "inherits": "npm:inherits@2.0.1",
      "parse-asn1": "npm:parse-asn1@3.0.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:buffer-xor@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:buffer@3.5.1": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:cipher-base@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:commonmark@0.18.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commonmark@0.22.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "entities": "npm:entities@1.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "mdurl": "npm:mdurl@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "string.prototype.repeat": "npm:string.prototype.repeat@0.2.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-js@0.8.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:create-ecdh@2.0.2": {
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@3.1.0"
    },
    "npm:create-hash@1.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@1.0.1",
      "sha.js": "npm:sha.js@2.4.4"
    },
    "npm:create-hmac@1.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:crypto-browserify@3.10.0": {
      "browserify-cipher": "npm:browserify-cipher@1.0.0",
      "browserify-sign": "npm:browserify-sign@3.0.8",
      "create-ecdh": "npm:create-ecdh@2.0.2",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "diffie-hellman": "npm:diffie-hellman@3.0.2",
      "inherits": "npm:inherits@2.0.1",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "public-encrypt": "npm:public-encrypt@2.0.1",
      "randombytes": "npm:randombytes@2.0.1"
    },
    "npm:des.js@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:diffie-hellman@3.0.2": {
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@2.0.1",
      "randombytes": "npm:randombytes@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:elliptic@3.1.0": {
      "bn.js": "npm:bn.js@2.2.0",
      "brorand": "npm:brorand@1.0.5",
      "hash.js": "npm:hash.js@1.0.3",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:entities@1.1.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:evp_bytestokey@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0"
    },
    "npm:font-awesome@4.3.0": {
      "css": "github:systemjs/plugin-css@0.1.19"
    },
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.19"
    },
    "npm:hash.js@1.0.3": {
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jquery@2.1.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:miller-rabin@2.0.1": {
      "bn.js": "npm:bn.js@2.2.0",
      "brorand": "npm:brorand@1.0.5"
    },
    "npm:parse-asn1@3.0.2": {
      "asn1.js": "npm:asn1.js@2.2.1",
      "browserify-aes": "npm:browserify-aes@1.0.5",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pbkdf2@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:public-encrypt@2.0.1": {
      "bn.js": "npm:bn.js@2.2.0",
      "browserify-rsa": "npm:browserify-rsa@2.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@3.0.2",
      "randombytes": "npm:randombytes@2.0.1"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:randombytes@2.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:ripemd160@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sass.js@0.9.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sha.js@2.4.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:velocity-animate@1.2.3": {
      "jquery": "npm:jquery@2.1.4",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
