import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    RADIUS,
    Drawing,
} from '../constants';
import {
    Rect, Button, Update, Text,
} from '../types';

export class CanvasContainer {
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
      x, y, width, height, color, borderColor, text, textColor, radius,
  }: Rect) {
      const usedRadius = radius ?? RADIUS;
      this.context.beginPath();
      this.context.moveTo(x, y + height - usedRadius);
      this.context.arcTo(x, y, x + usedRadius, y, usedRadius);
      this.context.lineTo(x + width - usedRadius, y);
      this.context.arcTo(x + width, y, x + width, y + usedRadius, usedRadius);
      this.context.lineTo(x + width, y + height - usedRadius);
      this.context.arcTo(x + width, y + height, x + usedRadius, y + height, usedRadius);
      this.context.lineTo(x + usedRadius, y + height);
      this.context.arcTo(x, y + height, x, y, usedRadius);
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
          this.context.font = `400 ${borderColor ? 34 : 14}px Inter, sans-serif`;
          this.context.fillText(text, x + (width / 2), y + (height / 2) + 9);
      }
  }

  drawButton({
      x, y, width, height, text, color, borderColor, textColor = 'white',
  }: Button) {
      this.rect({
          x, y, width, height, color, borderColor, radius: 25,
      });

      this.context.fillStyle = textColor;
      this.context.textAlign = 'center';
      this.context.font = '600 16px Inter, sans-serif';
      this.context.fillText(text.toUpperCase(), x + (width / 2), y + (height / 2) + 7);
  }

  drawText({
      x = 0, y = 0, text, textColor = '#222222', fontSize = 14,
  }: Text) {
      this.context.fillStyle = textColor;
      this.context.textAlign = 'start';
      this.context.font = `600 ${fontSize}px Inter, sans-serif`;
      this.context.fillText(text, x, y);
  }

  clear() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
  }

  clearRect(x: number, y: number, width: number, height: number) {
      this.context.clearRect(x, y, width, height);
  }

  update({
      x, y, text, textColor, width, height, color, borderColor, type, fontSize,
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
          case Drawing.Text:
              this.drawText({
                  x, y, text, textColor, fontSize,
              } as Text);
              break;
          case Drawing.Clear:
              this.clear();
              break;
          default:
              break;
      }
  }
}
