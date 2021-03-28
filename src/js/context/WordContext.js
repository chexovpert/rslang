import React, { useContext, useEffect, useState } from "react";

const WordContext = React.createContext();

export const useWordContext = () => {
  return useContext(WordContext);
};

export const WordProvider = ({ children }) => {
  const [hide, setHide] = useState(true);
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [learnd, setLearnd] = useState(true);

  return (
    <WordContext.Provider
      value={{
        hide,
        setHide,
        answer,
        setAnswer,
        count,
        setCount,
        correct,
        setCorrect,
        learnd,
        setLearnd,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export default WordContext;
