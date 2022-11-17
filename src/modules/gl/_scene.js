import { Transform } from "ogl";
import Grid from "./grid";

import { lerp, clamp } from "../utils/math";
import { CTRLS } from "../controls";

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
      // instance view
      isInstanceView: false,
      instanceViewValue: 0,
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
    this.mvmt.ex = clamp(-CTRLS.limitXY, CTRLS.limitXY, this.mvmt.ex);
    this.mvmt.ey = clamp(-CTRLS.limitXY, CTRLS.limitXY, this.mvmt.ey);
    this.mvmt.ez = clamp(
      CTRLS.limitZ - this.a.instanceViewValue,
      CTRLS.limitZfar,
      this.mvmt.ez
    );

    // compute movement
    this.mvmt.x = lerp(this.mvmt.x, this.mvmt.ex, this.mvmt.lerp);
    this.mvmt.y = lerp(this.mvmt.y, this.mvmt.ey, this.mvmt.lerp);
    this.mvmt.z = lerp(this.mvmt.z, this.mvmt.ez, this.mvmt.lerp * 0.5);

    // move camera
    if (this.gl.camera && this.mvmt) {
      this.gl.camera.position.x = this.mvmt.x;
      this.gl.camera.position.y = this.mvmt.y;
      this.gl.camera.position.z = this.mvmt.z;
    }

    // console.log(this.gl.camera.position.z);
  }

  toInstanceView(flag) {
    if (!this.a.isInstanceView) {
      // console.log("IN");
      this.a.instanceViewValue = 10;
      this.mvmt.ez = 3;
      this.a.isInstanceView = true;
      window.App.state.s.free = false;
    } else {
      // console.log("OUT");
      this.a.instanceViewValue = 0;
      this.a.isInstanceView = false;
      window.App.state.s.free = true;
    }
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
    document.onkeyup = (e) => this.onKeyUp(e);
  }

  onKeyUp(e) {
    if (e.key === " ") {
      this.toInstanceView(true);
    }
  }

  onWheel(e) {
    if (!this.mvmt.canMove) return;
    this.mvmt.ez += e.deltaY * 0.02;

    // reset instance view if zoom out
    if (this.gl.camera.position.z > 3) {
      if (this.a.isInstanceView) this.toInstanceView();
    }
  }

  onMouseMove(e) {
    if (!window.App.state.s.free) return;
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
