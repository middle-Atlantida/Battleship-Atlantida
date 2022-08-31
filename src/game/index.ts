import { Battlefield } from './battlefield';
import CanvasContainer from './renderer';
import { PreparationScreen } from './screens/PreparationScreen';
import { ButtleScreen } from './screens/BattleScreen';
import { ScreenClass } from './types';

export class Game {
  private activeScreen: 'preparation' | 'buttle';

  private canvas: CanvasContainer;

  private screens: Record<('preparation' | 'buttle'), ScreenClass>

  private gameIsFininsh: (playerWinner: boolean, couterShots: number) => void;

  private checkScreenName: (screenName: string) => void

  player: Battlefield;

  opponent: Battlefield;

  constructor(
      canvas: CanvasContainer,
      gameIsFininsh: (playerWinner: boolean, couterShots: number) => void,
      checkScreenName: (screenName: string) => void,
  ) {
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
      this.checkScreenName = checkScreenName;
  }

  start() {
      this.checkScreenName(this.activeScreen);
      this.screens[this.activeScreen].start();
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
