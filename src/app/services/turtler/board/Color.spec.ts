import { Color } from './Color';

fdescribe('Color', () => {
  it('should initialize with correct default values', () => {
    const color = new Color(100, 150, 200);

    expect(color.r).toEqual(100);
    expect(color.g).toEqual(150);
    expect(color.b).toEqual(200);
    expect(color.a).toEqual(1);
  });

  it('should throw error for invalid RGB values', () => {
    const msg = 'Invalid RGB values. All values must be between 0 and 255.';
    expect(() => new Color(-1, 150, 200)).toThrowError(msg);
    expect(() => new Color(256, 150, 200)).toThrowError(msg);
    expect(() => new Color(100, -1, 200)).toThrowError(msg);
  });

  it('should set color from RGB values', () => {
    const color = new Color(100, 150, 200);
    color.setColorFromRgb(50, 60, 70);

    expect(color.r).toEqual(50);
    expect(color.g).toEqual(60);
    expect(color.b).toEqual(70);
  });

  it('should return the correct hex value', () => {
    const color = new Color(16, 32, 64);

    expect(color.hex()).toEqual('#102040');
  });

  it('should return the correct hex value after update', () => {
    const color = new Color(9, 10, 11);
    color.setColorFromRgb(0, 0, 0);

    expect(color.hex()).toEqual('#000000');
  });

  it('should pad single digit hex values', () => {
    const color = new Color(9, 10, 11);

    expect(color.hex()).toEqual('#090a0b');
  });
});
