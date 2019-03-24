/* eslint-disable no-console */
class Console {
  static greeting() {
    this.log(
      '%c+',
      `font-size: 1px; padding: 95px 232px; line-height: 65px; background: url(${
        process.env.FRONT_HOST
      }/static/images/no-regrets.gif); background-size: 464px 260px; color: transparent;`,
    );
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
