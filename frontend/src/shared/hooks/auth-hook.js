import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpDate, setTokenExpDate] = useState();
  const [userId, setUserId] = useState(null);
  const [urlUserId, setUrlUserId] = useState(null);
  const [redirectToAuth, setRedirectToAuth] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setRedirectToAuth(false);
    setUrlUserId(null);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 3600);
    setTokenExpDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  const setTheUrlUserId = useCallback((urlUserId) => {
    setUrlUserId(urlUserId);
  }, []);

  const setRedirection = useCallback((uid, urlUid) => {
    if (uid === urlUid) {
      setRedirectToAuth(true);
    }
  }, []);

  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime = tokenExpDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return {
    token,
    login,
    logout,
    userId,
    urlUserId,
    setTheUrlUserId,
    redirectToAuth,
    setRedirection,
  };
};
