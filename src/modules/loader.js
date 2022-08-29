import { loadTexture } from "./gl/util/load";
import Emitter from "./classes/emitter.js";
import Db from "./db";
import { LIB } from "../assets/lib.js";

export default class Preloader extends Emitter {
  constructor(gl) {
    super();
    this.gl = gl;
    this.percentage = 0;

    // console.log("loader");
  }

  async load() {
    this.db = new Db();

    // # loads
    const [atlas_state] = await Promise.all([
      await loadTexture(this.gl, LIB.atlas_state),
    ]);

    const loaded = {
      atlas_state,
    };

    this.db.loaded = loaded;

    return this.db;
  }

  animateOut() {
    this.emit("out");
    if (this.el) this.el.remove();
  }
}

// src/assets/atlas_state.webp
