import { Transform, Mesh, Plane } from "ogl";
import Program from "./mat/grid_quads";
import Alias from "./grid-quads-alias";
import Picker from "./util/picker";

export default class extends Transform {
  constructor(gl, { points, planes }) {
    super();
    this.gl = gl;

    this.position.x = -points.offset;
    this.position.y = -points.offset;
    this.frustumCulled = false;

    this.create(planes, points);
  }

  create(planes, points) {
    const { state, array } = planes;

    // meshes
    this.quads = [];
    for (let i = 0; i < state.length; i++) {
      const quad = new Quad(this.gl);
      quad.program.uniforms.u_state.value = state[i];
      quad.position.set(array[i * 2], array[i * 2 + 1], 0);
      quad.setParent(this);
      this.quads.push(quad);
    }

    // picker
    this.picker = new Picker(this.gl);
    this.picker.e.on("INTERSECTING", (id) => this.intersecting(id));
    const values = this.picker.getPickingValues(state.length);

    // alias for picking
    this.alias = new Alias(this.gl, { planes, idArray: values });
    this.alias.setParent(this);
    this.picker._group = this.alias;
  }

  render(t) {
    // picker check
    if (window.App.gl.camera.position.z < 20) {
      this.picker.render(t);
    } else this.picker.stopIntersecting();

    // this.quads.forEach((quad) => quad.render(t, inOut));

    if (window.App.gl.camera.position.z < 5) {
      this.quads.forEach((quad) => quad.render(t, 0));
    } else this.quads.forEach((quad) => quad.render(t));
  }

  /** -- Animation */
  intersecting(id) {
    // console.log("int -", id - 1);

    this.quads.forEach((quad, i) => {
      if (i === id - 1) {
        quad.program.inOut = 0;
      } else {
        quad.program.inOut = 1;
      }
    });
  }
}

// ---------------- single quad
class Quad extends Mesh {
  constructor(gl) {
    super(gl);
    this.gl = gl;
    this.geometry = new Plane(this.gl, 1, 1, 1, 1);
    this.program = new Program(this.gl);
    this.frustumCulled = false;
  }

  render(t, visible = 1) {
    this.visible = visible;
    // console.log(inOut);
  }
}
