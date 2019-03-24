/* eslint-disable no-console */
class Console {
  static greeting() {
    this.log('No regrets');
  }

  static log() {
    console.log(...arguments);
  }

  static warn() {
    console.warn(...arguments);
  }

  static error() {
    console.error(...arguments);
  }
}

export default Console;
