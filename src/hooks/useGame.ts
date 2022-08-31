import {
    useRef,
    useState,
    useCallback,
    useEffect,
} from 'react';
import { GameManager } from '../game/gameManager';

export const useGame = (
    checkScreenName: (screenName: string) => void,
    finishGame: (playerWinner: boolean, couterShots: number) => void,
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameManager, setGameManager] = useState<GameManager | null>(null);

    const restart = useCallback(() => {
        gameManager?.restart();
    }, [gameManager]);

    const openFullScreen = useCallback(() => {
        if (!document.fullscreenElement) {
            canvasRef.current?.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            // eslint-disable-next-line max-len
            const newGameManager = new GameManager(canvasRef.current, finishGame, checkScreenName);

            newGameManager?.run();
            setGameManager(newGameManager);
        }
    }, []);

    return { canvasRef, restart, openFullScreen };
};
