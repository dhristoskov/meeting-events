import Router from 'next/router';
import cookie from 'js-cookie';

export const login = ( token: string ): void => {

    const tokenExpirationTime = new Date(new Date().getTime() + 1000 * 60 * 60);

    cookie.set('token', token, { expires: tokenExpirationTime });
    Router.replace('/');
};

export const logout = (): void => {

    cookie.remove('token');
    Router.replace('/');
}