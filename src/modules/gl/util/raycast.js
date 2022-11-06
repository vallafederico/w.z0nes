import { Raycast, Vec2 } from "ogl";

export default class extends Raycast {
  constructor(gl) {
    super(gl);
    this.gl = gl;

    this.point = new Vec2(0, 0);
    this.centerPoint();
    this.castMouse(this.gl.camera, this.point);

    this.active = true;

    console.log(this);
  }

  render(t) {
    if (t % 10 !== 0 || !this.active) return;

    if (this.meshes && this.meshes.length > 0) {
      this.castMouse(this.gl.camera, this.point);

      const hits = this.intersectBounds(this.meshes, {
        maxDistance: 10,
      });

      //   if (hits && hits.length > 0) console.log(hits);
      if (hits) console.log(hits);
    }
  }

  // setters
  set _meshes(meshes) {
    this.meshes = meshes;
  }

  set _point({ x, y }) {
    this.point.set(x, y);
    console.log(x, y);
  }

  // utils
  centerPoint() {
    const x = 2 * (window.innerWidth / 2 / this.gl.renderer.width) - 1;
    const y = 2 * (1 - window.innerHeight / 2 / this.gl.renderer.height) - 1;

    const e = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    this.point.set(
      2.0 * (e.x / this.gl.renderer.width) - 1.0,
      2.0 * (1.0 - e.y / this.gl.renderer.height) - 1.0
    );

    // this._point = { x, y };
  }

  //   mouse() {
  //     const move = (e) => {
  //       this.point.set(
  //         2.0 * (e.x / this.gl.renderer.width) - 1.0,
  //         2.0 * (1.0 - e.y / this.gl.renderer.height) - 1.0
  //       );
  //     };

  //     document.addEventListener("mousemove", move, false);
  //     document.addEventListener("touchmove", move, false);
  //   }
}
