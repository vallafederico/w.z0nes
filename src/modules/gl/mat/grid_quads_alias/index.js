import { Program } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
    });

    // this.transparent = null;
    this.cullFace = null;
    // this.depthTest = false;

    this.uniforms = {
      u_id_toggle: { value: 0 },
    };
  }
}
