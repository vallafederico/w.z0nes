import { Program } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl, { atlas_state }) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
    });

    console.log(atlas_state);

    // console.log(this.uniforms);
    this.transparent = null;
    this.cullFace = null;
    // this.depthTest = false;

    this.uniforms = {
      u_time: { value: 0 },
      u_t1: { value: atlas_state },
    };
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }
}
