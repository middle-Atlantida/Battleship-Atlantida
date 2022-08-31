/* eslint-disable no-param-reassign */
import {
    CELL_HEIGHT,
    CELL_WIDTH,
    // CELL_GAP,
    BATTLEFIELD_WIDTH,
    BATTLEFIELD_HEIGHT,
    PLAYER_SCREEN_START_FIELD_COORD_X,
    PLAYER_SCREEN_START_FIELD_COORD_Y,
    OPPONENT_SCREEN_START_FIELD_COORD_X,
    OPPONENT_SCREEN_START_FIELD_COORD_Y,
    BACKGROUND_COLOR_BUTTON_DANGER,
    BORDER_COLOR_BUTTON_DANGER,
    Drawing,
} from '../constants';

import { getRandomBetween, isOverElement } from '../utils';
import CanvasContainer from '../renderer';
import { Battlefield } from '../battlefield';
import { Game } from '..';
import { Button, Cell } from '../types';

export class ButtleScreen {
  player: Battlefield;

  opponent: Battlefield;

  private canvas: CanvasContainer;

  private playerTurn: boolean;

  private buttons: Record<string, Button | null>;

  private app: Game;

  private handlers: Record<string, Array<(event: Event) => void>>

  constructor(canvas: CanvasContainer, player: Battlefield, opponent: Battlefield, app: Game) {
      this.app = app;
      this.player = player;
      this.opponent = opponent;
      this.canvas = canvas;
      this.buttons = {
          surrenderButton: null,
      };
      this.playerTurn = true;
      this.handlers = {};
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

      this.handlers[eventName] = this.handlers[eventName]?.filter(evt => evt === callback) || [];

      document.removeEventListener(eventName, callback);
  }

  removeAllEvents() {
      Object.entries(this.handlers).forEach(([eventName, callbacks]) => {
          callbacks.forEach(callback => this.removeEvent(eventName, callback));
      });
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

  clearCanvas() {
      this.canvas.clear();
  }

  renderBattlefields() {
      this.renderBattlefield(this.player.battlefield);
      this.renderBattlefield(this.opponent.battlefield);
  }

  renderBattlefield(battlefield: Cell[][]) {
      battlefield.forEach(row => {
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
                  textColor: cell?.markerColor || 'black',
              });
          });
      });
  }

  // renderShipsCounter(player: Battlefield) {
  //   player.shipCounter.forEach(({counter, ship}) => {
  //     this.canvas.update({
  //       x: ship.position.x,
  //       y: ship.position.y,
  //       width: ship.size * CELL_WIDTH + (ship.size - 1) * CELL_GAP,
  //       height: CELL_HEIGHT,
  //       color: ship.color,
  //       borderColor: ship.borderColor,
  //       type: ship.type,
  //     });
  //   })
  // }

  isPlayerTurn = (event: Event) => {
      if (!this.playerTurn) {
          return;
      }

      const { offsetX, offsetY } = event as MouseEvent;

      if (offsetX < OPPONENT_SCREEN_START_FIELD_COORD_X
      || offsetX > OPPONENT_SCREEN_START_FIELD_COORD_X + BATTLEFIELD_WIDTH
      || offsetY < OPPONENT_SCREEN_START_FIELD_COORD_Y
      || offsetY > OPPONENT_SCREEN_START_FIELD_COORD_Y + BATTLEFIELD_HEIGHT) {
          return;
      }

      const cellWithShot = this.opponent.battlefield.flat().find(cell => isOverElement(
          {
              x: offsetX, y: offsetY, width: 0, height: 0,
          },
          {
              // eslint-disable-next-line max-len
              x: cell.drawingCoordinate.x, y: cell.drawingCoordinate.y, width: CELL_WIDTH, height: CELL_HEIGHT,
          },
      ));

      if (cellWithShot === undefined || cellWithShot?.hasShot) {
          return;
      }

      this.addShot(cellWithShot);

      if (this[this.playerTurn ? 'opponent' : 'player'].allShipsWasKilled()) {
          this.stop();
          return;
      }
      this.playerTurn = !this.playerTurn;
      this.isComputerTurn();
  }

  countPlayerShots() {
      return this.opponent.battlefield.flat().filter(item => item.hasShot).length;
  }

  isComputerTurn() {
      const x = getRandomBetween(0, 9);
      const y = getRandomBetween(0, 9);

      const cellWithShot = this.player.battlefield[y]?.[x];

      if (!cellWithShot) {
          return;
      }

      this.addShot(cellWithShot);
      this.playerTurn = !this.playerTurn;
  }

  addShot(cell: Cell) {
      this[this.playerTurn ? 'opponent' : 'player'].addShot(cell);
      this.update();
  }

  updateCoordPlayerField() {
      this.player.battlefield.forEach(row => row.forEach(cell => {
          cell.drawingCoordinate.x = cell.position.x + PLAYER_SCREEN_START_FIELD_COORD_X;
          cell.drawingCoordinate.y = cell.position.y + PLAYER_SCREEN_START_FIELD_COORD_Y;
      }));
  }

  updateCoordOpponentField() {
      this.opponent.battlefield.forEach(row => row.forEach(cell => {
          cell.drawingCoordinate.x = cell.position.x + OPPONENT_SCREEN_START_FIELD_COORD_X;
          cell.drawingCoordinate.y = cell.position.y + OPPONENT_SCREEN_START_FIELD_COORD_Y;
      }));
  }

  // updateCoordShipsCounter() {

  // }

  createSurrenderButton() {
      this.buttons.surrenderButton = {
          text: 'Сдаться',
          width: 135,
          height: 50,
          x: this.canvas.element.width / 2 - 135 / 2,
          y: PLAYER_SCREEN_START_FIELD_COORD_Y + BATTLEFIELD_HEIGHT + 50,
          color: BACKGROUND_COLOR_BUTTON_DANGER,
          borderColor: BORDER_COLOR_BUTTON_DANGER,
          textColor: 'white',
          type: Drawing.Button,
          handler: this.onSurrender,
      };
  }

  onSurrender = () => {
      this.playerTurn = false;
      this.stop();
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

  start() {
      this.updateCoordOpponentField();
      this.updateCoordPlayerField();

      this.createSurrenderButton();

      this.update();
      this.addEvent('click', this.isPlayerTurn);
      this.addEvent('click', this.onClickButton);
      this.stop(); // TODO
  }

  stop() {
      const counterShots = this.playerTurn ? this.countPlayerShots() : 0;
      console.log('Game is finish');
      this.app.stop(this.playerTurn, counterShots);
  }

  update() {
      this.clearCanvas();
      this.renderBattlefields();
      this.renderButtons();
  }
}
