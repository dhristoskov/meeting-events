import { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router'

interface Props {
    children: ReactNode;
};

interface Auth {
    isLoggedIn: boolean;
    userId: string;
    token: string;
    username: string;
    login: (uid: string, token: string, username: string, expirInTime?: Date ) => void;
    logout: () => void;
};

export const AuthContext = createContext<Auth>(
    {
        isLoggedIn: false,
        userId: null,
        token: null,
        username: null,
    } as Auth);

let logoutTimer;

const AuthContextProvider: React.FC<Props> = ({ children }) => {

    const router = useRouter();
    const [token, setToken] = useState<string>(null);
    const [userId, setUserId] = useState<string>(null);
    const [username, setUsername] = useState<string>(null)
    const [expirTime, setExpTimer] = useState<Date>(null);

    const login = useCallback((uid: string, token: string, username: string, expirInTime?: Date ): void => {
        setToken(token);
        setUserId(uid);
        setUsername(username)
        const tokenExpirationTime = expirInTime || new Date(new Date().getTime() + 1000 * 60 * 60);
        setExpTimer(tokenExpirationTime);
    
        localStorage.setItem
        ('userData', 
        JSON.stringify(
          {userId: uid,
           token: token,
           username: username, 
           expiration: tokenExpirationTime.toISOString() }
        ));
      }, []);

      const logout = useCallback((): void => {
        setToken(null);
        setUserId(null);
        setUsername(null);
        setExpTimer(null);
        localStorage.removeItem('userData');
        router.replace('/');
      }, []);

      useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date() ) {
          login(storedData.userId, storedData.token, storedData.username, new Date(storedData.expiration));
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
            userId,
            username,
            login,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;