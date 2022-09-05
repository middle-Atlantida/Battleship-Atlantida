import { useEffect } from 'react';

export const useToggleFullScreen = () => {
    useEffect(() => {
        const toggleFullScreen = (event: KeyboardEvent) => {
            if (event.code !== 'Space' && event.code !== 'Escape') return;

            if (event.code === 'Space' && !document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else if (event.code === 'Escape' && document.exitFullscreen) {
                document.exitFullscreen();
            }
        };

        document.addEventListener('keyup', toggleFullScreen);

        return () => document.removeEventListener('keyup', toggleFullScreen);
    }, []);
};
