import { RenderTarget, Vec2 } from "ogl";
import Emitter from "tiny-emitter";

export default class extends RenderTarget {
  constructor(gl) {
    super(gl);
    this.gl = gl;
    this.shouldPick = true;

    this.point = new Vec2();
    this.centerPoint();

    this.i = {
      intersecting: false,
      id: null,
    };

    this.e = new Emitter();
  }

  render(t = 0) {
    if (t % 6 !== 0) return;
    if (!this.shouldPick || !this.group) return;

    this.group.program.uniforms.u_id_toggle.value = 1;

    this.gl.clearColor(0, 0, 0, 0);

    // render to target
    window.App.gl.renderer.render({
      scene: this.group,
      camera: window.App.gl.camera,
      target: this,
    });

    // save data to texture
    const data = new Uint8Array(4);
    this.gl.readPixels(
      this.point.x, // x
      this.point.y, // y
      1, // width
      1, // height
      this.gl.RGBA, // format
      this.gl.UNSIGNED_BYTE, // type
      data
    ); // typed array to hold result

    // convert to id
    const id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);
    // console.log("picking-id:", id); // temporary

    if (id) {
      this.isIntersecting(id);
    } else {
      if (!this.i.intersecting) return;
      this.i.id = null;
      this.i.intersecting = false;
      // console.log("not intersecting anymore");
      this.e.emit("INTERSECTING", null);
    }

    // reset
    this.group.program.uniforms.u_id_toggle.value = 0;
    this.gl.clearColor(1, 1, 1, 1);
  }

  isIntersecting(id) {
    if (this.i.id === id) return;

    if (this.i.id !== null && this.i.id !== id) {
      this.i.id = id;
      this.i.intersecting = true;
      // console.log("different one", id);
      this.e.emit("INTERSECTING", id);
      // this.emitter.emit("intersecting", id);
    } else {
      this.i.id = id;
      this.i.intersecting = true;
      // console.log("intersecting from NOT:", id);
      this.e.emit("INTERSECTING", id);
    }
  }

  set _group(group) {
    this.group = group;
  }

  set _point({ x, y }) {
    this.point.set(x, y);
  }

  centerPoint() {
    const x = this.gl.canvas.width / 2;
    const y = this.gl.canvas.height / 2;
    this.point.set(x, y);
  }

  /* Setup
   */

  getPickingValues(number) {
    const array = new Float32Array(number * 4);

    for (let i = 0; i < number; i++) {
      let id = i + 1;
      array.set(
        [
          ((id >> 0) & 0xff) / 0xff,
          ((id >> 8) & 0xff) / 0xff,
          ((id >> 16) & 0xff) / 0xff,
          ((id >> 24) & 0xff) / 0xff,
        ],
        i * 4
      );
    }

    // console.log("pick:", number, array);
    return array;
  }
}
