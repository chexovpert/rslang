import React, { useState, useEffect } from "react";
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from "react-transition-group";
import useAudio from "../hooks/audio.hook";
import GameOver from "./gameover";
import wrongAudioPath from "../../assets/sounds/error.mp3";
import correctAudioPath from "../../assets/sounds/correct.mp3";

const baseUrl = "https://react-learnwords-rslang.herokuapp.com/";

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

  const [baseWord, setBaseWord] = useState(null);

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
      correctAudio.play();
      setToggle(false);
      setCorrectWordsLength(correctWords.length);
      setTimeout(newWords, 1200);
    } else {
      let wrongElem = data.find((elem) => elem.id === event.target.value);
      if (!wrongWords.find((elem) => elem.id === event.target.value)) {
        wrongWords.push(wrongElem);
      }
      wrongAudio.play();
      setWrongWordsLength(wrongWords.length);
      console.log(wrongWords);
      console.log("wrong");
    }
  };
  const newWords = () => {
    //setCorrect(false);
    setToggle(true);

    let updateData = guessData.slice().sort(() => Math.random() - 0.5);

    setBaseWord(updateData[0]);
    setUrl(`${baseUrl}${updateData[0].audio}`);

    changeSrc(`${baseUrl}${updateData[0].audio}`);
    toggleAudio();
    // let baseDataUpdate = baseData
    //   .slice()
    //   .sort(() => Math.random() - 0.5)
    //   .filter((elem) => elem.id !== updateData[0].id);

    updateData.shift();
    console.log(updateData);
    setGuessData(updateData);
  };
  useEffect(() => {
    setData(props.data.data.slice());
    setBaseData(props.data.data.slice().sort(() => Math.random() - 0.5));
    newWords();
  }, [props.data]);

  if (guessData.length > 0) {
    console.log(data);
    return (
      <div style={{ width: "100%" }}>
        <div>
          <div>
            <div>Выученые слова: {correctWordsLength}</div>
            <div>Неправильные слова: {wrongWordsLength}</div>
          </div>
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
                    disabled={!word.checked}
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
