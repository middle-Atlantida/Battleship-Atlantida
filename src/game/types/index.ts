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
};

type Text = {
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
  position: {
    x: number,
    y: number,
  },
  drawingCoordinate: {
    x: number,
    y: number,
  },
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
  startPosition: {
    x: number,
    y: number,
  },
  position: {
    x: number,
    y: number,
  },
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

type StartDraggedCoord = {
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
    Rect, Update, Cell, Ship, ScreenClass, StartDraggedCoord, Button, Element,
};
