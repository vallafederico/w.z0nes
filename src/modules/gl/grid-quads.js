import { Geometry, Mesh, Plane } from "ogl";
import Program from "./mat/grid_quads";

export default class extends Mesh {
  constructor(gl, { points, planes }) {
    super(gl);
    this.gl = gl;

    const ig = new Plane(this.gl, 0.5, 0.5, 1, 1);

    this.geometry = new Geometry(this.gl, {
      index: ig.attributes.index,
      position: ig.attributes.position,
      uv: ig.attributes.uv,
      // attributes
      a_offset: { instanced: 1, size: 2, data: planes.array },
      a_state: { instanced: 1, size: 1, data: planes.state },
    });

    this.frustumCulled = false;
    this.program = new Program(this.gl, {});

    this.position.x = -points.offset;
    this.position.y = -points.offset;
  }
}
