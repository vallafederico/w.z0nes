export default class {
  constructor() {
    this.data = [];
    this.info = {};
    this.init();
  }

  init() {
    // # DEFINE
    const params = {
      itemsCount: 10000,
    };

    // create empty
    for (let i = 0; i < params.itemsCount; i++) {
      this.data.push(null);
    }

    // insert items
    const items = document.querySelectorAll('[data-project="meta"]');
    // (...) !!! IMPORTANT - compute same items with multiple instances ...

    const computeInfo = [...items].map((item) => {
      const content = JSON.parse(item.textContent);

      if (content.state === "FULL") {
        content.state = 1;
      } else if (content.state === "WIP") {
        content.state = 0;
      }

      return content;
    });

    this.info = {
      total: items.length,
      items: computeInfo,
    };

    for (const item of items) {
      const data = JSON.parse(item.textContent);
      this.data.splice(data.id, 1, data);
    }

    // # check!
    // console.log(this.data, this.data.length);
  }
}
