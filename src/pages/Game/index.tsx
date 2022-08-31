import React, { useState, useCallback } from 'react';
import { Header } from 'components/Header';
import { routes } from 'pages/Root';
// import cn from 'classnames';
import { Modal } from 'components/Modal';
import { EndGame } from './components/EndGame';
import { useGame } from '../../hooks/useGame';

export const Game = () => {
    const [title, setTitle] = useState('Размести корабли на поле');
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const checkScreenGame = (screenName: string) => {
        switch (screenName) {
            case 'preparation':
                setTitle('Размести корабли на поле');
                break;
            case 'buttle':
                setTitle('Бой');
                break;
            default:
                setTitle('Результат');
                break;
        }
        console.log(screenName);
    };

    const finishGame = useCallback((playerWinner: boolean, couterShots: number) => {
        console.log('playerWinner', playerWinner);
        handleOpen();
        console.log('couterShots', couterShots);
    }, []);

    const { canvasRef, restart } = useGame(checkScreenGame, finishGame);

    // const onClickRestartGame = useCallback(() => {
    //     handleClose();
    //     restart();
    // }, []);

    return <>
        <Header
            title={title}
            backLink={routes.main}
        />
        {/* <main className={cn(css.container)}> */}
        <main>
            <canvas ref={canvasRef} />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div>
                    <EndGame onClick={restart}/>
                </div>
            </Modal>
        </main>
    </>;
};
