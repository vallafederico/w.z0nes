import { Geometry, Mesh, Plane } from "ogl";
import Program from "./mat/grid_quads";

export default class extends Mesh {
  constructor(gl, { points, planes }, { atlas_state }) {
    super(gl);
    this.gl = gl;

    const ig = new Plane(this.gl, 1, 1, 1, 1);

    const random = getFloat32RandomValue(
      window.db.config.zones.length,
      2,
      true
    );

    this.geometry = new Geometry(this.gl, {
      index: ig.attributes.index,
      position: ig.attributes.position,
      uv: ig.attributes.uv,
      // attributes
      a_offset: { instanced: 1, size: 2, data: planes.array },
      a_state: { instanced: 1, size: 1, data: planes.state },
      a_rand: {
        instanced: 1,
        size: 1,
        data: random,
      },
    });

    this.frustumCulled = false;
    this.program = new Program(this.gl, { atlas_state });

    this.position.x = -points.offset;
    this.position.y = -points.offset;
  }

  render(t) {
    // z - position
    if (
      window.App.gl.camera.position.z < 30 &&
      window.App.gl.camera.position.z > 5
    ) {
      if (this.isNear) return;
      // console.log("quads-near");
      this.animateNear(true);
      this.isNear = true;
    } else {
      if (!this.isNear) return;
      // console.log("quads-far");
      this.animateNear(false);
      this.isNear = false;
    }

    // z - disappearance last
    if (window.App.gl.camera.position.z < 5) {
      if (!this.isNearNear) return;
      // console.log("quads-near");
      this.animateNear(false);
      this.isNearNear = false;
    } else {
      if (this.isNearNear) return;
      // console.log("quads-far");
      this.animateNear(true);
      this.isNearNear = true;
    }
  }
  /* -- Animation */

  animateNear(isNear) {
    this.program.inOut = isNear ? 0 : 1;
  }
}

/**
 * Helpers
 */

function getFloat32RandomValue(length, size = 1, floored = false) {
  const array = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    let val = Math.random() * size;

    if (floored) val = Math.floor(val);

    array[i] = val;
  }

  return array;
}
