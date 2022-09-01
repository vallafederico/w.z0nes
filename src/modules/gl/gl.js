import { Renderer, Orbit, RenderTarget, Vec2 } from "ogl";
import Emitter from "tiny-emitter";
import Cam from "./_camera.js";
import Scene from "./_scene.js";

export default class {
  constructor() {
    this.wrapper = document.getElementById("c");
    this.vp = {
      dpr: Math.min(window.devicePixelRatio, 2),
    };

    this.renderer = new Renderer({ dpr: 2 });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0.94, 0.94, 0.94, 1);

    this.wrapper.appendChild(this.gl.canvas);

    this.camera = new Cam(this.gl, {});
    this.gl.camera = this.camera;
    this.camera.position.set(0, 0, 100);

    this.resize();
    this.events = new Emitter();

    // this.camera.lookAt([0, 0, 0]);
    // this.controls = new Orbit(this.camera);
  }

  init(loaded) {
    this.db = loaded;
    this.time = 0;
    this.scene = new Scene(this.gl, loaded);

    // ## PICKING target
    this.pickingTarget = new RenderTarget(this.gl);

    this.initEvents();

    this.render();
  }

  /** -- Events */

  initEvents() {
    // resize
    new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(
      this.wrapper
    );
    // mouse
    this.mouse = { x: 0, y: 0 };

    // ## PICKING
    this.picker = new Vec2();
    document.onclick = (e) => this.onPickClick(e);
  }

  onPickClick(e) {
    // check it not being a click&drag
    // ...

    // set the picker position
    // prettier-ignore
    this.picker.set(
      (e.x * this.gl.canvas.width) / this.gl.canvas.clientWidth,
      this.gl.canvas.height - (e.y * this.gl.canvas.height) / this.gl.canvas.clientHeight - 1
    );

    // set bool to true
    this.scene.grid.is.program.uniforms.u_id_toggle.value = 1; // set material to pickable value
    this.shouldPick = true;
  }

  instanceClicked(id) {
    this.events.emit("clicked", id - 1);
    // console.log(
    //   "picker instance clicked:",
    //   id,
    //   this.db.config.instances[id - 1]
    // );
  }

  /** -- Main Loop */

  render(scroll = 0) {
    this.time += 0.5;

    if (this.controls) this.controls.update();
    if (this.scene) this.scene.render(this.time);

    if (this.shouldPick) this.renderPick(); // pick if click

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });

    window.requestAnimationFrame(this.render.bind(this));
  }

  renderPick() {
    this.gl.clearColor(0, 0, 0, 0);
    // render to target
    this.renderer.render({
      scene: this.scene.grid.is,
      camera: this.camera,
      target: this.pickingTarget,
    });

    // save data to texture
    const data = new Uint8Array(4);
    this.gl.readPixels(
      this.picker.x, // x
      this.picker.y, // y
      1, // width
      1, // height

      this.gl.RGBA, // format
      this.gl.UNSIGNED_BYTE, // type
      data
    ); // typed array to hold result

    // convert to id
    const id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);
    // console.log("picking-id:", data, id, this.picker); // temporary

    if (id) this.instanceClicked(id); // send event to switch page

    // reset
    this.scene.grid.is.program.uniforms.u_id_toggle.value = 0; // set material to pickable value
    this.gl.clearColor(0.94, 0.94, 0.94, 1);

    this.shouldPick = false;
  }

  resize(entry) {
    const cw = entry ? entry.width : this.wrapper.clientWidth;
    const ch = entry ? entry.height : this.wrapper.clientHeight;

    this.vp.w = cw;
    this.vp.h = ch;
    this.vp.ratio = cw / ch;
    this.vp.viewSize = this.camera.getViewSize(this.vp.ratio);
    this.vp.viewRatio = this.vp.viewSize.w / this.vp.w;
    // this.vp.scrollx = window.scrollX;
    // this.vp.scrolly = window.scrollY;

    this.renderer.setSize(this.vp.w, this.vp.h);
    this.camera.perspective({
      aspect: this.vp.ratio,
    });

    this.scene?.resize(this.vp);

    // ## PICKING target
    this.pickingTarget = new RenderTarget(this.gl);
  }
}
