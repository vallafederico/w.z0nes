import { Transform } from "ogl";
import Grid from "./grid";

export default class extends Transform {
  constructor(gl, { loaded, config }) {
    super();
    this.gl = gl;

    this.loaded = loaded;
    this.config = config;

    this.mvmt = {
      x: 0,
      y: 0,
      z: 0,
    };
    // console.log("GL: scene", this.loaded, this.data);

    this.create();
  }

  create() {
    /** -- Grid Creation */
    this.grid = new Grid(this.gl, {
      data: this.data,
      loaded: this.loaded,
      config: this.config,
    });

    this.grid.setParent(this);

    this.isOn = true;
    this.intiEvents();
  }

  render(t) {
    if (!this.isOn) return;
    // this.grid?.render(t);
  }

  resize(vp) {
    this.vp = vp;
    if (this.quad) this.quad.resize(vp);
  }

  /**+ --- Events */
  intiEvents() {
    this.mouse = {
      x: 0,
      y: 0,
      down: false,
    };

    document.onwheel = (e) => this.onWheel(e);
    document.onmousedown = () => (this.mouse.down = true);
    document.onmouseup = () => (this.mouse.down = false);
    document.onmousemove = (e) => this.onMouseMove(e);
  }

  onWheel(e) {
    // console.log(e.deltaY);

    // move
    this.gl.camera.position.z += e.deltaY * 0.05;
    // bounds
    if (this.gl.camera.position.z > 100) this.gl.camera.position.z = 100;
    if (this.gl.camera.position.z < 3) this.gl.camera.position.z = 3;
  }

  onMouseMove(e) {
    if (!this.mouse.down) return;
    // console.log(e.movementX, e.movementY);

    // move
    this.gl.camera.position.x -= e.movementX * 0.03;
    this.gl.camera.position.y += e.movementY * 0.03;
    // bounds
    if (this.gl.camera.position.x > 50) this.gl.camera.position.x = 50;
    if (this.gl.camera.position.x < -50) this.gl.camera.position.x = -50;
    if (this.gl.camera.position.y > 50) this.gl.camera.position.y = 50;
    if (this.gl.camera.position.y < -50) this.gl.camera.position.y = -50;
  }
}
