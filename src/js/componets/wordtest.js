import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import "../../styles/components/wordtest.scss";
import { useWordContext } from "../context/WordContext";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Input from "@material-ui/core/Input";

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
      // alert("correct"); //заменить на отметку о правильности
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
      <div className="wordtest__content">
        <div className="wordtest__word" style={{ display: `${wordCntx.learnd ? "none" : "flex"}` }}>
          <h1>{word.word}</h1>
          <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audio)} title="Прослушать произношение" />
        </div>

        <h1 className="wordtest__translate" hidden={!wordCntx.learnd}>
          {word.wordTranslate.toUpperCase()}
        </h1>
        <div className="wordtest__translate" hidden={wordCntx.learnd}>
          Перевод: {word.wordTranslate}
        </div>
        <div className="wordtest__transcript" hidden={wordCntx.learnd}>
          Транскрипция: {word.transcription}
        </div>
        <br />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            clickHandler();
          }}
          style={{ display: `${wordCntx.learnd ? "flex" : "none"}` }}
        >
          <Input
            id="standard-basic"
            type="text"
            label="Введите слово"
            onKeyPress={(event) => (event.key === "Enter" ? clickHandler.bind(this) : null)}
            onChange={(event) => wordCntx.setAnswer(event.target.value)}
            value={wordCntx.answer}
            style={{ width: 300 }}
          />
          <div className="wordtest__agree" onClick={clickHandler}>
            <CheckIcon />
          </div>
          <div className="wordtest__clean" onClick={() => wordCntx.setAnswer("")}>
            <ClearIcon />
          </div>
        </form>
        <br style={{ display: `${wordCntx.learnd ? "flex" : "none"}` }} />
        <div className="wordtest__meaning" style={{ display: `${wordCntx.learnd ? "none" : "flex"}` }}>
          <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
          <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audioMeaning)} title="Прослушать произношение" />
        </div>
        <div className="word__meaning-transl" style={{ display: `${wordCntx.learnd ? "none" : "flex"}` }}>
          {word.textMeaningTranslate}{" "}
        </div>
        <br />
        <div className="wordtest__example" style={{ display: `${wordCntx.learnd ? "none" : "flex"}` }}>
          <div dangerouslySetInnerHTML={{ __html: word.textExample }} />
          <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audioExample)} title="Прослушать произношение" />
        </div>

        <div className="wordtest__meaning-transl" hidden={!wordCntx.learnd}>
          {testExample}
        </div>
        <div className="word__example-transl">{word.textExampleTranslate}</div>
      </div>
      <div className="wordtest__buttons">
        <button onClick={wordCntx.difHndlr.bind(this, word)}>Сложное слово</button>
      </div>
    </div>
  );
}
