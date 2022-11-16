import { Transform } from "ogl";
import Grid from "./grid";

import { lerp, clamp } from "../utils/math";

export default class extends Transform {
  constructor(gl, { loaded, config }) {
    super();
    this.gl = gl;

    this.loaded = loaded;
    this.config = config;

    this.mvmt = {
      x: -0,
      y: 0,
      z: 800,
      ex: -48, // 0
      ey: 50, // 0
      ez: 20, // 800
      canMove: true,
      lerp: 0.1,
    };

    this.a = {
      // near / far view
      isNear: false,
      nearValue: 30,
      // instance near
      isInstanceNear: false,
      instanceNearValue: 25,
    };

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
    // console.log("h");
    this.grid?.render(t);

    this.renderMovement();
  }

  toggleMovement() {
    this.mvmt.canMove = !this.mvmt.canMove;

    if (this.mvmt.canMove) this.mvmt.ez += 50;
    // console.log("toggle movement", this.mvmt.canMove);
  }

  renderMovement() {
    if (!this.mvmt.canMove) return;

    // compute bounds
    this.mvmt.ex = clamp(-50, 50, this.mvmt.ex);
    this.mvmt.ey = clamp(-50, 50, this.mvmt.ey);
    this.mvmt.ez = clamp(3, 100, this.mvmt.ez);

    // compute movement
    this.mvmt.x = lerp(this.mvmt.x, this.mvmt.ex, this.mvmt.lerp);
    this.mvmt.y = lerp(this.mvmt.y, this.mvmt.ey, this.mvmt.lerp);
    this.mvmt.z = lerp(this.mvmt.z, this.mvmt.ez, this.mvmt.lerp * 0.5);

    // animationtrigger

    if (this.gl.camera && this.mvmt) {
      this.gl.camera.position.x = this.mvmt.x;
      this.gl.camera.position.y = this.mvmt.y;
      this.gl.camera.position.z = this.mvmt.z;
    }

    // console.log(window.App.gl.camera.pixelSize);
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

    // # temp
    // this.gl.camera.position.x = -30;
    // this.gl.camera.position.y = 30;
  }

  onWheel(e) {
    if (!this.mvmt.canMove) return;
    this.mvmt.ez += e.deltaY * 0.02;
  }

  onMouseMove(e) {
    if (!this.mvmt.canMove) return;
    if (!this.mouse.down) return;

    // compute movememnt
    this.mvmt.ex -= e.movementX * 0.03 * (this.mvmt.z * 0.008);
    this.mvmt.ey += e.movementY * 0.03 * (this.mvmt.z * 0.008);
  }

  // ##PICKING
  onPick(e) {
    if (!this.mvmt.canMove) return;
    this.grid.is.program.uniforms.u_id_toggle = 1;
  }
}
