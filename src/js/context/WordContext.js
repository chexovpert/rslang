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
  const [timer, setTimer] = useState(false);

  const [start, setStart] = useState(false);
  let dltword = [];
  let dltwordid = [];
  let crctword = [];
  let crctwordid = [];
  let dWords = [];
  let dWordsId = [];
  let index;

  const sound = new Audio();
  const soundHandler = (link) => {
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

  function difHndlr(word) {
    if ("difWord" in localStorage) {
      dWords = JSON.parse(localStorage.getItem("difWord"));
      dWordsId = JSON.parse(localStorage.getItem("difWordId"));
      if (!dWordsId.includes(word.id)) {
        dWords.push(word);
        dWordsId.push(word.id);
        localStorage.setItem("difWord", JSON.stringify(dWords));
        localStorage.setItem("difWordId", JSON.stringify(dWordsId));
      }
    } else {
      dWords.push(word);
      dWordsId.push(word.id);
      localStorage.setItem("difWord", JSON.stringify(dWords));
      localStorage.setItem("difWordId", JSON.stringify(dWordsId));
    }
  }

  function correctHndlr(word) {
    if ("correctword" in localStorage) {
      crctword = JSON.parse(localStorage.getItem("correctword"));
      crctwordid = JSON.parse(localStorage.getItem("correctwordid"));
      if (!crctwordid.includes(word.id)) {
        crctword.push(word);
        crctwordid.push(word.id);
        localStorage.setItem("correctword", JSON.stringify(crctword));
        localStorage.setItem("correctwordid", JSON.stringify(crctwordid));
      }
    } else {
      crctword.push(word);
      crctwordid.push(word.id);
      localStorage.setItem("correctword", JSON.stringify(crctword));
      localStorage.setItem("correctwordid", JSON.stringify(crctwordid));
    }
  }

  function deleteHndlr(word) {
    if ("deleteword" in localStorage) {
      dltword = JSON.parse(localStorage.getItem("deleteword"));
      dltwordid = JSON.parse(localStorage.getItem("deletewordid"));
      if (!dltwordid.includes(word.id)) {
        if ("correctword" in localStorage) {
          crctword = JSON.parse(localStorage.getItem("correctword"));
          crctwordid = JSON.parse(localStorage.getItem("correctwordid"));
          if (crctwordid.includes(word.id)) {
            index = crctwordid.indexOf(word.id);
            crctword.splice(index, 1);
            crctwordid.splice(index, 1);
            localStorage.setItem("correctword", JSON.stringify(crctword));
            localStorage.setItem("correctwordid", JSON.stringify(crctwordid));
          }
        }
        if ("difWord" in localStorage) {
          dWords = JSON.parse(localStorage.getItem("difWord"));
          dWordsId = JSON.parse(localStorage.getItem("difWordId"));
          if (dWordsId.includes(word.id)) {
            index = dWordsId.indexOf(word.id);
            dWords.splice(index, 1);
            dWordsId.splice(index, 1);
            localStorage.setItem("difWord", JSON.stringify(dWords));
            localStorage.setItem("difWordId", JSON.stringify(dWordsId));
          }
        }
        dltword.push(word);
        dltwordid.push(word.id);
        localStorage.setItem("deleteword", JSON.stringify(dltword));
        localStorage.setItem("deletewordid", JSON.stringify(dltwordid));
      }
    } else {
      if ("correctword" in localStorage) {
        crctword = JSON.parse(localStorage.getItem("correctword"));
        crctwordid = JSON.parse(localStorage.getItem("correctwordid"));
        if (crctwordid.includes(word.id)) {
          index = crctwordid.indexOf(word.id);
          crctword.splice(index, 1);
          crctwordid.splice(index, 1);
          localStorage.setItem("correctword", JSON.stringify(crctword));
          localStorage.setItem("correctwordid", JSON.stringify(crctwordid));
        }
      }
      if ("difWord" in localStorage) {
        dWords = JSON.parse(localStorage.getItem("difWord"));
        dWordsId = JSON.parse(localStorage.getItem("difWordId"));
        if (dWordsId.includes(word.id)) {
          index = dWordsId.indexOf(word.id);
          dWords.splice(index, 1);
          dWordsId.splice(index, 1);
          localStorage.setItem("difWord", JSON.stringify(dWords));
          localStorage.setItem("difWordId", JSON.stringify(dWordsId));
        }
      }
      dltword.push(word);
      dltwordid.push(word.id);
      localStorage.setItem("deleteword", JSON.stringify(dltword));
      localStorage.setItem("deletewordid", JSON.stringify(dltwordid));
    }
  }

  function removeDeleteHndlr(word) {
    if ("deleteword" in localStorage) {
      dltword = JSON.parse(localStorage.getItem("deleteword"));
      dltwordid = JSON.parse(localStorage.getItem("deletewordid"));
      if (dltwordid.includes(word.id)) {
        index = dltwordid.indexOf(word.id);
        dltword.splice(index, 1);
        dltwordid.splice(index, 1);
        localStorage.setItem("deleteword", JSON.stringify(dltword));
        localStorage.setItem("deletewordid", JSON.stringify(dltwordid));
      }
    }
  }

  function removeDifHndlr(word) {
    if ("difWord" in localStorage) {
      dWords = JSON.parse(localStorage.getItem("difWord"));
      dWordsId = JSON.parse(localStorage.getItem("difWordId"));
      if (dWordsId.includes(word.id)) {
        index = dWordsId.indexOf(word.id);
        dWords.splice(index, 1);
        dWordsId.splice(index, 1);
        localStorage.setItem("difWord", JSON.stringify(dWords));
        localStorage.setItem("difWordId", JSON.stringify(dWordsId));
      }
    }
  }

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
        difHndlr,
        correctHndlr,
        deleteHndlr,
        removeDeleteHndlr,
        removeDifHndlr,
        timer,
        setTimer,
        start,
        setStart,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export default WordContext;
