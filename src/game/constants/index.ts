const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 1000;
const OPPONENT_SCREEN_START_FIELD_COORD_Y = 145;
const BATTLEFIELD_WIDTH = 445;
const BATTLEFIELD_HEIGHT = 445;
const PREPARATION_SCREEN_START_FIELD_COORD_X = CANVAS_WIDTH / 2 - BATTLEFIELD_WIDTH + 50;
const PREPARATION_SCREEN_START_FIELD_COORD_Y = 145;
const GAP_BITWIN_BATTLEFIELDS = 220;
// eslint-disable-next-line max-len
const PLAYER_SCREEN_START_FIELD_COORD_X = CANVAS_WIDTH / 2 - BATTLEFIELD_WIDTH - GAP_BITWIN_BATTLEFIELDS / 2;
const PLAYER_SCREEN_START_FIELD_COORD_Y = 145;
const OPPONENT_SCREEN_START_FIELD_COORD_X = CANVAS_WIDTH / 2 + GAP_BITWIN_BATTLEFIELDS / 2;
const BACKGROUND_COLOR_CELL = 'white';
const BORDER_COLOR_CELL = '#818181';
const BACKGROUND_COLOR_CELL_WITH_SHIP = '#58A8F1';
const BORDER_COLOR_CELL_WITH_SHIP = '#0D3089';
const BACKGROUND_COLOR_CELL_WITH_WRECKED_SHIP = '#F16858';
const BORDER_COLOR_CELL_WITH_WRECKED_SHIP = '#841818';
const BACKGROUND_COLOR_SHIP = '#B3B3B3';
const BORDER_COLOR_SHIP = '#818181';
const BACKGROUND_COLOR_BUTTON = '#7E83FF';
const BORDER_COLOR_BUTTON = '#222222';
const BACKGROUND_COLOR_BUTTON_DANGER = '#F16858';
const BORDER_COLOR_BUTTON_DANGER = '#222222';
const TEXT_COLOR_EMPTY_SHOT = '#B3B3B3';
const TEXT_CELL_WITH_WRECKED_SHIP = '×';
const TEXT_CELL_WITHOUT_SHIP = '∙';
const NAME_PLAYER_BATTLEFIELD = 'Мой флот';
const NAME_OPPONENT_BATTLEFIELD = 'Флот противника';

const RADIUS = 10;
const CELL_HEIGHT = 40;
const CELL_WIDTH = 40;
const CELL_GAP = 5;

const COLUMN_MARKERS = 'АБВГДЕЖЗИК';

const POSITION_SHIPS_MARKER = {
    ships: {
        1: { x: 395, y: 150 },
        2: { x: 350, y: 100 },
        3: { x: 0, y: 150 },
        4: { x: 0, y: 100 },
    },
    text: {
        1: { x: 450, y: 175 },
        2: { x: 450, y: 125 },
        3: { x: 150, y: 175 },
        4: { x: 200, y: 125 },
    },
};

const START_COORD_POSITION_SHIPS_MARKER_PLAYER = {
    x: 10, y: 560,
};

const START_COORD_POSITION_SHIPS_MARKER_OPPONENT = {
    x: CANVAS_WIDTH / 2 + GAP_BITWIN_BATTLEFIELDS / 2 - 30, y: 560,
};

const enum Drawing {
  Button,
  Cell,
  Clear,
  Marker,
  Ship,
  Text,
}

const shipDatas = [
    {
        id: 1,
        size: 4,
        direction: 'row',
        startPosition: {
            x: 565 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 290 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        position: {
            x: 565 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 290 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        cells: [],
        color: BACKGROUND_COLOR_SHIP,
        borderColor: BORDER_COLOR_SHIP,
        type: Drawing.Cell,
    },
    {
        id: 2,
        size: 3,
        direction: 'row',
        startPosition: {
            x: 515 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 235 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        position: {
            x: 515 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 235 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        cells: [],
        color: BACKGROUND_COLOR_SHIP,
        borderColor: BORDER_COLOR_SHIP,
        type: Drawing.Cell,
    },
    {
        id: 3,
        size: 3,
        direction: 'row',
        startPosition: {
            x: 665 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 235 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        position: {
            x: 665 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 235 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        cells: [],
        color: BACKGROUND_COLOR_SHIP,
        borderColor: BORDER_COLOR_SHIP,
        type: Drawing.Cell,
    },
    {
        id: 4,
        size: 2,
        direction: 'row',
        startPosition: {
            x: 505 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 180 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        position: {
            x: 505 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 180 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        cells: [],
        color: BACKGROUND_COLOR_SHIP,
        borderColor: BORDER_COLOR_SHIP,
        type: Drawing.Cell,
    },
    {
        id: 5,
        size: 2,
        direction: 'row',
        startPosition: {
            x: 611 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 180 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        position: {
            x: 611 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 180 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        cells: [],
        color: BACKGROUND_COLOR_SHIP,
        borderColor: BORDER_COLOR_SHIP,
        type: Drawing.Cell,
    },
    {
        id: 6,
        size: 2,
        direction: 'row',
        startPosition: {
            x: 722 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 180 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        position: {
            x: 722 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 180 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        cells: [],
        color: BACKGROUND_COLOR_SHIP,
        borderColor: BORDER_COLOR_SHIP,
        type: Drawing.Cell,
    },
    {
        id: 7,
        size: 1,
        direction: 'row',
        startPosition: {
            x: 545 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 125 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        position: {
            x: 545 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 125 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        cells: [],
        color: BACKGROUND_COLOR_SHIP,
        borderColor: BORDER_COLOR_SHIP,
        type: Drawing.Cell,
    },
    {
        id: 8,
        size: 1,
        direction: 'row',
        startPosition: {
            x: 605 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 125 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        position: {
            x: 605 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 125 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        cells: [],
        color: BACKGROUND_COLOR_SHIP,
        borderColor: BORDER_COLOR_SHIP,
        type: Drawing.Cell,
    },
    {
        id: 9,
        size: 1,
        direction: 'row',
        startPosition: {
            x: 665 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 125 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        position: {
            x: 665 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 125 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        cells: [],
        color: BACKGROUND_COLOR_SHIP,
        borderColor: BORDER_COLOR_SHIP,
        type: Drawing.Cell,
    },
    {
        id: 10,
        size: 1,
        direction: 'row',
        startPosition: {
            x: 725 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 125 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        position: {
            x: 725 + PREPARATION_SCREEN_START_FIELD_COORD_X,
            y: 125 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
        },
        cells: [],
        color: BACKGROUND_COLOR_SHIP,
        borderColor: BORDER_COLOR_SHIP,
        type: Drawing.Cell,
    },
];

export {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PREPARATION_SCREEN_START_FIELD_COORD_X,
    PREPARATION_SCREEN_START_FIELD_COORD_Y,
    PLAYER_SCREEN_START_FIELD_COORD_X,
    PLAYER_SCREEN_START_FIELD_COORD_Y,
    OPPONENT_SCREEN_START_FIELD_COORD_X,
    OPPONENT_SCREEN_START_FIELD_COORD_Y,
    BATTLEFIELD_WIDTH,
    BATTLEFIELD_HEIGHT,
    RADIUS,
    BACKGROUND_COLOR_CELL,
    BORDER_COLOR_CELL,
    BACKGROUND_COLOR_CELL_WITH_SHIP,
    BORDER_COLOR_CELL_WITH_SHIP,
    BACKGROUND_COLOR_CELL_WITH_WRECKED_SHIP,
    BORDER_COLOR_CELL_WITH_WRECKED_SHIP,
    BACKGROUND_COLOR_SHIP,
    BORDER_COLOR_SHIP,
    BACKGROUND_COLOR_BUTTON,
    BORDER_COLOR_BUTTON,
    BACKGROUND_COLOR_BUTTON_DANGER,
    BORDER_COLOR_BUTTON_DANGER,
    TEXT_COLOR_EMPTY_SHOT,
    TEXT_CELL_WITH_WRECKED_SHIP,
    TEXT_CELL_WITHOUT_SHIP,
    CELL_HEIGHT,
    CELL_WIDTH,
    CELL_GAP,
    COLUMN_MARKERS,
    POSITION_SHIPS_MARKER,
    shipDatas,
    START_COORD_POSITION_SHIPS_MARKER_PLAYER,
    START_COORD_POSITION_SHIPS_MARKER_OPPONENT,
    NAME_PLAYER_BATTLEFIELD,
    NAME_OPPONENT_BATTLEFIELD,
    Drawing,
};
