import { Geometry, Mesh } from "ogl";
import Program from "./mat/grid_is";

export default class extends Mesh {
  constructor(gl, { points, planes, instances, number }) {
    super(gl);
    this.gl = gl;

    this.mode = this.gl.POINTS;

    const idArray = this.setupPick(number);
    this.geometry = new Geometry(this.gl, {
      position: { size: 2, data: instances.array },
      a_rand: { size: 2, data: instances.rand },
      a_id: { size: 4, data: idArray },
    });

    this.program = new Program(this.gl, {});

    this.position.x = -points.offset + 0.5;
    this.position.y = -points.offset + 0.5;
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
