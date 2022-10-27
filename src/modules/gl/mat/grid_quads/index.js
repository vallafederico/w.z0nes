import { Program } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl, { atlas_state }) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
    });

    // console.log(atlas_state);
    const { atlas_alt } = window.db.loaded;

    // console.log(this.uniforms);
    this.transparent = null;
    this.cullFace = null;
    // this.depthTest = false;

    this.uniforms = {
      u_time: { value: 0 },
      u_t1: { value: atlas_state },
      u_t2: { value: atlas_alt },
      // u_cam: { value: [0, 0, 0] },
      // animation
      u_a_inOut: { value: 1 },
    };
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }

  set inOut(val) {
    this.uniforms.u_a_inOut.value = val;
  }

  // set camera(camera) {
  //   this.uniforms.u_cam.value = camera;
  // }
}
