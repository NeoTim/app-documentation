import {customElement, bindable, inject} from 'aurelia-framework';
import {OverlayController} from 'resources/au-overlay';
import {isTouch} from 'aurelia-interface-platforms';
import {AUChannel} from 'services/channel';

const ACTIVE_CLASSNAME = 'is-active';
const DEFAULT_CLASSNAME = 'au-settings-button';

@customElement('au-settings-button')
@inject(Element, AUChannel, OverlayController)
export class AuSettingsButtonElement {
  @bindable active = null;

  bindableKey = 'active';
  name = 'settings';

  constructor(element, channel, overlayController) {
    element.className += ` ${DEFAULT_CLASSNAME}`;
    channel.createInstruction(this);

    this.element = element;
    this.channel = channel;
    this.overlayController = overlayController;
    this.onClick = this.onClick.bind(this);
  }

  open() {
    this.overlay && this.overlay.attach();
    this.active = true;
  }

  close() {
    this.overlay && this.overlay.destroy();
    this.active = false;
  }

  created() {
    let channel = this.channel;

    channel.subscribe('navigation-activated', (payload) => {
      if (this.active && !payload.validate(this)) {
        this.close();
      }
    });

    channel.subscribe('activate-settings', (payload) => {
      this.open();
    });

    channel.subscribe('deactivate-settings', (payload) => {
      this.close();
    });
  }

  attached(){
    this.overlay = this.overlayController.createOverlay();
    this.overlay.onClick(()=> this.close());
  }

  detached() {
    this.button.removeEventListener(this.clickEvent, this.touchstart);
  }

  activeChanged(value) {
    this.element.classList[value ? 'add' : 'remove'](ACTIVE_CLASSNAME);

    if (value) {
      this.channel.publish('navigation-activated', this.channelInstruction);
    } else {
      this.channel.publish('navigation-deactivated', this.channelInstruction);
    }
  }

  onClick($event) {
    if (this.active) this.close();
    else this.open();
  }
}
