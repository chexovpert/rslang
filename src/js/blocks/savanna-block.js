import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default (props) => {
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
      console.log("Correct");
      //console.log(guess);
      //console.log(baseWord);
      setToggle(false);
      setTimeout(newWords, 1200);
      //newWords();
    } else {
      console.log("wrong");

      //console.log(guess);
      //console.log(baseWord);
      //newWords();
    }
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

    console.log(baseDataUpdate);

    for (let i = 0; i < 3; i++) {
      guesses.push(baseDataUpdate[i]);
    }
    setGuess(guesses.slice().sort(() => Math.random() - 0.5));
    console.log(data);
  };
  useEffect(() => {
    setData(props.data.data.slice());
    setBaseData(props.data.data.slice().sort(() => Math.random() - 0.5));
    newWords();
  }, [props.data]);
  if (data.length > 0) {
    return (
      <div style={{ width: "100%" }}>
        <CSSTransition
          in={toggle}
          timeout={{
            enter: 15000,
            exit: 1000,
          }}
          mountOnEnter
          unmountOnExit
          classNames="bw"
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
              exit: 1000,
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
                  <button className="header__link login" onClick={quessHandler}>
                    {word.word}
                  </button>
                ))}
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  } else {
    return <div>Victory</div>;
  }
};
