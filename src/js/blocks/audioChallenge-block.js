import React, { useState, useEffect } from "react";
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from "react-transition-group";
import useAudio from "../hooks/audio.hook";

const baseUrl = "https://react-learnwords-rslang.herokuapp.com/";

export default (props) => {
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
    if (event.target.textContent === baseWord.word) {
      console.log("Correct");
      setToggle(false);
      setTimeout(newWords, 1200);
    } else {
      console.log("wrong");
    }
  };
  const newWords = () => {
    setCorrect(false);
    setToggle(true);
    let updateData = data.slice().sort(() => Math.random() - 0.5);
    //setData(updateData);
    setGuess([updateData[0]]);
    setBaseWord(updateData[0]);
    setUrl(`${baseUrl}${updateData[0].audio}`);
    setImage(`${baseUrl}${updateData[0].image}`)
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

  useEffect(() => {
    //console.log(url);
    changeSrc(`${url}`);
  }, url);

  if (data.length > 0) {
    console.log(image)
    return (
      <CSSTransition
        in={toggle}
        timeout={{
          enter: 1000,
          exit: 1000,
        }}
        mountOnEnter
        unmountOnExit
        classNames="wb"
      >
        <div style={{ width: "100%" }}>
          <CSSTransition
            in={toggle}
            timeout={{
              enter: 15000,
              exit: 1000,
            }}
            mountOnEnter
            unmountOnExit
            classNames="ap"
          >
            <div className="audioChallenge__base">
              <div>
              <div ><img src={image} className="audioChallenge__base-image"></img></div>
              <div ><button  className="audioChallenge__base-button">smth</button><div><h2>{baseWord && baseWord.word}</h2></div></div>
              </div>
              <div>
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
              </div>
            </div>
          </CSSTransition>

          <div className="savanna__component">
            <div className="savanna__component-buttons">
              {guess &&
                guess.map((word) => (
                  <button className="header__link login" onClick={quessHandler}>
                    {word.wordTranslate}
                  </button>
                ))}
            </div>

            <button className="header__link login" style={{ margin: "0 auto" }}>
              next
            </button>
          </div>
        </div>
      </CSSTransition>
    );
  } else {
    return <div>Victory</div>;
  }
};
