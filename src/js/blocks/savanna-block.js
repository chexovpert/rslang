import React, { useState, useEffect } from "react";
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from "react-transition-group";
import wrongAudioPath from "../../assets/sounds/error.mp3";
import correctAudioPath from "../../assets/sounds/correct.mp3";
import GameOver from "./gameover";

export default (props) => {
  const [correctWords] = useState([]);
  const [wrongWords] = useState([]);
  const [wrongWordsLength, setWrongWordsLength] = useState(wrongWords.length);
  const [correctWordsLength, setCorrectWordsLength] = useState(
    correctWords.length
  );
  const wrongAudio = new Audio(wrongAudioPath);
  const correctAudio = new Audio(correctAudioPath);
  //
  const [correct, setCorrect] = useState(null);
  const [toggle, setToggle] = useState(null);
  const [data, setData] = useState(props.data.data.slice());
  const [baseData, setBaseData] = useState(
    props.data.data.slice().sort(() => Math.random() - 0.5)
  );
  const [guess, setGuess] = useState(null);
  const [baseWord, setBaseWord] = useState(null);

  const quessHandler = (event) => {
    //console.log(event.target.textContent);
    //console.log(baseWord);
    console.log(guess);
    console.log(baseWord);
    if (event.target.textContent === baseWord.word) {
      let correctElem = baseData.find((elem) => elem.id === event.target.value);
      if (
        !wrongWords.find((elem) => elem.id === event.target.value) &&
        !correctWords.find((elem) => elem.id === event.target.value)
      ) {
        correctWords.push(correctElem);
      }
      setCorrect(true);
      correctAudio.play();
      setCorrectWordsLength(correctWords.length);

      setTimeout(nextpageHandler, 300);
      // setToggle(false);
      // setTimeout(newWords, 1200);
      //newWords();
    } else {
      let wrongElem = baseData.find((elem) => elem.id === event.target.value);
      if (
        !wrongWords.find((elem) => elem.id === event.target.value) &&
        !correctWords.find((elem) => elem.id === event.target.value)
      ) {
        wrongWords.push(wrongElem);
      }
      wrongAudio.play();
      setWrongWordsLength(wrongWords.length);
      console.log("wrong");

      //console.log(guess);
      //console.log(baseWord);
      //newWords();
    }
  };
  const addWrongWord = () => {
    if (!correct) {
      let wrongElem = baseData.find((elem) => elem.id === baseWord.id);
      if (!wrongWords.find((elem) => elem.id === baseWord.id)) {
        wrongWords.push(wrongElem);
      }
      setWrongWordsLength(wrongWords.length);
      wrongAudio.play();
    }
  };
  const nextpageHandler = () => {
    // if (!correct) {
    //   let wrongElem = baseData.find((elem) => elem.id === baseWord.id);
    //   if (!wrongWords.find((elem) => elem.id === baseWord.id)) {
    //     wrongWords.push(wrongElem);
    //   }
    //   setWrongWordsLength(wrongWords.length);
    //   wrongAudio.play();
    // }
    setCorrect(false);
    setToggle(false);
    setTimeout(newWords, 300);
  };
  const newWords = () => {
    setToggle(true);
    let updateData = data.slice().sort(() => Math.random() - 0.5);
    setData(updateData);
    setGuess([updateData[0]]);
    setBaseWord(updateData[0]);
    const guesses = [updateData[0]];
    let baseDataUpdate = baseData
      .slice()
      .sort(() => Math.random() - 0.5)
      .filter((elem) => elem.id !== updateData[0].id);
    updateData.shift();
    setData(updateData);

    //console.log(baseDataUpdate);

    for (let i = 0; i < 3; i++) {
      guesses.push(baseDataUpdate[i]);
    }
    setGuess(guesses.slice().sort(() => Math.random() - 0.5));
    //console.log(data);
  };
  useEffect(() => {
    setData(props.data.data.slice());
    setBaseData(props.data.data.slice().sort(() => Math.random() - 0.5));
    newWords();
  }, [props.data]);
  if (data.length > 0) {
    return (
      <div style={{ width: "100%" }}>
        <div>
          <div>Выученые слова: {correctWordsLength}</div>
          <div>Неправильные слова: {wrongWordsLength}</div>
        </div>
        <CSSTransition
          in={toggle}
          timeout={{
            enter: 15000,
            exit: 300,
          }}
          mountOnEnter
          unmountOnExit
          classNames="bw"
          onEntered={() => {
            addWrongWord();
            nextpageHandler();
          }}
        >
          <div className={`savanna__component-baseword`}>
            <p>{baseWord && baseWord.wordTranslate}</p>
          </div>
        </CSSTransition>

        <div className="savanna__component">
          <CSSTransition
            in={toggle}
            timeout={{
              enter: 1000,
              exit: 300,
            }}
            //onEnter={() => setShowButton(false)}
            //onExited={() => setToggle(false)}
            // addEndListener={(node, done) => {
            //   node.addEventListener("transitionend", done, false);
            // }}
            mountOnEnter
            unmountOnExit
            classNames="wb"
          >
            <div className="savanna__component-buttons">
              {guess &&
                guess.map((word) => (
                  <button
                    value={word.id}
                    disabled={correct}
                    className={
                      correct
                        ? `audioChallenge__anwsers-button ${
                            word.id === baseWord.id ? "true" : "wrong"
                          }`
                        : "audioChallenge__anwsers-button"
                    }
                    onClick={quessHandler}
                  >
                    {word.word}
                  </button>
                ))}
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <GameOver correct={correctWords} wrong={wrongWords}></GameOver>
      </div>
    );
  }
};
