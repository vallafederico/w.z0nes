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
    const [atlas_state, sphere_tx, atlas_alt] = await Promise.all([
      await loadTexture(this.gl, LIB.atlas_state),
      await loadTexture(this.gl, LIB.sphere_tx),
      await loadTexture(this.gl, LIB.atlas_alt),
    ]);

    const loaded = {
      atlas_state,
      sphere_tx,
      atlas_alt,
    };

    this.db.loaded = loaded;
    window.db = this.db;

    return this.db;
  }

  animateOut() {
    this.emit("out");
    if (this.el) this.el.remove();
  }
}

// src/assets/atlas_state.webp
