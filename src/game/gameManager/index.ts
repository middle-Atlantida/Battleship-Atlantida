import { Game } from '..';
import CanvasContainer from '../renderer';

export class GameManager {
  private canvasContainer: CanvasContainer | null = null;

  private game: Game;

  private gameIsFininsh: (playerWinner: boolean, couterShots: number) => void;

  private checkScreenName: (screenName: string) => void

  constructor(
      canvas: HTMLCanvasElement,
      gameIsFininsh: (playerWinner: boolean, couterShots: number) => void,
      checkScreenName: (screenName: string) => void,
  ) {
      this.canvasContainer = new CanvasContainer(canvas);
      this.gameIsFininsh = gameIsFininsh;
      this.checkScreenName = checkScreenName;

      // eslint-disable-next-line max-len
      this.game = new Game(this.canvasContainer as CanvasContainer, this.gameIsFininsh, this.checkScreenName);
  }

  run() {
      this.game.start();
  }

  restart() {
      // eslint-disable-next-line max-len
      this.game = new Game(this.canvasContainer as CanvasContainer, this.gameIsFininsh, this.checkScreenName);

      this.game.start();
  }
}
