import { Drawing } from '../constants';

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string | undefined;
  borderColor?: string| undefined;
  text?: string;
  textColor?: string;
  radius?: number;
};

type Text = {
  x?: number;
  y?: number;
  fontSize?: number;
  text: string;
  textColor: string;
};

type Update = Partial<Rect> & Partial<Text> & {
  type: Drawing;
};

type Cell = {
  isMarker: boolean,
  markerText?: string,
  markerColor?: string,
  position: Coord,
  drawingCoordinate: Coord,
  row: number,
  column: number,
  width: number,
  height: number,
  color?: string,
  borderColor?: string,
  type: Drawing.Cell,
  hasShip: boolean,
  hasShot: boolean,
  free: boolean,
}

type Ship = {
  id: number,
  size: number,
  direction: string,
  startPosition: Coord,
  position: Coord,
  cells: Cell[]
  color?: string | undefined,
  borderColor?: string | undefined,
  type: Drawing.Cell,
  killed?: boolean,
}

type ScreenClass = {
  start: () => void,
  stop: () => void,
  update: () => void,
}

type Coord = {
  x: number,
  y: number,
}

type Button = {
  text: string,
  width: number,
  height: number,
  x: number,
  y: number,
  color: string,
  borderColor: string,
  textColor: string,
  type: Drawing.Button,
  handler: () => void,
}

type Element= {
  x: number;
  y: number;
  width: number;
  height: number;
}

export {
    Rect, Text, Update, Cell, Ship, ScreenClass, Coord, Button, Element,
};
