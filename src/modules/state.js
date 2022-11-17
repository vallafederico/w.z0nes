export default class {
  constructor() {
    this.s = {
      free: true,
      trigger: false,
      instance: false,
    };
  }

  set free(value = true) {
    this.s.trigger = false;
    this.s.instance = false;
    this.s.free = value;
  }

  set trigger(value = true) {
    this.s.free = false;
    this.s.instance = false;
    this.s.trigger = value;
  }

  set instance(value = true) {
    this.s.free = false;
    this.s.trigger = false;
    this.s.instance = value;
  }
}
