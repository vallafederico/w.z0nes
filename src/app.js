import Gl from "./modules/gl/gl";
import Loader from "./modules/loader.js";

class App {
  constructor() {
    this.body = document.querySelector("body");
    this.load();
  }

  async load() {
    this.gl = new Gl();
    this.loader = new Loader(this.gl.gl);
    const loaded = await this.loader.load();

    this.init(loaded);
  }

  init(loaded) {
    this.gl.init(loaded);
  }

  /* --- Loop */

  update() {
    window.requestAnimationFrame(this.update.bind(this));
  }

  onResize() {
    // console.log('resizing');
  }

  /* --- Events */
}

new App();

/*


  addEventsListeners() {
    new ResizeObserver((entry) => this.onResize(entry[0].contentRect)).observe(
      this.body
    );

    if ("ontouchmove" in window) {
      window.addEventListener("touchstart", this.handleMouseDown.bind(this));
      window.addEventListener("touchmove", this.handleMouseMove.bind(this));
      window.addEventListener("touchend", this.handleMouseUp.bind(this));
    } else {
      window.addEventListener("mousedown", this.handleMouseDown.bind(this));
      window.addEventListener("mousemove", this.handleMouseMove.bind(this));
      window.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }
  }

    handleMouseDown() {}
  handleMouseMove() {}
  handleMouseUp() {}

  
*/
