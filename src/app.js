import Gl from "./modules/gl/gl";
import Loader from "./modules/loader";
import { Router } from "./modules/router";
import State from "./modules/state";

class App {
  constructor() {
    this.body = document.querySelector("body");
    this.load();

    this.state = new State();
    // console.log("hey");
  }

  async load() {
    // # GL
    this.gl = new Gl();

    // # ROUTES
    this.router = new Router();
    this.router.on("T_START", (data) => this.initTransition(data));
    this.gl.events.on("clicked", (data) => this.initTransitionGl(data)); // get events from gl picking

    // # load + init
    this.loader = new Loader(this.gl.gl);
    const loaded = await this.loader.load();

    this.init(loaded);

    console.log(window.App.state);
  }

  init(loaded) {
    this.instancesLinks = loaded.config.instancesLink;
    this.gl.init(loaded);
  }

  /* --- Loop */
  update() {
    window.requestAnimationFrame(this.update.bind(this));
  }

  onResize() {
    // console.log('resizing');
  }

  /* --- Routes */
  initTransition({ next }) {
    // console.log("router transitioning in APP", next);
    this.gl.scene.toggleMovement();
    this.router.swap();
  }

  initTransitionGl(id) {
    // console.log("pick transition event", id);
    const link = this.instancesLinks[id];

    this.router?.onHover(link);
    this.router?.onClick(null, link);
  }
  /* --- Events */
}

window.App = new App();

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
