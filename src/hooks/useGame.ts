import { useRef, useState, useCallback, useEffect } from 'react';

import { Theme as MuiTheme } from '@mui/material';

import { GameManager } from 'game/gameManager';
import { CanvasArgs } from 'game/types';
import { Theme, useTheme } from 'utils/theme';
import { darkTheme, lightTheme } from 'utils/theme/themes';

const getCanvasArgs = (themeObject: { name: Theme; theme: MuiTheme }): CanvasArgs => {
    const { palette } = themeObject.theme;
    return {
        textColor: palette.text.primary,
    };
};

export const useGame = (
    checkScreenName: (screenName: string) => void,
    finishGame: (playerWinner: boolean, couterShots: number) => void,
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameManager, setGameManager] = useState<GameManager | null>(null);

    const { theme } = useTheme();

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
            const canvasArgs = getCanvasArgs(theme === 'light' ? lightTheme : darkTheme);
            // eslint-disable-next-line max-len
            const newGameManager = new GameManager(
                canvasRef.current,
                finishGame,
                checkScreenName,
                canvasArgs,
            );

            newGameManager?.run();
            setGameManager(newGameManager);
        }
    }, []);

    useEffect(() => {
        const canvasArgs = getCanvasArgs(theme === 'light' ? lightTheme : darkTheme);
        if (gameManager) {
            gameManager.updateScreen(canvasArgs);
        }
    }, [theme, gameManager]);

    return { canvasRef, restart, openFullScreen };
};
