import { createContext, ReactNode, useState } from 'react';


interface Props {
    children: ReactNode
}

interface Themes {
    isLight: boolean,
    onThemeChanger: () => void
}

export const ThemeContext = createContext<Themes>({} as Themes);

const ThemeContextProvider: React.FC<Props> = ({ children }) => {

    const [ isLight, setIsLight ] = useState<boolean>(false);

    const onThemeChanger = (): void => {
        setIsLight(prevState => !prevState);
    }

    return (
        <ThemeContext.Provider value={{ isLight, onThemeChanger }}>
            { children }
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;