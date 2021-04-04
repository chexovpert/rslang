import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export default () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [message, setMessage] = useState(null);

  const login = useCallback((jwtToken, id, username, rToken, aMessage) => {
    setToken(jwtToken);
    setUserId(id);
    setName(username);
    setRefreshToken(rToken);
    setMessage(aMessage);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
        name: username,
        refreshToken: rToken,
        message: aMessage,
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setName(null);
    setRefreshToken(null);
    setMessage(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (storageName in localStorage) {
      if (
        data.userId &&
        data.token &&
        data.name &&
        data.refreshToken &&
        data.message
      ) {
        login(
          data.token,
          data.userId,
          data.name,
          data.refreshToken,
          data.message
        );
      }
    }
  }, [login]);
  return { login, logout, token, userId, name, refreshToken, message };
};
