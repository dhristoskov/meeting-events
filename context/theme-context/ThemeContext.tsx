import { createContext, ReactNode, useState } from 'react';

import { DarkTheme, LightTheme } from './Themes';


interface Props {
    children: ReactNode;
}

interface Themes {
    DarkTheme: {backgroundColor: string, color: string};
    LightTheme: {backgroundColor: string, color: string};
    isLight: boolean;
    onThemeChanger: () => void;
}

export const ThemeContext = createContext<Themes>({} as Themes);

const ThemeContextProvider: React.FC<Props> = ({ children }) => {

    const [ isLight, setIsLight ] = useState<boolean>(false);

    const onThemeChanger = (): void => {
        setIsLight(prevState => !prevState);
    }

    return (
        <ThemeContext.Provider value={{ isLight, onThemeChanger, DarkTheme, LightTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;