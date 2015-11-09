import {noView, customAttribute, customElement, bindable, inject, sync} from 'aurelia-framework';
import {OverlayController} from 'resources/au-overlay';
import {AUChannel} from 'services/channel';

const ACTIVE_CLASSNAME = 'is-active';
const DEFAULT_CLASSNAME = 'au-aside';

@customElement('au-aside')
@inject(Element, AUChannel, OverlayController)
export class AuAsideElement {

  @bindable active = null;
  @sync('[au-menu-item]') _items = [];

  items = [];
  name = 'aside';
  bindableKey = 'active';

  constructor(element, channel, overlayController) {
    element.className += ` ${DEFAULT_CLASSNAME}`;
    channel.createInstruction(this, this.name, this.bindableKey);

    this.element  = element;
    this.channel  = channel;
    this.open     = this.open.bind(this);
    this.close    = this.close.bind(this);
    this.overlayController = overlayController;
  }

  bind() {
    let channel = this.channel;

    channel.subscribe('navigation-activated', (payload) => {
      !payload.validate(this) && this.close();
    });

    channel.subscribe('activate-aside', (payload)=> {
      this.open();
    });
    channel.subscribe('deactivate-aside', (view)=> this.close(veiw));
    channel.subscribe('set-au-menu', (view) => this.setContent(view))
  }

  attached() {
    this.parentElement = this.element.parentElement;
    this.overlay = this.overlayController.createOverlay();

    this.overlay.onClick(
      ($event)=> this.close()
    );
  }

  activeChanged(value) {
    this.element.classList[value ? 'add' : 'remove'](ACTIVE_CLASSNAME);
    if (value) {
      this.channel.publish('navigation-activated', this.channelInstruction);
      console.log(this.parentElement)
      this.overlay.attach();
    } else {
      this.channel.publish('navigation-deactivated', this.channelInstruction);
      this.overlay.detach();
    }
  }

  open($event) {
    if (!this.overlay) {
       this.overlay.detach();
    }
    this.active = true;
  }

  close($event) {
    this.overlay && this.overlay.destroy();
    this.active = false;
    this.overlay.detach();
  }

  setContent(view) {
    if (this.activeView) {
      this.content.removeChild(this.activeView.element);
    }

    this.activeView = view;
    this.content.appendChild(this.activeView.element);
  }
}


@customElement('au-aside-placeholder')
@noView
@inject(Element)
export class AuAsidePlaceholderElement {
  constructor(element) {}
  attached(){}
}

