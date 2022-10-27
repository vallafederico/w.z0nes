import { Program } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl, options = {}) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
    });

    const { sphere_tx } = window.db.loaded;

    // this.transparent = true;
    this.cullFace = null;
    // this.depthTest = true;

    this.uniforms = {
      u_time: { value: 0 },
      u_id_toggle: { value: 0 },
      u_tx: { value: sphere_tx },
      // u_cam: { value: [0, 0, 0] },
      u_a_inOut: { value: 1 },
    };
  }

  set inOut(val) {
    this.uniforms.u_a_inOut.value = val;
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }

  // set camera(camera) {
  //   this.uniforms.u_cam.value = camera;
  // }
}
