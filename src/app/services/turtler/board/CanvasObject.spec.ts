import { CanvasObject } from './CanvasObject';

fdescribe('CanvasObject', () => {
  let canvasObject: CanvasObject;

  beforeEach(() => {
    canvasObject = new CanvasObject();
  });

  it('should initialize with correct default values', () => {
    expect(canvasObject.position.x).toEqual(0);
    expect(canvasObject.position.y).toEqual(0);
    expect(canvasObject.width).toEqual(0);
    expect(canvasObject.height).toEqual(0);
    expect(canvasObject.rotation).toEqual(-90);
  });

  it('should reset to default values', () => {
    canvasObject.move(10, 10);
    canvasObject.rotate(90);
    canvasObject.reset();

    expect(canvasObject.position.x).toEqual(0);
    expect(canvasObject.position.y).toEqual(0);
    expect(canvasObject.width).toEqual(0);
    expect(canvasObject.height).toEqual(0);
    expect(canvasObject.rotation).toEqual(-90);
  });

  it('should move by the given delta', () => {
    canvasObject.position.x = 20;
    canvasObject.position.y = 20;
    canvasObject.move(10, 10);

    expect(canvasObject.position.x).toEqual(30);
    expect(canvasObject.position.y).toEqual(30);
  });

  it('should move to a given position', () => {
    canvasObject.moveTo(20, 20);

    expect(canvasObject.position.x).toEqual(20);
    expect(canvasObject.position.y).toEqual(20);
  });

  it('should move forward based on current rotation', () => {
    canvasObject.rotate(90);
    canvasObject.forward(10);

    expect(canvasObject.position.x).toEqual(10);
    expect(canvasObject.position.y).toEqual(0);
  });

  it('should move backward based on current rotation', () => {
    canvasObject.rotate(90);
    canvasObject.backward(10);

    expect(canvasObject.position.x).toEqual(-10);
    expect(canvasObject.position.y).toEqual(0);
  });

  it('should rotate by given delta', () => {
    canvasObject.rotate(90);

    expect(canvasObject.rotation).toEqual(0);
  });

  it('should set direction based on given rotation', () => {
    canvasObject.direction(45);

    expect(canvasObject.rotation).toEqual(-45);
  });

  it('should trigger onMove callbacks', () => {
    const mockCallback = jasmine.createSpy('mockCallback');
    canvasObject.onMove.push(mockCallback);

    canvasObject.move(10, 10);

    expect(mockCallback).toHaveBeenCalled();
  });
});
