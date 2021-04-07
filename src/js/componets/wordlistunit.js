import "../../styles/components/wordlistunit.scss";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useWordContext } from "../context/WordContext";
import { useEffect, useState } from "react";

export default function Wordunit({ word, delHndlr }) {
  const wordCntx = useWordContext();
  const [dWordsId, setDWordsId] = useState([]);
  const [diffword, setDiffword] = useState(false);

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
    wordCntx.deleteHndlr(word);
    delHndlr();
  }

  return (
    <div className={`wordunit__container ${diffword ? "diffword" : null}`}>
      <img src={`https://react-learnwords-rslang.herokuapp.com/${word.image}`} alt={"word_image.jpg"} />
      <div className="wordunit__content">
        <div className="wordunit__word">
          <div>{word.word.toUpperCase()}</div>
          <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audio)} title="Прослушать произношение" />
        </div>
        <div>{word.wordTranslate}</div>
        <div>{word.transcription}</div>
      </div>
      <div className="wordunit__buttons">
        <button className="wordunit__button-submit" onClick={clickHandler}>
          {diffword ? "Убрать из сложных" : "Сложное слово"}
        </button>
        <button className="wordunit__button-submit" onClick={delClickHndlr}>
          Удалить слово
        </button>
      </div>
    </div>
  );
}
