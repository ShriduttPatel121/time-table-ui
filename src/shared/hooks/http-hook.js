import { useState, useCallback, useRef, useEffect } from "react";

//custom hook for the api calling, and it resutns response loading state, response data, and if call fails it will return.
export const useHttpClient = () => {
  const [isLoading, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  // array of the active requests
  const activeHttpRequest = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      //console.log(url + " " + method + " " + body + " ");
      try {
        setIsLoding(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();
        // removes the abort controller f we receive the response successfully
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (a) => a !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoding(false);
        return responseData;
      } catch (e) {
        setError(e.message || "Somthing went wrong.");
        setIsLoding(false);
        throw new Error(e.message);
      }
    },
    []
  );

  useEffect(() => {
      // this will cancle the reuqest if current componet(which has sent api call) get u-mounted from the DOM.
    return () => {
      activeHttpRequest.current.forEach((a) => a.abort());
    };
  }, []);

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
