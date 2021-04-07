import { useEffect, useState } from "react";
import { useWordContext } from "../context/WordContext";
import "../../styles/components/wordcard.scss";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useParams } from "react-router";

export default function Word({ word, delHndlr }) {
  const wordCntx = useWordContext();
  const [dWordsId, setDWordsId] = useState([]);
  const [diffword, setDiffword] = useState(false);
  const { type } = useParams();

  useEffect(() => {
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

  function clickHandler() {
    if (diffword) {
      wordCntx.removeDifHndlr(word);
      setDWordsId(JSON.parse(localStorage.getItem("difWordId")));
    } else {
      wordCntx.difHndlr(word);
      setDWordsId(JSON.parse(localStorage.getItem("difWordId")));
    }
  }

  function delClickHndlr() {
    if (type !== "deleted") {
      wordCntx.deleteHndlr(word);
    }
    delHndlr(word);
  }

  return (
    <div className="word__container">
      <div className="word__content">
        <div className="word__word">
          <h1>{word.word}</h1>
          <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audio)} title="Прослушать произношение" />
        </div>
        <div className="word__translate">Перевод: {word.wordTranslate}</div>
        <div className="word__transcript">Транскрипция: {word.transcription}</div>
        <div className="word__meaning_container">
          <h3>Значение слова</h3>
          <div className="word__meaning">
            <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
            <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audioMeaning)} title="Прослушать произношение" />
          </div>
          <div className="word__meaning-transl">{word.textMeaningTranslate}</div>
        </div>
        <div className="word__example_container">
          <h3>Пример слова в предложении</h3>
          <div className="word__example">
            <div dangerouslySetInnerHTML={{ __html: word.textExample }} />
            <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audioExample)} title="Прослушать произношение" />
          </div>
          <div className="word__example-transl">{word.textExampleTranslate}</div>
        </div>
      </div>
      <div className="word__buttons">
        <button className="registration__button-submit" onClick={clickHandler}>
          {diffword ? "Убрать из сложных" : "Сложное слово"}
        </button>
        <button className="registration__button-submit" onClick={delClickHndlr}>
          {type === "deleted" ? "Убрать из удаленных" : "Удалить слово"}
        </button>
      </div>
    </div>
  );
}
