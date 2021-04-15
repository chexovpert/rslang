import React, { useState, useEffect, useCallback } from "react";

export default () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        if (!response.ok) {
          setError(response.status);
          throw new Error(response.status || "Ошибка");
        }
        const data = await response.json();
        setLoading(false);
        return data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    []
  );
  return { loading, request, error };
};
