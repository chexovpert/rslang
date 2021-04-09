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
  const [timerOut, setTimerOut] = useState(false);
  const [start, setStart] = useState(false);
  const [pagenum, setPagenum] = useState(1);
  const [groupnum, setGroupnum] = useState(1);
  const [upd, setUpd] = useState(1);

  let dltwordid = [];
  let crctwordid = [];
  let dWordsId = [];
  let index;

  const [settings, setSettings] = useState(false);
  const [showWordTransl, setShowWordTransl] = useState(true);
  const [showExtraTransl, setShowExtraTransl] = useState(true);
  const [showDifButton, setShowDifButton] = useState(true);
  const [showDelButton, setShowDelButton] = useState(true);
  const [soundVolume, setSoundVolume] = useState(100);

  const sound = new Audio();
  const soundHandler = (link) => {
    sound.src = `https://react-learnwords-rslang.herokuapp.com/${link}`;
    sound.volume = soundVolume / 100;
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
    if ("difWordId" in localStorage) {
      dWordsId = JSON.parse(localStorage.getItem("difWordId"));
      if (!dWordsId.includes(word.id)) {
        dWordsId.push(word.id);
        localStorage.setItem("difWordId", JSON.stringify(dWordsId));
      }
    } else {
      dWordsId.push(word.id);
      localStorage.setItem("difWordId", JSON.stringify(dWordsId));
    }
  }

  function correctHndlr(word) {
    if ("correctwordid" in localStorage) {
      crctwordid = JSON.parse(localStorage.getItem("correctwordid"));
      if (!crctwordid.includes(word.id)) {
        crctwordid.push(word.id);
        localStorage.setItem("correctwordid", JSON.stringify(crctwordid));
      }
    } else {
      crctwordid.push(word.id);
      localStorage.setItem("correctwordid", JSON.stringify(crctwordid));
    }
  }

  function deleteHndlr(word) {
    if ("deletewordid" in localStorage) {
      dltwordid = JSON.parse(localStorage.getItem("deletewordid"));
      if (!dltwordid.includes(word.id)) {
        if ("correctwordid" in localStorage) {
          crctwordid = JSON.parse(localStorage.getItem("correctwordid"));
          if (crctwordid.includes(word.id)) {
            index = crctwordid.indexOf(word.id);
            crctwordid.splice(index, 1);
            localStorage.setItem("correctwordid", JSON.stringify(crctwordid));
          }
        }
        if ("difWordId" in localStorage) {
          dWordsId = JSON.parse(localStorage.getItem("difWordId"));
          if (dWordsId.includes(word.id)) {
            index = dWordsId.indexOf(word.id);
            dWordsId.splice(index, 1);
            localStorage.setItem("difWordId", JSON.stringify(dWordsId));
          }
        }
        dltwordid.push(word.id);
        localStorage.setItem("deletewordid", JSON.stringify(dltwordid));
      }
    } else {
      if ("correctwordid" in localStorage) {
        crctwordid = JSON.parse(localStorage.getItem("correctwordid"));
        if (crctwordid.includes(word.id)) {
          index = crctwordid.indexOf(word.id);
          crctwordid.splice(index, 1);
          localStorage.setItem("correctwordid", JSON.stringify(crctwordid));
        }
      }
      if ("difWordId" in localStorage) {
        dWordsId = JSON.parse(localStorage.getItem("difWordId"));
        if (dWordsId.includes(word.id)) {
          index = dWordsId.indexOf(word.id);
          dWordsId.splice(index, 1);
          localStorage.setItem("difWordId", JSON.stringify(dWordsId));
        }
      }
      dltwordid.push(word.id);
      localStorage.setItem("deletewordid", JSON.stringify(dltwordid));
    }
  }

  function removeDeleteHndlr(word) {
    if ("deletewordid" in localStorage) {
      dltwordid = JSON.parse(localStorage.getItem("deletewordid"));
      if (dltwordid.includes(word.id)) {
        index = dltwordid.indexOf(word.id);
        dltwordid.splice(index, 1);
        localStorage.setItem("deletewordid", JSON.stringify(dltwordid));
      }
    }
  }

  function removeDifHndlr(word) {
    if ("difWordId" in localStorage) {
      dWordsId = JSON.parse(localStorage.getItem("difWordId"));
      if (dWordsId.includes(word.id)) {
        index = dWordsId.indexOf(word.id);
        dWordsId.splice(index, 1);
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
        timerOut,
        setTimerOut,
        showWordTransl,
        setShowWordTransl,
        showExtraTransl,
        setShowExtraTransl,
        showDifButton,
        setShowDifButton,
        showDelButton,
        setShowDelButton,
        soundVolume,
        setSoundVolume,
        settings,
        setSettings,
        pagenum,
        setPagenum,
        groupnum,
        setGroupnum,
        upd,
        setUpd,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export default WordContext;
