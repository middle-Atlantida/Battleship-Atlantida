/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import {
    PREPARATION_SCREEN_START_FIELD_COORD_X,
    PREPARATION_SCREEN_START_FIELD_COORD_Y,
    COLUMN_MARKERS,
    BACKGROUND_COLOR_CELL,
    BORDER_COLOR_CELL,
    BACKGROUND_COLOR_CELL_WITH_SHIP,
    BORDER_COLOR_CELL_WITH_SHIP,
    BACKGROUND_COLOR_CELL_WITH_WRECKED_SHIP,
    BORDER_COLOR_CELL_WITH_WRECKED_SHIP,
    BACKGROUND_COLOR_SHIP,
    BORDER_COLOR_SHIP,
    TEXT_COLOR_EMPTY_SHOT,
    TEXT_CELL_WITH_WRECKED_SHIP,
    TEXT_CELL_WITHOUT_SHIP,
    Drawing,
    shipDatas,
} from '../constants';
import { Ship, Cell } from '../types';
import { getRandomFrom, getRandomBetween } from '../utils';

export class Battlefield {
  battlefield: Cell[][];

  ships: Ship[];

  isComputer: boolean;

  shipCounter: Array<{counter: number, ship: Ship}>

  constructor(isComputer = false) {
      this.isComputer = isComputer;
      this.ships = JSON.parse(JSON.stringify(shipDatas));
      this.battlefield = this.getNewField();
      this.shipCounter = this.getShipCounter();
  }

  getMarkers = (battlefield: Cell[][]) => {
      const columnMarkers: Cell[] = [];
      for (let i = 0; i < 10; i++) {
          // const dx: number = numberColumn + Number(!numberColumn) * -1;
          // const dy: number = numberRow + Number(!numberRow) * -1;
          columnMarkers.push(
              {
                  isMarker: true,
                  markerText: COLUMN_MARKERS[i] as string,
                  position: {
                      x: i * 45,
                      y: -1 * 45,
                  },
                  drawingCoordinate: {
                      x: PREPARATION_SCREEN_START_FIELD_COORD_X + i * 45,
                      y: PREPARATION_SCREEN_START_FIELD_COORD_Y + -1 * 45,
                  },
                  row: -1,
                  column: i,
                  width: 40,
                  height: 40,
                  type: Drawing.Cell,
                  hasShip: false,
                  hasShot: false,
                  free: true,
              },
          );

          battlefield[i]?.push(
              {
                  isMarker: true,
                  markerText: (i + 1).toString(),
                  position: {
                      x: -1 * 45,
                      y: i * 45,
                  },
                  drawingCoordinate: {
                      x: PREPARATION_SCREEN_START_FIELD_COORD_X + -1 * 45,
                      y: PREPARATION_SCREEN_START_FIELD_COORD_Y + i * 45,
                  },
                  row: -1,
                  column: i,
                  width: 40,
                  height: 40,
                  type: Drawing.Cell,
                  hasShip: false,
                  hasShot: false,
                  free: true,
              },
          );
      }

      battlefield.push(columnMarkers);
  }

  getNewField = (force?: boolean) => {
      const battlefield: Cell[][] = [];
      for (let i = 0; i < 10; i++) {
          const row: Cell[] = [];
          for (let k = 0; k < 10; k++) {
              row.push(this.getCell(i, k) as Cell);
          }
          battlefield.push(row);
      }

      this.getMarkers(battlefield);

      if (this.isComputer && !force) {
          setTimeout(this.randomize, 0);
      }
      return battlefield;
  }

  getCell = (row: number, column: number): Cell => ({
      isMarker: false,
      position: {
          x: column * 45,
          y: row * 45,
      },
      drawingCoordinate: {
          x: PREPARATION_SCREEN_START_FIELD_COORD_X + column * 45,
          y: PREPARATION_SCREEN_START_FIELD_COORD_Y + row * 45,
      },
      row,
      column,
      width: 40,
      height: 40,
      color: BACKGROUND_COLOR_CELL,
      borderColor: BORDER_COLOR_CELL,
      type: Drawing.Cell,
      hasShip: false,
      hasShot: false,
      free: true,
  })

  getShipCounter() {
      const result = [];
      for (let i = 4; i > 0; i--) {
          const shipsSelectedSize = this.ships.filter(ship => ship.size === i && !ship.killed);
          result.push({
              counter: shipsSelectedSize.length,
              ship: shipsSelectedSize.length
                  ? shipsSelectedSize?.[0] as Ship
                  : JSON.parse(JSON.stringify(this.ships.find(item => item.size === i))) as Ship,
          });
      }

      return result;
  }

  // getMarker(numberRow = 0, numberColumn = 0) {
  //   const dx: number = numberColumn + Number(!numberColumn) * -1;
  //   const dy: number = numberRow + Number(!numberRow) * -1;
  //   return {
  //     position: {
  //       x: dx * 45,
  //       y: dy * 45,
  //     },
  //     drawingCoordinate: {
  //       x: PREPARATION_SCREEN_START_FIELD_COORD_X + dx * 45,
  //       y: PREPARATION_SCREEN_START_FIELD_COORD_Y + dy * 45,
  //     },
  //     row: dy,
  //     column: dx,
  //     width: 40,
  //     height: 40,
  //     mode: RectMode.Round,
  //     color: 'red',
  //     type: Drawing.Cell,
  //     hasShip: false,
  //   }
  // }

  getShipStartingCell(ship: Ship) {
      return this.battlefield.flat().find(cell => ship
          && ship.position.x - cell.drawingCoordinate.x < 23
          && ship.position.x - cell.drawingCoordinate.x >= -23
          && ship.position.y - cell.drawingCoordinate.y < 23
          && ship.position.y - cell.drawingCoordinate.y >= -23);
  }

  moveShipToStartPositon = (ship: Ship) => {
      ship.direction = 'row';
      ship.color = BACKGROUND_COLOR_SHIP;
      ship.borderColor = BORDER_COLOR_SHIP;
      ship.position.x = ship.startPosition.x;
      ship.position.y = ship.startPosition.y;
  }

  removeShipFromButtelfield(ship: Ship) {
      const shipStartingCell = this.getShipStartingCell(ship);
      ship.cells = [];

      if (!shipStartingCell) {
          return;
      }
      this.updateCellsUnderShip(ship, shipStartingCell, false);
      this.updateCellsAroundShip(ship, shipStartingCell, true);
      this.updateCellsAroundAllShips();
  }

  updateCellsAroundAllShips() {
      this.ships.forEach(ship => {
          if (!ship.cells?.[0]) {
              return;
          }
          this.updateCellsAroundShip(ship, ship.cells[0]);
      });
  }

  removeAllShips() {
      this.battlefield.forEach(row => row.forEach(cell => {
          cell.free = true;
          cell.hasShip = false;
          if (!cell.isMarker) {
              cell.color = BACKGROUND_COLOR_CELL;
              cell.borderColor = BORDER_COLOR_CELL;
          }
      }));
      this.ships.forEach(ship => {
          ship.position.x = ship.startPosition.x;
          ship.position.y = ship.startPosition.y;
          ship.direction = 'row';
          ship.cells = [];
      });
  }

  checkFreeCellsUnderShip(ship: Ship, startCell: Cell) {
      let result = true;

      for (let i = 0; i < ship.size; i++) {
          const cellRow = startCell.row + Number(ship.direction === 'column') * i;
          const cellColumn = startCell.column + Number(ship.direction === 'row') * i;

          const cellWithShip = this.battlefield[cellRow]?.[cellColumn];

          if (cellWithShip?.free !== true) {
              result = false;
          }
      }
      return result;
  }

  updateCellsUnderShip(ship: Ship, startCell: Cell, flag = true) {
      for (let i = 0; i < ship.size; i++) {
          const cellRow = startCell.row + Number(ship.direction === 'column') * i;
          const cellColumn = startCell.column + Number(ship.direction === 'row') * i;

          const cellWithShip = this.battlefield[cellRow]?.[cellColumn];

          if (!cellWithShip) {
              return;
          }

          cellWithShip.hasShip = flag;
          // eslint-disable-next-line max-len
          cellWithShip.color = flag && !this.isComputer ? BACKGROUND_COLOR_CELL_WITH_SHIP : BACKGROUND_COLOR_CELL;
          // eslint-disable-next-line max-len
          cellWithShip.borderColor = flag && !this.isComputer ? BORDER_COLOR_CELL_WITH_SHIP : BORDER_COLOR_CELL;

          if (flag) {
              ship.cells.push(cellWithShip);
          }
      }
  }

  updateCellsAroundShip(ship: Ship, startCell: Cell, flag = false) {
      const numberOfRows = ship.direction === 'column' ? ship.size + 2 : 3;
      const numberOfColumns = ship.direction === 'row' ? ship.size + 2 : 3;

      for (let i = startCell.row - 1; i < startCell.row - 1 + numberOfRows; i++) {
          for (let k = startCell.column - 1; k < startCell.column - 1 + numberOfColumns; k++) {
              if (i < 0 || i > 9 || k < 0 || k > 9) {
                  // eslint-disable-next-line no-continue
                  continue;
              }

              const cell = this.battlefield[i]?.[k];

              if (!cell) {
                  // eslint-disable-next-line no-continue
                  continue;
              }

              cell.free = flag;
          }
      }
  }

  addShip(ship: Ship, shipStartingCell: Cell) {
      this.updateCellsUnderShip(ship, shipStartingCell);
      this.updateCellsAroundShip(ship, shipStartingCell);

      ship.position.x = shipStartingCell.drawingCoordinate.x;
      ship.position.y = shipStartingCell.drawingCoordinate.y;
      ship.color = undefined;
      ship.borderColor = BORDER_COLOR_CELL_WITH_SHIP;
  }

  randomize = () => {
      this.removeAllShips();
      this.ships.forEach(ship => {
          ship.direction = getRandomFrom('row', 'column') as string;

          while (!ship.cells?.[0]) {
              const dx = ship.direction === 'column' ? 0 : ship.size - 1;
              const dy = ship.direction === 'row' ? 0 : ship.size - 1;
              const row = getRandomBetween(0, 9 - dy);
              const column = getRandomBetween(0, 9 - dx);

              const startCell = this.battlefield[row]?.[column];
              if (startCell && this.checkFreeCellsUnderShip(ship, startCell)) {
                  this.addShip(ship, startCell);
              }
          }
      });
  }

  addShot(cell: Cell) {
      if (cell.hasShot) {
          return;
      }

      cell.hasShot = true;

      if (cell.hasShip) {
          this.ships.forEach(ship => {
              // eslint-disable-next-line max-len
              ship.cells = ship.cells.filter(shipCell => !(shipCell.row === cell.row && shipCell.column === cell.column));
              if (!ship.cells.length) {
                  ship.killed = true;
                  this.shipCounter = this.getShipCounter();
              }
          });

          cell.color = BACKGROUND_COLOR_CELL_WITH_WRECKED_SHIP;
          cell.borderColor = BORDER_COLOR_CELL_WITH_WRECKED_SHIP;
          cell.markerText = TEXT_CELL_WITH_WRECKED_SHIP;
      } else {
          cell.markerColor = TEXT_COLOR_EMPTY_SHOT;
          cell.markerText = TEXT_CELL_WITHOUT_SHIP;
      }
  }

  allShipsWasKilled() {
      return !this.ships.filter(ship => !ship?.killed).length;
  }
}
