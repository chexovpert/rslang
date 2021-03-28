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
      let crctword = [];
      let crctwordid = [];
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
    } else {
      alert("incorrect"); //заменить на отметку о неправильности
    }
  }

  function difHndlr() {
    let dWords = [];
    let dWordsId = [];
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

  return (
    <div className="word__container">
      <img className="word__image" src={word.image} alt={`word_image.jpg`} />
      <h1 className="word__word" hidden={/*wordCntx.hide ||*/ wordCntx.learnd}>
        {word.word}
      </h1>
      <div className="word__translate">{word.wordTranslate}</div>
      <div className="word__transcript" hidden={wordCntx.learnd}>
        {word.transcription}
      </div>
      <div className="word__meaning" dangerouslySetInnerHTML={{ __html: word.textMeaning }} hidden={wordCntx.learnd} />
      {/* <button>Play</button> */}
      <input
        onKeyDown={(event) => (event.key === "Enter" ? clickHandler.bind(this) : null)}
        onChange={(event) => wordCntx.setAnswer(event.target.value)}
        value={wordCntx.answer}
      ></input>
      <button onClick={clickHandler}>v</button>
      <button onClick={() => wordCntx.setAnswer("")}>x</button>

      {/* <div className="word__meaning-transl">{word.textMeaningTranslate}</div> */}
      <div className="word__example" dangerouslySetInnerHTML={{ __html: word.textExample }} hidden={wordCntx.learnd} />
      <div className="word__meaning-transl" hidden={!wordCntx.learnd}>
        {testExample}
      </div>
      <button>Play</button>
      {/* <div className="word__example-transl">{word.textExampleTranslate}</div> */}
      <button onClick={difHndlr}>Difficult word</button>
      {/* <button>Delete word</button> */}
      {/* <div className="word__counter">Counter of </div> */}
    </div>
  );
}
