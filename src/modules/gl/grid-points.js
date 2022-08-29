import { Geometry, Mesh } from "ogl";
import Program from "./mat/grid_points";

export default class extends Mesh {
  constructor(gl, { points }) {
    super(gl);
    this.gl = gl;

    // console.log(points);

    this.mode = this.gl.POINTS;
    this.geometry = new Geometry(this.gl, {
      position: { size: 2, data: points.array },
    });

    this.program = new Program(this.gl, {});

    this.position.x = -points.offset;
    this.position.y = -points.offset;
  }
}
