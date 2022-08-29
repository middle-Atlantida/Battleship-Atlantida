import {
    Drawing,
    CELL_HEIGHT,
    CELL_WIDTH,
    CELL_GAP,
    BATTLEFIELD_WIDTH,
    BATTLEFIELD_HEIGHT,
    PREPARATION_SCREEN_START_FIELD_COORD_X,
    PREPARATION_SCREEN_START_FIELD_COORD_Y,
    BACKGROUND_COLOR_BUTTON,
    BACKGROUND_COLOR_SHIP,
    BORDER_COLOR_SHIP,
    BORDER_COLOR_BUTTON,
} from '../constants';

import CanvasContainer from '../renderer';

import { Battlefield } from '../battlefield';
import { Game } from '..';
import { Ship, StartDraggedCoord, Button } from '../types';

import { isOverElement } from '../utils';

export class PreparationScreen {
  player: Battlefield;

  private canvas: CanvasContainer;

  private draggedShip: null | Ship;

  private startDraggedCoord: StartDraggedCoord;

  private mouseCoord: StartDraggedCoord;

  private buttons: Record<string, Button | null>;

  private app: Game;

  private handlers: Record<string, Array<(event: Event) => void>>

  constructor(canvas: CanvasContainer, player: Battlefield, app: Game) {
      this.app = app;
      this.player = player;
      this.canvas = canvas;
      this.draggedShip = null;
      this.startDraggedCoord = {
          x: 0,
          y: 0,
      };
      this.mouseCoord = {
          x: 0,
          y: 0,
      };
      this.buttons = {
          startButton: null,
          randomButton: null,
      };
      this.handlers = {};
  }

  clearCanvas() {
      this.canvas.clear();
  }

  renderBattlefield() {
      this.player.battlefield.forEach(row => {
          row.forEach(cell => {
              this.canvas.update({
                  x: cell.drawingCoordinate.x,
                  y: cell.drawingCoordinate.y,
                  width: cell.width,
                  height: cell.height,
                  color: cell.color,
                  borderColor: cell.borderColor,
                  type: cell.type,
                  text: cell?.markerText || '',
                  textColor: 'black',
              });
          });
      });
  }

  renderShips() {
      this.player.ships.forEach(ship => {
          this.canvas.update({
              x: ship.position.x,
              y: ship.position.y,
              width: this.getWidthShip(ship),
              height: this.getHeightShip(ship),
              color: ship.color,
              borderColor: ship.borderColor,
              type: ship.type,
          });
      });
  }

  renderTextShips() {
      this.canvas.update({
          x: 860,
          y: 140,
          width: 0,
          height: 0,
          color: 'white',
          type: Drawing.Button,
          text: 'Корабли',
          textColor: 'black',
      });
  }

  getWidthShip = (ship: Ship) => (ship.direction === 'row'
      ? ship.size * CELL_WIDTH + (ship.size - 1) * CELL_GAP
      : CELL_WIDTH);

  getHeightShip = (ship: Ship) => (ship.direction === 'row'
      ? CELL_HEIGHT
      : ship.size * CELL_HEIGHT + (ship.size - 1) * CELL_GAP)

  removeDraggedShip() {
      if (this.draggedShip) {
          this.draggedShip = null;
      }
      this.startDraggedCoord = {
          x: 0,
          y: 0,
      };
  }

  takeShip = (event: Event) => {
      if (event.type !== 'mousedown') {
          return;
      }
      const { offsetX, offsetY } = event as MouseEvent;
      this.startDraggedCoord = {
          x: offsetX,
          y: offsetY,
      };

      const ship = this.player.ships.find(shipItem => isOverElement(
          {
              x: offsetX, y: offsetY, width: 0, height: 0,
          },
          {
              // eslint-disable-next-line max-len
              x: shipItem.position.x, y: shipItem.position.y, width: this.getWidthShip(shipItem), height: this.getHeightShip(shipItem),
          },
      ));

      if (ship) {
          this.draggedShip = ship;
      }
  }

  rotateShip = (event: Event) => {
      if (event.type !== 'keydown') {
          return;
      }

      const { code } = event as KeyboardEvent;

      if (code !== 'Space') {
          return;
      }

      if (!this.draggedShip) {
          return;
      }

      const newShipCoord = {
          x: this.mouseCoord.x + (this.draggedShip.position.y - this.mouseCoord.y),
          y: this.mouseCoord.y + (this.draggedShip.position.x - this.mouseCoord.x),
      };

      this.draggedShip.position = newShipCoord;

      this.draggedShip.direction = this.draggedShip.direction === 'column' ? 'row' : 'column';

      this.update();
  }

  moveShip = (event: Event) => {
      if (event.type !== 'mousemove') {
          return;
      }

      if (!this.draggedShip) {
          return;
      }

      this.draggedShip.color = BACKGROUND_COLOR_SHIP;
      this.draggedShip.borderColor = BORDER_COLOR_SHIP;

      if (this.draggedShip.cells?.[0]) {
          this.player.removeShipFromButtelfield(this.draggedShip);
      }
      const { offsetX, offsetY } = event as MouseEvent;
      this.mouseCoord.x = offsetX;
      this.mouseCoord.y = offsetY;

      const newPosition = {
          x: this.draggedShip.position.x - (this.startDraggedCoord.x - offsetX),
          y: this.draggedShip.position.y - (this.startDraggedCoord.y - offsetY),
      };

      this.startDraggedCoord = {
          x: offsetX,
          y: offsetY,
      };
      this.clearCanvas();
      this.update();

      this.draggedShip.position = newPosition;
  }

  dropShip = () => {
      if (!this.draggedShip) {
          return;
      }

      if (isOverElement(
          {
              x: this.draggedShip.position.x,
              y: this.draggedShip.position.y,
              width: this.getWidthShip(this.draggedShip),
              height: this.getHeightShip(this.draggedShip),
          },
          {
              x: PREPARATION_SCREEN_START_FIELD_COORD_X - 20,
              y: PREPARATION_SCREEN_START_FIELD_COORD_Y - 20,
              width: PREPARATION_SCREEN_START_FIELD_COORD_X + BATTLEFIELD_WIDTH + 20,
              height: PREPARATION_SCREEN_START_FIELD_COORD_Y + BATTLEFIELD_HEIGHT + 20,
          },
      )) {
          const shipStartingCell = this.player.getShipStartingCell(this.draggedShip);

          if (!shipStartingCell
              || !this.player.checkFreeCellsUnderShip(this.draggedShip, shipStartingCell)) {
              this.player.moveShipToStartPositon(this.draggedShip);
              this.removeDraggedShip();
              this.update();
              return;
          }

          this.player.addShip(this.draggedShip, shipStartingCell);

          this.update();
      } else {
          this.player.moveShipToStartPositon(this.draggedShip);
      }
      this.removeDraggedShip();
      this.update();
  }

  onClickButton = (event: Event) => {
      if (event.type !== 'click') {
          return;
      }
      const { offsetX, offsetY } = event as MouseEvent;

      const activeButton = Object.values(this.buttons).find(button => {
          if (!button) {
              return false;
          }

          return isOverElement(
              {
                  x: offsetX, y: offsetY, width: 0, height: 0,
              },
              {
                  // eslint-disable-next-line max-len
                  x: button.x, y: button.y, width: button.x + button.width, height: button.y + button.height,
              },
          );
      });

      if (!activeButton) {
          return;
      }

      activeButton.handler();
  }

  generateStartScreen() {
      this.createStartButton();
      this.createRandomButton();
      this.addEvent('mousedown', this.takeShip);
      this.addEvent('mousemove', this.moveShip);
      this.addEvent('mouseup', this.dropShip);
      this.addEvent('click', this.onClickButton);
      this.addEvent('keydown', this.rotateShip);
      this.update();
  }

  addEvent(eventName: string, callback: (event: Event) => void) {
      if (!this.handlers[eventName]) {
          this.handlers[eventName] = [callback];
      } else {
          const duplicate = this.handlers[eventName]?.find(item => item === callback);

          if (!duplicate) {
              this.handlers[eventName]?.push(callback);
          }
      }

      document.addEventListener(eventName, callback);
  }

  removeEvent(eventName: string, callback: (event: Event) => void) {
      if (!this.handlers[eventName]) {
          return;
      }

      // eslint-disable-next-line max-len
      this.handlers[eventName] = this.handlers[eventName]?.filter(event => event === callback) || [];

      document.removeEventListener(eventName, callback);
  }

  removeAllEvents() {
      Object.entries(this.handlers).forEach(([eventName, callbacks]) => {
          callbacks.forEach(callback => this.removeEvent(eventName, callback));
      });
  }

  createStartButton() {
      this.buttons.startButton = {
          text: 'В бой',
          width: 135,
          height: 50,
          x: this.canvas.element.width / 2 + 10,
          y: PREPARATION_SCREEN_START_FIELD_COORD_Y + BATTLEFIELD_HEIGHT + 50,
          color: BACKGROUND_COLOR_BUTTON,
          borderColor: BORDER_COLOR_BUTTON,
          textColor: 'white',
          type: Drawing.Button,
          handler: this.stop,
      };
  }

  createRandomButton() {
      this.buttons.randomButton = {
          text: 'Random',
          width: 135,
          height: 50,
          x: this.canvas.element.width / 2 - 145,
          y: PREPARATION_SCREEN_START_FIELD_COORD_Y + BATTLEFIELD_HEIGHT + 50,
          color: BACKGROUND_COLOR_BUTTON,
          borderColor: BORDER_COLOR_BUTTON,
          textColor: 'white',
          type: Drawing.Button,
          handler: this.randomize,
      };
  }

  renderButtons() {
      Object.values(this.buttons).forEach(button => {
          if (!button) {
              return;
          }

          this.canvas.update({
              x: button.x,
              y: button.y,
              width: button.width,
              height: button.height,
              text: button.text,
              textColor: button.textColor,
              color: button.color,
              borderColor: button.borderColor,
              type: button.type,
          });
      });
  }

  randomize = () => {
      this.player.randomize();
      this.update();
  }

  start() {
      this.generateStartScreen();
  }

  stop = () => {
      this.removeAllEvents();
      this.app.update('buttle');
  }

  update() {
      requestAnimationFrame(() => {
          this.clearCanvas();
          this.renderBattlefield();
          this.renderShips();
          this.renderButtons();
          this.renderTextShips();
      });
  }
}
