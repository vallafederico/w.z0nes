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

    // console.log();

    // 1. points, offsetted
    this.points = new Points(this.gl, { points });
    this.points.setParent(this);
    // 2. squares, centerd
    this.squares = new Quads(this.gl, { points, planes }, this.loaded);
    this.squares.setParent(this);
    // 3. instance particles, centered + random
    this.is = new Is(this.gl, {
      points,
      planes,
      instances,
      number: this.config.grid.inNum,
    });
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
    const insRand = new Float32Array(this.config.grid.inNum * 2);
    let insIndex = 0;

    this.config.zones.forEach((item, i) => {
      // xy OFFSET
      const x = points.array[item.id * 2];
      const y = points.array[item.id * 2 + 1];
      planesOffsetArray.set([x, y], i * 2);

      // STATE
      planesState.set([item.state], i);

      // check for INSTANCES
      if (item.in.length > 0) {
        item.in.forEach((inst) => {
          insPos.set([x, y], insIndex);
          insRand.set(
            [(Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9],
            insIndex
          );
          insIndex += 2;
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
