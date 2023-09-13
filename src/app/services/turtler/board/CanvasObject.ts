import { Point } from '../types';
import { angleToRad } from './utils';

export class CanvasObject {
  public position: Point = { x: 0, y: 0 };
  public width = 0;
  public height = 0;
  public rotation = -90;
  public onMove: ((object: CanvasObject) => void)[] = [];

  public reset() {
    this.position.x = 0;
    this.position.y = 0;
    this.width = 0;
    this.height = 0;
    this.rotation = -90;
    this.onMove.forEach((v) => v(this));
  }

  public move(dx: number, dy: number) {
    this.position.x += dx;
    this.position.y += dy;
    this.onMove.forEach((v) => v(this));
  }

  public moveTo(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    this.onMove.forEach((v) => v(this));
  }

  public forward(distance: number) {
    const dx = distance * Math.cos(angleToRad(this.rotation));
    const dy = distance * Math.sin(angleToRad(this.rotation));

    this.move(dx, dy);
  }

  public backward(distance: number) {
    const dx = distance * Math.cos(angleToRad(this.rotation));
    const dy = distance * Math.sin(angleToRad(this.rotation));

    this.move(-dx, -dy);
  }

  public rotate(deltaRotation: number) {
    this.rotation += deltaRotation;
  }

  public direction(rotation: number) {
    this.rotation = -90 + rotation;
  }
}
