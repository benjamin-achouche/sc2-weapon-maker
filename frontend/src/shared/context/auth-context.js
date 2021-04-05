import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  urlUserId: null,
  redirectToAuth: false,
  setTheUrlUserId: () => {},
  setRedirection: () => {},
  login: () => {},
  logout: () => {},
});
