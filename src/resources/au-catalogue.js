import {customElement, bindable, inject} from 'aurelia-framework';
import {Container} from 'aurelia-dependency-injection';
import {clickEvent} from './util';
import {AUChannel} from 'services/channel';

@inject(Element, AUChannel)
@customElement('au-catalogue')
export class CatalogueComponent {
  @bindable active = null;
  @bindable article = null;
  @bindable _narratives = [];
  @bindable narratives = [];

  constructor(element, channel) {
    this.element = element;
    this.channel = channel;
    this.onClick = this.onClick.bind(this);
    this.onTrigger = this.onTrigger.bind(this);
  }

  bind(bindingContext) {
    this.articleView = bindingContext;
    this.articleChanged(this.article);
  }

  bind() {
    this.trigger.addEventListener(clickEvent, this.onTrigger);
    this.listItems.addEventListener(clickEvent, this.onClick, true);
    this.subscription = this.channel.subscribe('au-set-article', ()=> {
      this.fetchNarratives();
    });
  }

  attached() {
    this.parent = this.element.parentElement;
    this.fetchNarratives();
  }

  unbind() {
    this.trigger.removeEventListener(clickEvent, this.onTrigger);
    this.listItems.removeEventListener(clickEvent, this.onClick, true);
    this.subscription.dispose();
  }

  onTrigger(event) {
    this.active = !this.active;
  }

  onClick(event) {
    let id = event.target.getAttribute('data-id');
    if (event.target.nodeName === 'LI') {
      let narrative = this.getNarrative(id);
      this.scrollTo(narrative.element);
    }
  }

  scrollTo(element) {
    let top = (element.offsetTop - 20);
    this.channel.publish('au-scrollTo', top);
  }

  activeChanged(value) {
    this.element.classList[value ? 'add' : 'remove']('is-active');
  }

  fetchNarratives() {
    this._narratives = this.parent.getElementsByTagName('narrative');
    console.log(this._narratives);
  }

  getNarrative(id) {
    return this.narratives.find(n => n.uid === id);
  }

  _narrativesChanged() {
    this.narratives = [];
    let arr = [];
    for (let i in this._narratives) {
      let n = this._narratives.item(i);
      let vm = n.au.controller.viewModel;
      let title = vm.title || vm._title;
      if (title) {
        if (!arr.find(x => x.uid === vm.uid)) {
          arr.push({
            model: vm,
            title: title,
            element: vm.element,
            uid: vm.uid
          });
        }
      }
    }
    this.narratives = arr;
  }


  articleChanged(article) {}
}
