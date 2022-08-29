import { Transform } from "ogl";
import Points from "./grid-points";
import Quads from "./grid-quads";

export default class extends Transform {
  constructor(gl, { data, loaded, info }) {
    super();
    this.gl = gl;

    this.data = data;
    this.loaded = loaded;
    this.info = info;

    // console.log(this.info);

    this.create();
  }

  create() {
    const { points, planes } = this.compute();
    // console.log(planes);

    // 1. points, offsetted
    this.points = new Points(this.gl, { points });
    this.points.setParent(this);

    // 2. squares, centerd
    this.squares = new Quads(this.gl, { points, planes });
    this.squares.setParent(this);
    // 3. instance particles, centered + random
    this.instances = null;
  }

  compute() {
    // ## Setup Grid
    const pointNum = this.data.length;
    const points = calcGrid(pointNum);

    // ## setup planes
    const filledSquares = this.info.total;
    const planesOffsetArray = new Float32Array(filledSquares * 2);
    const planesState = new Float32Array(filledSquares * 1);
    this.info.items.forEach((item, i) => {
      // xy offset
      const x = points.array[item.id * 2];
      const y = points.array[item.id * 2 + 1];
      planesOffsetArray.set([x, y], i * 2);
      // state
      planesState.set([item.state], i);
    });

    const planes = {
      array: planesOffsetArray,
      state: planesState,
    };

    return { points, planes };
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
