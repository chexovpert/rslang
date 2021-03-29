import React, { useContext, useState } from "react";

const WordContext = React.createContext();

export const useWordContext = () => {
  return useContext(WordContext);
};

export const WordProvider = ({ children }) => {
  const [end, setEnd] = useState(true);
  const [hide, setHide] = useState(true);
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [learnd, setLearnd] = useState(true);

  const soundHandler = (link) => {
    const sound = new Audio();
    sound.src = `https://react-learnwords-rslang.herokuapp.com/${link}`;
    sound.onended = () => {
      setEnd(true);
    };
    if (end) {
      sound.play();
      setEnd(false);
    }
    sound.currentTime = 0;
  };

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
        soundHandler,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export default WordContext;
