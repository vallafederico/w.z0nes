export default class {
  constructor() {
    // this.data = [];
    this.info = {};
    this.init();
  }

  init() {
    this.config = {
      grid: {
        num: 10000,
        inNum: 0,
      },
    };

    let last;
    this.config.zones = [];
    [...document.querySelectorAll('[data-project="meta"]')].forEach(
      (item, i) => {
        const content = JSON.parse(item.textContent);

        // instances
        if (last === content.id) {
          this.config.zones[this.config.zones.length - 1].in.push(
            content.in[0]
          );
        } else {
          last = content.id;
          // console.log(last);

          // compute content
          if (content.state === "FULL") {
            content.state = 1;
          } else if (content.state === "WIP") {
            content.state = 0;
            content.in = []; // delete INSTANCES if WIP
          }
          this.config.zones.push(content);
        }

        // get total INSTANCES number
        this.config.grid.inNum += content.in.length;
      }
    );

    // console.log(array, ITEMS);
  }
}
