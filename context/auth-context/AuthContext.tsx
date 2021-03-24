import { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

interface Props {
    children: ReactNode;
};

interface Auth {
    isLoggedIn: boolean;
    token: string;
    login: (token: string, expirInTime?: Date ) => void;
    logout: () => void;
};

export const AuthContext = createContext<Auth>(
    {
      isLoggedIn: false,
      token: null
    } as Auth);

let logoutTimer: any;

const AuthContextProvider: React.FC<Props> = ({ children }) => {

    const router = useRouter();
    const [token, setToken] = useState<string>(null);
    const [expirTime, setExpTimer] = useState<Date>(null);

    const login = useCallback((token: string, expirInTime?: Date ): void => {
        setToken(token);
        const tokenExpirationTime = expirInTime || new Date(new Date().getTime() + 1000 * 60 * 60);
        setExpTimer(tokenExpirationTime);
    
        localStorage.setItem
        ('userData', 
        JSON.stringify(
          { 
            token: token,
            expiration: tokenExpirationTime.toISOString() }
        ));
        cookie.set('token', token, { expires: tokenExpirationTime });
        router.replace('/');
      }, []);

      const logout = useCallback((): void => {
        setToken(null);;
        setExpTimer(null);
        localStorage.removeItem('userData');
        cookie.remove('token');
        router.replace('/');
      }, []);

      useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date() ) {

          setToken(storedData.token)
          localStorage.setItem
            ('userData', 
            JSON.stringify(
              { 
                token: storedData.token,
                expiration: new Date(storedData.expiration)}
          ));
        }
      }, [login]);
    
      useEffect(() => {
        if(token && expirTime){
          const remainingTime = expirTime.getTime() - new Date().getTime();
          logoutTimer = setTimeout(logout, remainingTime);
        }else {
          clearTimeout(logoutTimer);
          router.replace('/');
        }
      }, [token, logout, expirTime]);

    return(
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token,
            login,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;