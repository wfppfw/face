module.exports = class Complier {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    console.log(options);
    this.output = output;
  }
};
