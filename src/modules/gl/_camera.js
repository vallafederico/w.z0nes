import { Camera } from "ogl";

export default class extends Camera {
  constructor(gl, { fov = 25 }) {
    super();

    this.gl = gl;
    this.fov = fov;

    // console.log(this);
    this.far = 500;
  }

  get fovInRad() {
    return (this.fov * Math.PI) / 180;
  }

  set ratio(ratio) {
    this._ratio = ratio || this.gl.vp.ratio;
  }

  getViewSize(ratio = undefined) {
    if (ratio === undefined) ratio = this._ratio;
    // console.log(ratio);

    const height = Math.abs(this.position.z * Math.tan(this.fovInRad / 2) * 2);
    return { w: height * ratio, h: height };
  }

  get pixelSize() {
    const { h } = this.getViewSize();
    return h / window.innerHeight;
  }

  // get unit() {
  //   const { w, h } = this.getViewSize();
  //   // console.log(w, h);
  //   return h / this.gl.canvas.height;
  // }
}
