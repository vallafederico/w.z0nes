import { Geometry, Mesh } from "ogl";
import Program from "./mat/grid_is";

export default class extends Mesh {
  constructor(gl, { points, planes, instances }) {
    super(gl);
    this.gl = gl;

    this.mode = this.gl.POINTS;
    this.geometry = new Geometry(this.gl, {
      position: { size: 2, data: instances.array },
      a_rand: { size: 1, data: instances.rand },
    });

    this.program = new Program(this.gl, {});

    this.position.x = -points.offset + 0.5;
    this.position.y = -points.offset + 0.5;
  }
}
