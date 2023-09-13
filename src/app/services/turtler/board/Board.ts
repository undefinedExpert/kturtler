import { Point } from '../types';
import { CanvasObject } from './CanvasObject';
import { Color } from './Color';
import { Cursor } from './Cursor';

export class Board {
  public canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private cursorElement!: HTMLElement;
  public Cursor: Cursor;

  constructor() {
    this.Cursor = new Cursor();
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.ctx = canvas.getContext('2d')!;
    this.resizeToNaitveSize(this.canvas);
  }

  resize() {
    const tempCanvas = document.createElement('canvas');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tempCtx = tempCanvas.getContext('2d')!;
    this.resizeToNaitveSize(tempCanvas);

    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    tempCtx.drawImage(this.canvas, 0, 0);

    const parent = this.canvas.parentNode as HTMLElement;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;

    const xOffset = (this.canvas.width - tempCanvas.width) * 0.5;
    const yOffset = (this.canvas.height - tempCanvas.height) * 0.5;

    this.ctx.drawImage(tempCanvas, xOffset, yOffset);
    this.Cursor.move(xOffset, yOffset);
  }

  setCursor(cursorElement: HTMLElement) {
    this.cursorElement = cursorElement;
    this.setCursorElementFromCanvasObject(this.Cursor);
    this.Cursor.onMove.push(this.setCursorElementFromCanvasObject.bind(this));
    this.cursorElement.style.display = 'block';
  }

  setCursorElementFromCanvasObject(object: CanvasObject) {
    this.cursorElement.style.left = `${
      object.position.x - this.cursorElement.offsetWidth * 0.5
    }px`;
    this.cursorElement.style.top = `${
      object.position.y - this.cursorElement.offsetHeight * 0.5
    }px`;
    this.cursorElement.style.transform = `rotate(${object.rotation}deg)`;
  }

  resizeToNaitveSize(canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  hasCanvas() {
    return this.canvas != null;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.Cursor.reset();
  }

  drawLine(from: Point, to: Point, color: Color, width = 1) {
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color.hex();

    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }

  drawCursor() {
    if (this.Cursor.isDrawingEnabled()) {
      this.setCursorElementFromCanvasObject(this.Cursor);
    }
  }

  drawLineToCursor(from: Point) {
    if (this.Cursor.isDrawingEnabled()) {
      return this.drawLine(
        from,
        this.Cursor.position,
        this.Cursor.color,
        this.Cursor.penWidth,
      );
    }
  }

  center(object: CanvasObject) {
    object.moveTo(this.canvas.width / 2, this.canvas.height / 2);
  }
}
