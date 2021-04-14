import { useEffect, useState } from "react";
import { useWordContext } from "../context/WordContext";
import "../../styles/components/wordcard.scss";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useParams } from "react-router";

export default function Word({ word, delHndlr, delDif }) {
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
    if (type !== "difficult") {
      if (diffword) {
        wordCntx.removeDifHndlr(word);
        setDWordsId(JSON.parse(localStorage.getItem("difWordId")));
      } else {
        wordCntx.difHndlr(word);
        setDWordsId(JSON.parse(localStorage.getItem("difWordId")));
      }
    } else {
      wordCntx.removeDifHndlr(word);
      delDif(word);
      setDWordsId(JSON.parse(localStorage.getItem("difWordId")));
    }
  }

  return (
    <div className="word__container">
      <div className="word__content">
        <div className="word__word">
          <h1>{word.word}</h1>
          <VolumeUpIcon
            className="word__icon"
            onClick={wordCntx.soundHandler.bind(this, word.audio)}
            title="Прослушать произношение"
          />
        </div>
        {wordCntx.showWordTransl ? <div className="word__translate">Перевод: {word.wordTranslate}</div> : null}
        <div className="word__transcript">Транскрипция: {word.transcription}</div>
        <div className="word__meaning_container">
          <h3>Значение слова</h3>
          <div className="word__meaning">
            <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
            <VolumeUpIcon
              className="word__icon"
              onClick={wordCntx.soundHandler.bind(this, word.audioMeaning)}
              title="Прослушать произношение"
            />
          </div>
          {wordCntx.showExtraTransl ? <div className="word__meaning-transl">{word.textMeaningTranslate}</div> : null}
        </div>
        <div className="word__example_container">
          <h3>Пример слова в предложении</h3>
          <div className="word__example">
            <div dangerouslySetInnerHTML={{ __html: word.textExample }} />
            <VolumeUpIcon
              className="word__icon"
              onClick={wordCntx.soundHandler.bind(this, word.audioExample)}
              title="Прослушать произношение"
            />
          </div>
          {wordCntx.showExtraTransl ? <div className="word__example-transl">{word.textExampleTranslate}</div> : null}
        </div>
      </div>
      <div className="word__buttons">
        {wordCntx.showDifButton ? (
          <button className="registration__button-submit" onClick={clickHandler}>
            {diffword ? "Убрать из сложных" : "Сложное слово"}
          </button>
        ) : null}
        {wordCntx.showDelButton ? (
          <button className="registration__button-submit" onClick={delHndlr.bind(this, word)}>
            {type === "deleted" ? "Убрать из удаленных" : "Удалить слово"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
