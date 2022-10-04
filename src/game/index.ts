import { Battlefield } from './battlefield';
import { CanvasContainer } from './renderer';
import { ButtleScreen } from './screens/BattleScreen';
import { PreparationScreen } from './screens/PreparationScreen';
import { CanvasArgs, ScreenClass } from './types';

export class Game {
    private activeScreen: 'preparation' | 'buttle';

    private canvas: CanvasContainer;

    private screens: Record<'preparation' | 'buttle', ScreenClass>;

    private gameIsFininsh: (playerWinner: boolean, couterShots: number) => void;

    private checkScreenName: (screenName: string) => void;

    player: Battlefield;

    opponent: Battlefield;

    canvasArgs: CanvasArgs;

    constructor(
        canvas: CanvasContainer,
        gameIsFininsh: (playerWinner: boolean, couterShots: number) => void,
        checkScreenName: (screenName: string) => void,
        canvasArgs: CanvasArgs,
    ) {
        console.log('Game constructor');
        this.canvas = canvas;
        this.player = new Battlefield({ isComputer: false });
        this.opponent = new Battlefield({ isComputer: true });
        this.canvasArgs = canvasArgs;
        this.screens = {
            preparation: new PreparationScreen(
                this.canvas as CanvasContainer,
                this.player,
                this.canvasArgs,
                this,
            ),
            // eslint-disable-next-line max-len
            buttle: new ButtleScreen(
                this.canvas as CanvasContainer,
                this.player,
                this.opponent,
                this.canvasArgs,
                this,
            ),
        };
        this.activeScreen = 'preparation';
        this.gameIsFininsh = gameIsFininsh;
        this.checkScreenName = checkScreenName;
    }

    start() {
        this.checkScreenName(this.activeScreen);
        this.screens[this.activeScreen].start();
    }

    updateCurrentScreen(canvasArgs: CanvasArgs) {
        Object.values(this.screens).forEach(screen => {
            // eslint-disable-next-line no-param-reassign
            screen.canvasArgs = canvasArgs;
        });
        this.screens[this.activeScreen].update();
    }

    update(screenName: 'buttle') {
        this.activeScreen = screenName;
        this.start();
    }

    stop(playerWin: boolean, couterShots: number) {
        this.gameIsFininsh(playerWin, couterShots);
        console.log(playerWin ? 'Я выиграл' : 'Я проиграл');
    }
}
