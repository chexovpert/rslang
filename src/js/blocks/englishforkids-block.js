import React, { useState, useEffect } from "react";
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from "react-transition-group";
import useAudio from "../hooks/audio.hook";
import GameOver from "./gameover";

const baseUrl = "https://react-learnwords-rslang.herokuapp.com/";

export default (props) => {
  const [correctWords] = useState([]);
  const [wrongWords] = useState([]);
  //
  const [data, setData] = useState(props.data.data.slice());

  console.log(data);
  const [guessData, setGuessData] = useState(props.data.data.slice());

  const [toggle, setToggle] = useState(null);
  const [correct, setCorrect] = useState(null);
  //
  const [url, setUrl] = useState(null);
  const [playing, toggleAudio, changeSrc] = useAudio(url);
  //
  const [baseData, setBaseData] = useState(
    props.data.data.slice().sort(() => Math.random() - 0.5)
  );
  //const [guess, setGuess] = useState(null);
  const [baseWord, setBaseWord] = useState(null);
  //const [image, setImage] = useState(null);

  const quessHandler = (event) => {
    if (event.target.value === baseWord.id) {
      console.log("Correct");
      data.map((elem) => {
        if (elem.id === event.target.value) {
          elem.checked = false;
        }
      });
      let correctElem = data.find((elem) => elem.id === event.target.value);
      if (
        !wrongWords.find((elem) => elem.id === event.target.value) &&
        !correctWords.find((elem) => elem.id === event.target.value)
      ) {
        correctWords.push(correctElem);
      }
      console.log(correctWords);
      setToggle(false);
      setTimeout(newWords, 1200);
      //setCorrect(true);
    } else {
      let wrongElem = data.find((elem) => elem.id === event.target.value);
      if (!wrongWords.find((elem) => elem.id === event.target.value)) {
        wrongWords.push(wrongElem);
      }

      console.log(wrongWords);
      console.log("wrong");
    }
  };
  //   const nextpageHandler = () => {
  //     setToggle(false);
  //     setTimeout(newWords, 1200);
  //   };
  const newWords = () => {
    setCorrect(false);
    setToggle(true);

    let updateData = guessData.slice().sort(() => Math.random() - 0.5);

    //setGuess([updateData[0]]);
    setBaseWord(updateData[0]);
    setUrl(`${baseUrl}${updateData[0].audio}`);
    //toggleAudio();
    changeSrc(`${baseUrl}${updateData[0].audio}`);
    //setImage(`${baseUrl}${updateData[0].image}`);
    //const guesses = [updateData[0]];
    let baseDataUpdate = baseData
      .slice()
      .sort(() => Math.random() - 0.5)
      .filter((elem) => elem.id !== updateData[0].id);

    updateData.shift();
    console.log(updateData);
    setGuessData(updateData);

    //setData(updateData);
    // for (let i = 0; i < 3; i++) {
    //   guesses.push(baseDataUpdate[i]);
    // }
    // setGuess(guesses.slice().sort(() => Math.random() - 0.5));
  };
  useEffect(() => {
    setData(props.data.data.slice());
    setBaseData(props.data.data.slice().sort(() => Math.random() - 0.5));
    newWords();
  }, [props.data]);

  //   useEffect(() => {
  //     toggleAudio();
  //     newWords();
  //   }, [url]);

  if (guessData.length > 0) {
    console.log(data);
    return (
      //   <CSSTransition
      //     in={toggle}
      //     timeout={{
      //       enter: 1000,
      //       exit: 1000,
      //     }}
      //     mountOnEnter
      //     unmountOnExit
      //     classNames="audChall-buttons"
      //     onEntered={() => {
      //       toggleAudio();
      //       changeSrc(`${url}`);
      //     }}
      //   >
      <div style={{ width: "100%" }}>
        <div>
          <div className="englishforkids_container">
            {data &&
              data.map((word) => (
                <div className="englishforkids_container-buttons">
                  <img
                    src={`${baseUrl}${word.image}`}
                    className="englishforkids__base-image"
                  ></img>
                  <button
                    value={word.id}
                    //disabled={correct}
                    className={
                      !word.checked
                        ? `audioChallenge__anwsers-button wrong`
                        : "audioChallenge__anwsers-button correct"
                    }
                    onClick={quessHandler}
                  >
                    {word.wordTranslate}
                  </button>
                </div>
              ))}
          </div>
          <button
            className={
              playing
                ? "audioChallenge__base-button play"
                : "audioChallenge__base-button"
            }
            style={{ margin: "30px auto", display: "block" }}
            onClick={toggleAudio}
          >
            {playing ? "Pause" : "Play"}
          </button>
          {/* <button
              onClick={nextpageHandler}
              className="header__link login"
              style={{ margin: "0 auto" }}
            >
              {correct ? "следующее слово" : "я не знаю"}
            </button> */}
        </div>
      </div>
      //   </CSSTransition>
    );
  } else {
    return (
      <div>
        <GameOver correct={correctWords} wrong={wrongWords}></GameOver>
      </div>
    );
  }
};
