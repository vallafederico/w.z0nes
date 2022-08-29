import { Transform } from "ogl";
import Points from "./grid-points";
import Quads from "./grid-quads";
import Is from "./grid-is";

export default class extends Transform {
  constructor(gl, { loaded, config }) {
    super();
    this.gl = gl;

    this.loaded = loaded;
    this.config = config;
    // console.log("grid:", this.config.grid, "zones:", this.config.zones);

    this.create();
  }

  create() {
    const { points, planes, instances } = this.compute();

    // 1. points, offsetted
    this.points = new Points(this.gl, { points });
    this.points.setParent(this);

    // this.points2 = new Points(this.gl, { points });
    // this.points2.position.x -= 0.5;
    // this.points2.position.y -= 0.5;
    // this.points2.setParent(this);

    // 2. squares, centerd
    this.squares = new Quads(this.gl, { points, planes });
    this.squares.setParent(this);
    // 3. instance particles, centered + random
    this.is = new Is(this.gl, { points, planes, instances });
    this.is.setParent(this);
  }

  compute() {
    // ## Setup Grid
    const pointNum = this.config.grid.num;
    const points = calcGrid(pointNum);

    // ## setup planes
    const filledSquares = this.config.zones.length;
    const planesOffsetArray = new Float32Array(filledSquares * 2);
    const planesState = new Float32Array(filledSquares * 1);

    // ## random instances values
    const insPos = new Float32Array(this.config.grid.inNum * 2);
    const insRand = new Float32Array(this.config.grid.inNum);
    let insIndex = 0;
    let insRandIndex = 0;

    this.config.zones.forEach((item, i) => {
      // xy offset
      const x = points.array[item.id * 2];
      const y = points.array[item.id * 2 + 1];
      planesOffsetArray.set([x, y], i * 2);

      // state
      planesState.set([item.state], i);

      // check for instances
      if (item.in.length > 0) {
        item.in.forEach((inst) => {
          insPos.set([x, y], insIndex);
          insRand.set([Math.random() - 0.5], insRandIndex);

          // advance counter
          insIndex += 2;
          insRandIndex += 1;
          // console.log(item.in, insIndex);
        });
      }
    });

    // planes values
    const planes = {
      array: planesOffsetArray,
      state: planesState,
    };

    // instances values
    const instances = {
      array: insPos,
      rand: insRand,
    };

    // console.log(insRand);
    return { points, planes, instances };
  }
}

/** --  Utils */
function calcGrid(num) {
  const array = new Float32Array(num * 2);
  // params
  const sqnum = Math.sqrt(num);
  let counter = 0;

  // # OPS
  for (let i = sqnum; i > 0; i--) {
    for (let j = 0; j < sqnum; j++) {
      array.set([j, i], counter * 2);
      counter += 1;
    }
  }

  const offset = sqnum / 2;

  return { array, offset };
}
