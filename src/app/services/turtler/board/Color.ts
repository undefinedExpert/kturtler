export class Color {
  r = 0;
  g = 0;
  b = 0;
  a = 1;

  constructor(r: number, g: number, b: number) {
    this.setColorFromRgb(r, g, b);
  }

  setColorFromRgb(r: number, g: number, b: number) {
    if (r > 255 || r < 0 || g > 255 || g < 0 || b > 255 || b < 0) {
      throw new Error(
        'Invalid RGB values. All values must be between 0 and 255.',
      );
    }

    this.r = r;
    this.g = g;
    this.b = b;
  }

  hex(): string {
    const { r, g, b } = this;

    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');

    return `#${red}${green}${blue}`;
  }
}
