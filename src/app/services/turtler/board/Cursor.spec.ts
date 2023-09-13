import { Cursor, CursorStateEnum } from './Cursor';
import { Color } from './Color';

fdescribe('Cursor', () => {
  let cursor: Cursor;

  beforeEach(() => {
    cursor = new Cursor();
  });

  it('should initialize with correct default values', () => {
    expect(cursor.drawingState).toEqual(CursorStateEnum.DOWN);
    expect(cursor.penWidth).toEqual(3);
    expect(cursor.color).toEqual(jasmine.any(Color));
  });

  it('should reset properties correctly', () => {
    cursor.setPenWidth(10);
    cursor.setPenColor(new Color(255, 0, 0));
    cursor.reset();

    expect(cursor.penWidth).toEqual(3);
    expect(cursor.color).toEqual(jasmine.any(Color));
    expect(cursor.color.r).toEqual(0);
    expect(cursor.color.g).toEqual(255);
    expect(cursor.color.b).toEqual(0);
  });

  it('should set pen width correctly', () => {
    cursor.setPenWidth(7);

    expect(cursor.penWidth).toEqual(7);
  });

  it('should set pen color correctly', () => {
    const newColor = new Color(255, 0, 0);
    cursor.setPenColor(newColor);

    expect(cursor.color).toEqual(newColor);
  });

  it('should enable and disable drawing correctly', () => {
    cursor.setDrawingEnabled();
    expect(cursor.isDrawingEnabled()).toBeTrue();

    cursor.setDrawingDisabled();
    expect(cursor.isDrawingEnabled()).toBeFalse();
  });
});
