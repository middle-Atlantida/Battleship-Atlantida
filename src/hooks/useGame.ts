import {
    useRef,
    useState,
    useCallback,
    useEffect,
} from 'react';
import GameManager from '../game/gameManager';

export default () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameManager, setGameManager] = useState<GameManager | null>(null);
    const [winner, setWinner] = useState<boolean | null>(null);

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

    const finishGameCallback = useCallback((playerWinner: boolean) => {
        console.log('playerWinner', playerWinner);
        setWinner(playerWinner);
        console.log(winner);
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            const newGameManager = new GameManager(canvasRef.current, finishGameCallback);

            newGameManager?.run();
            setGameManager(newGameManager);
        }
    }, []);

    return { canvasRef, restart, openFullScreen };
};
