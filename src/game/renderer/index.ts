import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    RADIUS,
    Drawing,
} from '../constants';
import { Rect, Button, Update } from '../types';

export default class CanvasContainer {
  width = CANVAS_WIDTH;

  height = CANVAS_HEIGHT;

  context: CanvasRenderingContext2D;

  element: HTMLCanvasElement;

  constructor(canvasElement: HTMLCanvasElement) {
      const canvasContext = canvasElement.getContext('2d');

      this.context = canvasContext as CanvasRenderingContext2D;
      this.element = canvasElement;

      this.element.width = CANVAS_WIDTH;
      this.element.height = CANVAS_HEIGHT;
  }

  rect({
      x, y, width, height, color, borderColor, text, textColor,
  }: Rect) {
      // if (mode === RectMode.Fill) {
      //   this.context.fillStyle = color || 'black';
      //   this.context.fillRect(x, y, width, height);
      // } else if (mode === RectMode.Stroke) {
      //   this.context.strokeStyle = color || 'black';
      //   this.context.strokeRect(x, y, width, height);
      // } else if (mode === RectMode.New) {
      this.context.beginPath();
      this.context.moveTo(x, y + height - RADIUS);
      this.context.arcTo(x, y, x + RADIUS, y, RADIUS);
      this.context.lineTo(x + width - RADIUS, y);
      this.context.arcTo(x + width, y, x + width, y + RADIUS, RADIUS);
      this.context.lineTo(x + width, y + height - RADIUS);
      this.context.arcTo(x + width, y + height, x + RADIUS, y + height, RADIUS);
      this.context.lineTo(x + RADIUS, y + height);
      this.context.arcTo(x, y + height, x, y, RADIUS);
      if (color) {
          this.context.fillStyle = color;
          this.context.fill();
      }
      if (borderColor) {
          this.context.strokeStyle = borderColor;
          this.context.stroke();
      }
      if (text && textColor) {
          this.context.fillStyle = textColor;
          this.context.textAlign = 'center';
          this.context.font = 'bold 24px Inter, sans-serif ';
          this.context.fillText(text, x + (width / 2), y + (height / 2) + 8);
      }
      // }
  }

  drawButton({
      x, y, width, height, text, color, borderColor, textColor = 'white',
  }: Button) {
      this.rect({
          x, y, width, height, color, borderColor,
      });

      this.context.fillStyle = textColor;
      this.context.textAlign = 'center';
      this.context.font = 'bold 24px Inter, sans-serif ';
      this.context.fillText(text, x + (width / 2), y + (height / 2) + 8);
  }

  clear() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
  }

  clearRect(x: number, y: number, width: number, height: number) {
      this.context.clearRect(x, y, width, height);
  }

  update({
      x, y, text, textColor, width, height, color, borderColor, type,
  }: Update) {
      switch (type) {
          case Drawing.Cell:
              this.rect({
                  x, y, width, height, color, borderColor, text, textColor,
              } as Rect);
              break;
          case Drawing.Button:
              this.drawButton({
                  x, y, width, height, text, textColor, color, borderColor,
              } as Button);
              break;
          case Drawing.Clear:
              this.clear();
              break;
          default:
              break;
      }
  }
}
