import { Button } from '@mui/material';
import classNames from 'classnames';

import { Image } from 'components/Image';
import DarkIcon from 'img/dark.svg';
import LightIcon from 'img/light.svg';
import { Theme, useTheme } from 'utils/theme';

import css from './ThemeSwitcher.css';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            {theme === Theme.LIGHT ? (
                <Button className={classNames(css.themeSwitcher)} onClick={toggleTheme}>
                    <Image src={LightIcon} alt="Light" />
                </Button>
            ) : (
                <Button
                    variant="contained"
                    className={classNames(css.themeSwitcher)}
                    onClick={toggleTheme}
                >
                    <Image src={DarkIcon} alt="Dark" />
                </Button>
            )}
        </>
    );
};
