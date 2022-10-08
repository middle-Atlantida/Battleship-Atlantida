import { CanvasArgs } from 'game/types';

import { Game } from '..';
import { CanvasContainer } from '../renderer';

export class GameManager {
    private canvasContainer: CanvasContainer | null = null;

    private game: Game;

    private gameIsFininsh: (playerWinner: boolean, couterShots: number) => void;

    private checkScreenName: (screenName: string) => void;

    canvasArgs: CanvasArgs;

    constructor(
        canvas: HTMLCanvasElement,
        gameIsFininsh: (playerWinner: boolean, couterShots: number) => void,
        checkScreenName: (screenName: string) => void,
        canvasArgs: CanvasArgs,
    ) {
        this.canvasContainer = new CanvasContainer(canvas);
        this.gameIsFininsh = gameIsFininsh;
        this.checkScreenName = checkScreenName;
        this.canvasArgs = canvasArgs;

        // eslint-disable-next-line max-len
        this.game = new Game(
            this.canvasContainer as CanvasContainer,
            this.gameIsFininsh,
            this.checkScreenName,
            canvasArgs,
        );
    }

    run() {
        this.game.start();
    }

    updateScreen(canvasArgs: CanvasArgs) {
        this.game.updateCurrentScreen(canvasArgs);
    }

    restart() {
        // eslint-disable-next-line max-len
        this.game = new Game(
            this.canvasContainer as CanvasContainer,
            this.gameIsFininsh,
            this.checkScreenName,
            this.canvasArgs,
        );

        this.game.start();
    }
}
