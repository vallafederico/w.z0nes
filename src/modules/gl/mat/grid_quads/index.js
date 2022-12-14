import { Program } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
    });

    // console.log(atlas_state);
    const { atlas_alt, atlas_state } = window.db.loaded;

    // console.log(this);
    // this.transparent = true;
    // this.setBlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.cullFace = null;
    // this.depthTest = false;

    this.uniforms = {
      u_state: { value: 0 },
      // functional
      u_time: { value: 0 },
      u_t1: { value: atlas_state },
      u_t2: { value: atlas_alt },
      // animation
      u_a_inOut: { value: 1 },
      u_a_visible: { value: 1 },
    };
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }

  set inOut(val) {
    this.uniforms.u_a_inOut.value = val;
  }

  set visible(val) {
    this.uniforms.u_a_visible.value = val;
  }

  // set camera(camera) {
  //   this.uniforms.u_cam.value = camera;
  // }
}
