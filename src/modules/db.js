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
    this.config.instances = [];
    this.config.instancesLink = [];
    const dbElements = [...document.querySelectorAll('[data-project="meta"]')];

    dbElements.forEach((item, i) => {
      const childItem = item.children[0].children[0];
      let linkItem = item.querySelector("a");

      const content = JSON.parse(childItem.textContent);

      // instances
      if (last === content.id) {
        this.config.zones[this.config.zones.length - 1].in.push(content.in[0]);

        if (content.state !== "WIP") this.config.instancesLink.push(linkItem); // push link if instance is full
      } else {
        last = content.id;

        // compute content
        if (content.state === "FULL") {
          content.state = 1;
          this.config.instancesLink.push(linkItem); // push link if instance is full
        } else if (content.state === "WIP") {
          content.state = 0;
          content.in = []; // delete INSTANCES if WIP
          // linkItem = []; // delete LINK if WIP
        }

        // push content
        this.config.zones.push(content);
      }

      // get total INSTANCES number
      this.config.instances.push(...content.in);
      this.config.grid.inNum += content.in.length;
    });

    // console.log(array, ITEMS);
  }
}
