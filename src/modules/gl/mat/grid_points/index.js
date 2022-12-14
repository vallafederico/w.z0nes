import { Program } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl, options = {}) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
    });

    // console.log(this);

    // console.log(this.uniforms);
    this.transparent = null;
    this.cullFace = null;
    // this.depthTest = false;

    this.uniforms = {
      u_time: { value: 0 },
    };
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }
}
