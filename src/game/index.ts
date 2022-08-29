import { Battlefield } from './battlefield';
import CanvasContainer from './renderer';
import { PreparationScreen } from './screens/PreparationScreen';
import { ButtleScreen } from './screens/BattleScreen';
import { ScreenClass } from './types';

export class Game {
  private activeScreen: 'preparation' | 'buttle';

  private canvas: CanvasContainer;

  private screens: Record<('preparation' | 'buttle'), ScreenClass>

  private gameIsFininsh: (playerWinner: boolean) => void;

  player: Battlefield;

  opponent: Battlefield;

  constructor(canvas: CanvasContainer, gameIsFininsh: (playerWinner: boolean) => void) {
      this.canvas = canvas;
      this.player = new Battlefield();
      this.opponent = new Battlefield(true);
      this.screens = {
          preparation: new PreparationScreen(this.canvas as CanvasContainer, this.player, this),
          // eslint-disable-next-line max-len
          buttle: new ButtleScreen(this.canvas as CanvasContainer, this.player, this.opponent, this),
      };
      this.activeScreen = 'preparation';
      this.gameIsFininsh = gameIsFininsh;
  }

  start() {
      this.screens[this.activeScreen].start();
  }

  update(screenName: 'buttle') {
      this.activeScreen = screenName;
      this.start();
  }

  stop(playerWin: boolean) {
      this.gameIsFininsh(playerWin);
      console.log(playerWin ? 'Я выиграл' : 'Я проиграл');
  }
}
