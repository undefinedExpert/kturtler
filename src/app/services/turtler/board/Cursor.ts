import { CanvasObject } from './CanvasObject';
import { Color } from './Color';

export enum CursorStateEnum {
  UP,
  DOWN,
}

export class Cursor extends CanvasObject {
  drawingState: CursorStateEnum = CursorStateEnum.DOWN;
  penWidth = 3;
  color: Color = new Color(0, 255, 0);

  public override reset() {
    super.reset();
    this.penWidth = 3;
    this.color = new Color(0, 255, 0);
  }

  public setPenWidth(width: number) {
    this.penWidth = width;
  }

  public setPenColor(color: Color) {
    this.color = color;
  }

  public setDrawingEnabled() {
    this.drawingState = CursorStateEnum.DOWN;
  }

  public setDrawingDisabled() {
    this.drawingState = CursorStateEnum.UP;
  }

  public isDrawingEnabled() {
    return this.drawingState === CursorStateEnum.DOWN;
  }
}
