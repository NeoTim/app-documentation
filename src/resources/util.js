import {isTouch} from 'aurelia-interface-platforms';
import {DOM} from 'aurelia-pal';

export const clickEvent = isTouch ? 'touchstart' : 'click';

export function onElementEvent(element, eventName, bubbles) {
  function onEvent(trigger, _bubbles) {
    bubbles = _bubbles || bubbles;
    return new Promise(resolve => {
      element.addEventListener(eventName, handler, bubbles);
      trigger();

      function handler() {
        element.removeEventListener(eventName, handler, bubbles);
        resolve();
      }
    });
  }

  if (element instanceof Element) {
    return onEvent;
  }
}

export function onDocumentEvent(eventName, handler, bubbles) {
  return new Promise( resolve => {
    DOM.addEventListener(clickEvent, handleClickEvent, true);

    function handleClickEvent(e) {
      if (typeof handler === 'function') handler(e, dispose);
      else dispose();
    }

    function dispose() {
      DOM.removeEventListener(clickEvent, handleClickEvent, true);
      resolve();
    }
  });
}

export function onAnimationEnd(element, bubbles, trigger) {
  trigger = trigger || bubbles;
  let _handler = onElementEvent(element, 'animationend', bubbles);
  return typeof trigger === 'function' ? _handler(trigger, bubbles) : _handler;
}

export function onTransitionEnd(element, bubbles, trigger) {
  trigger = trigger || bubbles;
  let _handler = onElementEvent(element, 'transitionend', bubbles);
  return typeof trigger === 'function' ? _handler(trigger, bubbles) : _handler;
}

export function resolvePromise(promise, handler) {
  return handler ? promise.then(handler) : promise;
}
