import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import * as LogManager from 'aurelia-logging';

@inject(EventAggregator)
export class Analytics {
	constructor(eventAggregator) {
		this.eventAggregator = eventAggregator;
		this.initialized = false;
		this.logger = LogManager.getLogger('analytics');
		this.shouldLog = false;
		this.shouldTrack = false;
	}

	attach() {
		if(!this.initialized) {
			if(this.shouldLog) {
				this.logger.error("Analytics must be initialized before use.");
			}
			throw new Error("Analytics must be initialized before use.");
		}

		this.eventAggregator.subscribe('router:navigation:success', payload => this._onNavigation(payload));
	}

	enableLogging(value) {
		this.shouldLog = value;
	}

	enableTracking(value) {
		this.shouldTrack = value;
	}

	init(id) {
		var script = document.createElement('script');
		script.text = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
			"(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
			"m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
			"})(window,document,'script','//www.google-analytics.com/analytics.js','ga');";
		document.querySelector('body').appendChild(script);

		window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
		ga('create', id, 'auto');
		ga('send', 'pageview');

		this.initialized = true;
	}

	isInitialized() {
		return this.initialized;
	}

	track(path, title) {
		if(!this.shouldTrack) { return; }
		if(!this.initialized) {
			if(this.shouldLog) {
				this.logger.warn("Try calling init() before calling 'track()'.");
			}
			return;
		}

		if(this.shouldLog) {
			this.logger.debug(`track: path = '${path}', title = '${title}'`);
		}
		ga('set', { page: path, title: title });
		ga('send', 'pageview');
	}

  _onNavigation(payload) {
    this.track(payload.instruction.fragment, payload.instruction.config.title);
  }
}
