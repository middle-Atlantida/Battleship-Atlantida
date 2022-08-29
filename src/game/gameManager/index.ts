import { Game } from '..';
import CanvasContainer from '../renderer';

export default class GameManager {
  private canvasContainer: CanvasContainer | null = null;

  private game: Game;

  private gameIsFininsh: (playerWinner: boolean) => void;

  constructor(canvas: HTMLCanvasElement, gameIsFininsh: (playerWinner: boolean) => void) {
      this.canvasContainer = new CanvasContainer(canvas);
      this.gameIsFininsh = gameIsFininsh;

      this.game = new Game(this.canvasContainer as CanvasContainer, this.gameIsFininsh);
  }

  run() {
      this.game.start();
  }

  restart() {
      this.game = new Game(this.canvasContainer as CanvasContainer, this.gameIsFininsh);

      this.game.start();
  }
}
