import { Geometry, Mesh, Plane } from "ogl";
import Program from "./mat/grid_is";

export default class extends Mesh {
  constructor(gl, { points, planes, instances, number }) {
    super(gl);
    this.gl = gl;

    // this.mode = this.gl.POINTS;

    const idArray = this.setupPick(number);
    this.geometry = new Plane(this.gl, {
      width: 0.1,
      height: 0.1,
      attributes: {
        a_pos: { instanced: 1, size: 2, data: instances.array },
        a_rand: { instanced: 1, size: 2, data: instances.rand },
        a_id: { instanced: 1, size: 4, data: idArray },
      },
    });

    this.frustumCulled = false;
    this.program = new Program(this.gl, {});

    this.position.x = -points.offset + 0.5;
    this.position.y = -points.offset + 0.5;
  }

  render(t) {
    // // z - position
    if (window.App.gl.camera.position.z < 5) {
      if (this.isNear) return;
      // console.log("instance-near");
      this.animateNear(true);
      this.isNear = true;
    } else {
      if (!this.isNear) return;
      // console.log("instance-far");
      this.animateNear(false);
      this.isNear = false;
    }
  }

  /* -- Animation */

  animateNear(isNear) {
    this.program.inOut = isNear ? 0 : 1;
  }

  setupPick(number) {
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
