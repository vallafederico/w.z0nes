import regeneratorRuntime from "regenerator-runtime";
import Emitter from "./classes/emitter.js";

export default class Preloader extends Emitter {
  constructor(el = '[data-p="w"]', items = '[data-preload="true"]') {
    super();
    this.el = document.querySelector(el);
    this.percentage = 0;

    console.log("loader");
  }

  async load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

  animateOut() {
    this.emit("out");
    if (this.el) this.el.remove();
  }
}
