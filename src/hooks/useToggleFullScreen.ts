import { useEffect } from 'react';

import { KEY_CODES } from 'const/keyCodes';

export const useToggleFullScreen = () => {
    useEffect(() => {
        const toggleFullScreen = (event: KeyboardEvent) => {
            if (event.code !== KEY_CODES.f && event.code !== KEY_CODES.esc) return;

            if (event.code === KEY_CODES.f && !document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else if (event.code === KEY_CODES.esc && document.exitFullscreen) {
                document.exitFullscreen();
            }
        };

        document.addEventListener('keyup', toggleFullScreen);

        return () => document.removeEventListener('keyup', toggleFullScreen);
    }, []);
};
