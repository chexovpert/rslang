import React, { useState, useEffect } from "react";
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from "react-transition-group";
import useAudio from "../hooks/audio.hook";
import wrongAudioPath from "../../assets/sounds/error.mp3";
import correctAudioPath from "../../assets/sounds/correct.mp3";
import GameOver from "./gameover";

const baseUrl = "https://react-learnwords-rslang.herokuapp.com/";

export default (props) => {
  const [correctWords] = useState([]);
  const [wrongWords] = useState([]);
  const [wrongWordsLength, setWrongWordsLength] = useState(wrongWords.length);
  const [correctWordsLength, setCorrectWordsLength] = useState(
    correctWords.length
  );
  //
  const wrongAudio = new Audio(wrongAudioPath);
  const correctAudio = new Audio(correctAudioPath);
  //
  const [data, setData] = useState(props.data.data.slice());
  const [toggle, setToggle] = useState(null);
  const [correct, setCorrect] = useState(null);
  //
  const [url, setUrl] = useState(null);
  const [playing, toggleAudio, changeSrc] = useAudio(url);
  //
  const [baseData, setBaseData] = useState(
    props.data.data.slice().sort(() => Math.random() - 0.5)
  );
  const [guess, setGuess] = useState(null);
  const [baseWord, setBaseWord] = useState(null);
  const [image, setImage] = useState(null);

  const quessHandler = (event) => {
    if (event.target.value === baseWord.id) {
      //console.log(baseData);
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
    } else {
      let wrongElem = baseData.find((elem) => elem.id === event.target.value);
      if (!wrongWords.find((elem) => elem.id === event.target.value)) {
        wrongWords.push(wrongElem);
      }
      wrongAudio.play();
      setWrongWordsLength(wrongWords.length);
      console.log("wrong");
    }
  };
  const nextpageHandler = () => {
    if (!correct) {
      let wrongElem = baseData.find((elem) => elem.id === baseWord.id);
      if (!wrongWords.find((elem) => elem.id === baseWord.id)) {
        wrongWords.push(wrongElem);
      }
      setWrongWordsLength(wrongWords.length);
      wrongAudio.play();
    }
    setToggle(false);
    setTimeout(newWords, 1200);
  };
  const newWords = () => {
    setCorrect(false);
    setToggle(true);

    let updateData = data.slice().sort(() => Math.random() - 0.5);

    setGuess([updateData[0]]);
    setBaseWord(updateData[0]);
    setUrl(`${baseUrl}${updateData[0].audio}`);
    setImage(`${baseUrl}${updateData[0].image}`);
    const guesses = [updateData[0]];
    let baseDataUpdate = baseData
      .slice()
      .sort(() => Math.random() - 0.5)
      .filter((elem) => elem.id !== updateData[0].id);
    updateData.shift();
    setData(updateData);
    for (let i = 0; i < 3; i++) {
      guesses.push(baseDataUpdate[i]);
    }
    setGuess(guesses.slice().sort(() => Math.random() - 0.5));
  };
  useEffect(() => {
    setData(props.data.data.slice());
    setBaseData(props.data.data.slice().sort(() => Math.random() - 0.5));
    newWords();
  }, [props.data]);

  if (data.length > 0) {
    return (
      <div style={{ width: "100%" }}>
        <div className="gameLayout__gameStats">
          <div className="gameLayout__gameStats-div">
            Выученые слова: {correctWordsLength}
          </div>
          <div className="gameLayout__gameStats-div">
            Неправильные слова: {wrongWordsLength}
          </div>
          <div className="gameLayout__gameStats-div">
            Слов осталось: {data.length}
          </div>
        </div>
        <CSSTransition
          in={toggle}
          timeout={{
            enter: 1000,
            exit: 1000,
          }}
          mountOnEnter
          //unmountOnExit
          classNames="audChall-buttons"
          onEntered={() => {
            toggleAudio();
            changeSrc(`${url}`);
          }}
        >
          <div style={{ width: "100%" }}>
            <div className="audioChallenge__base-word-container">
              <div className="audioChallenge__base-button-container">
                {!correct && (
                  <button
                    className={
                      playing
                        ? "audioChallenge__base-button play"
                        : "audioChallenge__base-button"
                    }
                    style={{ margin: "0 auto" }}
                    onClick={toggleAudio}
                  >
                    {playing ? "Pause" : "Play"}
                  </button>
                )}
              </div>

              <CSSTransition
                in={correct}
                timeout={{
                  enter: 1000,
                  exit: 300,
                }}
                mountOnEnter
                unmountOnExit
                classNames="ap-card"
              >
                <div className="audioChallenge__card-correct">
                  <div className="audioChallenge__card-correct-image">
                    <img
                      src={image}
                      className="audioChallenge__base-image"
                    ></img>
                  </div>
                  <div className="audioChallenge__card-correct-bottom">
                    <button
                      onClick={toggleAudio}
                      className={
                        playing
                          ? "audioChallenge__base-button play"
                          : "audioChallenge__base-button"
                      }
                    >
                      {playing ? "Pause" : "Play"}
                    </button>
                    <div className="audioChallenge__base-correct-word">
                      <h2>{baseWord && baseWord.word}</h2>
                    </div>
                  </div>
                </div>
              </CSSTransition>
            </div>
            <div className="savanna__component">
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
                      {word.wordTranslate}
                    </button>
                  ))}
              </div>

              <button
                onClick={nextpageHandler}
                className="header__link login"
                style={{ margin: "0 auto" }}
              >
                {correct ? "следующее слово" : "я не знаю"}
              </button>
            </div>
          </div>
        </CSSTransition>
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
