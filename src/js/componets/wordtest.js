// import { useEffect } from "react";
import { useEffect, useState } from "react";
import "../../styles/components/wordtest.scss";
import { useWordContext } from "../context/WordContext";

export default function WordTest({ word }) {
  const wordCntx = useWordContext();

  useEffect(() => {
    let crctword = [];
    if ("correctwordid" in localStorage) {
      crctword = JSON.parse(localStorage.getItem("correctwordid"));
      if (crctword.includes(word.id)) {
        wordCntx.setLearnd(false);
      }
    }
  }, [word]);

  let testExample = word.textExample
    .split(" ")
    .map((elem) => {
      return elem.includes("<b>") ? (elem = "________") : elem;
    })
    .join(" ");

  function clickHandler() {
    if (wordCntx.answer == word.word) {
      alert("correct"); //заменить на отметку о правильности
      wordCntx.setLearnd(false);
      wordCntx.setCorrect(true);
      wordCntx.correctHndlr(word);
    } else {
      alert("incorrect"); //заменить на отметку о неправильности
    }
  }

  return (
    <div className="wordtest__container">
      <img
        className="wordtest__image"
        src={`https://react-learnwords-rslang.herokuapp.com/${word.image}`}
        alt={`word_image.jpg`}
      />
      <h1 className="wordtest__word" hidden={/*wordCntx.hide ||*/ wordCntx.learnd}>
        {word.word}
      </h1>
      <div className="wordtest__translate">{word.wordTranslate}</div>
      <div className="wordtest__transcript" hidden={wordCntx.learnd}>
        {word.transcription}
      </div>
      <div className="wordtest__meaning" dangerouslySetInnerHTML={{ __html: word.textMeaning }} hidden={wordCntx.learnd} />
      {/* <button>Play</button> */}
      <input
        onKeyDown={(event) => (event.key === "Enter" ? clickHandler.bind(this) : null)}
        onChange={(event) => wordCntx.setAnswer(event.target.value)}
        value={wordCntx.answer}
      ></input>
      <button onClick={clickHandler}>v</button>
      <button onClick={() => wordCntx.setAnswer("")}>x</button>

      {/* <div className="word__meaning-transl">{word.textMeaningTranslate}</div> */}
      <div className="wordtest__example" dangerouslySetInnerHTML={{ __html: word.textExample }} hidden={wordCntx.learnd} />
      <div className="wordtest__meaning-transl" hidden={!wordCntx.learnd}>
        {testExample}
      </div>
      <button>Play</button>
      {/* <div className="word__example-transl">{word.textExampleTranslate}</div> */}
      <button onClick={wordCntx.difHndlr.bind(this, word)}>Difficult word</button>
      {/* <button>Delete word</button> */}
      {/* <div className="word__counter">Counter of </div> */}
    </div>
  );
}
