import { useEffect, useState } from "react";
import "../../styles/components/wordtest.scss";
import { useWordContext } from "../context/WordContext";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Input from "@material-ui/core/Input";

export default function WordDifTest({ word, crct, setCrct }) {
  const wordCntx = useWordContext();
  const [dWordsId, setDWordsId] = useState([]);
  const [diffword, setDiffword] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [borderColor, setBorderColor] = useState("rgb(77, 77, 77)");

  useEffect(() => {
    wordCntx.setLearnd(true);
    if (crct.includes(word.id)) {
      wordCntx.setLearnd(false);
    }
    if ("difWordId" in localStorage) {
      setDWordsId(JSON.parse(localStorage.getItem("difWordId")));
    }
  }, [word]);

  useEffect(() => {
    setDiffword(false);
    if (dWordsId.includes(word.id)) {
      setDiffword(true);
    }
  }, [dWordsId]);

  function difClickHandler() {
    if (diffword) {
      wordCntx.removeDifHndlr(word);
      setDWordsId(JSON.parse(localStorage.getItem("difWordId")));
    } else {
      wordCntx.difHndlr(word);
      setDWordsId(JSON.parse(localStorage.getItem("difWordId")));
    }
  }

  let testExample = word.textExample
    .split(" ")
    .map((elem) => {
      return elem.includes("<b>") ? (elem = "________") : elem;
    })
    .join(" ");

  function clickHandler() {
    if (wordCntx.answer == word.word) {
      wordCntx.setLearnd(false);
      wordCntx.setCorrect(true);
      if (!crct.includes(word.id)) {
        let buff = crct.concat(word.id);
        setCrct(buff);
      }
      setWrong(false);
      setBorderColor("green");
      setTimeout(() => {
        setBorderColor("rgb(77, 77, 77)");
      }, 2000);
    } else {
      setWrong(true);
      setBorderColor("red");
      setTimeout(() => {
        setWrong(false);
        setBorderColor("rgb(77, 77, 77)");
      }, 2000);
    }
  }

  return (
    <div className="wordtest__cont">
      <div className="wordtest__container">
        <img
          className="wordtest__image"
          src={`https://react-learnwords-rslang.herokuapp.com/${word.image}`}
          alt={`word_image.jpg`}
          style={{ borderColor: borderColor }}
        />
        <div className="wordtest__content">
          <div className="wordtest__word" style={{ display: `${wordCntx.learnd ? "none" : "flex"}` }}>
            <h1>{word.word}</h1>
            <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audio)} title="Прослушать произношение" />
          </div>

          <h1 className="wordtest__translate" hidden={!wordCntx.learnd}>
            {word.wordTranslate.toUpperCase()}
          </h1>
          <div className="wordtest__translate" hidden={wordCntx.learnd || !wordCntx.showWordTransl}>
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
              style={{ width: 350 }}
              autoComplete="off"
              color={wrong ? "secondary" : "primary"}
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
          <div
            className="word__meaning-transl"
            style={{ display: `${wordCntx.learnd || !wordCntx.showExtraTransl ? "none" : "flex"}` }}
          >
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
          <div className="word__example-transl" hidden={!wordCntx.showExtraTransl}>
            {word.textExampleTranslate}
          </div>
        </div>
      </div>
      <div className="wordtest__buttons" hidden={!wordCntx.showDifButton}>
        <button onClick={difClickHandler}>{diffword ? "Убрать из сложных" : "Сложное слово"}</button>
        <button
          onClick={() => {
            alert(word.word);
          }}
        >
          Показать слово
        </button>
      </div>
    </div>
  );
}
