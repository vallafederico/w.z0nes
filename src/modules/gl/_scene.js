import { Transform } from "ogl";
import Grid from "./grid";
import Quad from "./_/_quad.js";

export default class extends Transform {
  constructor(gl, { data, loaded, info }) {
    super();
    this.gl = gl;
    this.data = data;
    this.loaded = loaded;
    this.info = info;

    // console.log("GL: scene", this.loaded, this.data);

    this.create();
  }

  create() {
    /** -- Grid Creation */
    this.grid = new Grid(this.gl, {
      data: this.data,
      loaded: this.loaded,
      info: this.info,
    });

    this.grid.setParent(this);

    this.isOn = true;
  }

  render(t) {
    if (!this.isOn) return;
    if (this.quad) this.quad.render(t);
    if (this.quads) this.quads.forEach((item) => item.render(t));
  }

  resize(vp) {
    this.vp = vp;
    if (this.quad) this.quad.resize(vp);
  }
}
