import { Geometry, Mesh, Plane } from "ogl";
import Program from "./mat/grid_quads_alias";

export default class extends Mesh {
  constructor(gl, { planes, idArray }) {
    super(gl);
    this.gl = gl;

    const { index, position } = new Plane(this.gl, 1, 1, 1, 1).attributes;

    this.geometry = new Geometry(this.gl, {
      index: index,
      position: position,
      a_offset: { instanced: 1, size: 2, data: planes.array },
      a_id: { instanced: 1, size: 4, data: idArray },
    });

    this.frustumCulled = false;
    this.program = new Program(this.gl);
    // this.position.z = + 0.1;
  }

  render(t) {}
}
