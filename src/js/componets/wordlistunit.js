import "../../styles/components/wordlistunit.scss";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useWordContext } from "../context/WordContext";
import { useCallback, useEffect, useState } from "react";
import Popup from "./popup";

export default function Wordunit({ word, delHndlr }) {
  const wordCntx = useWordContext();
  const [dWordsId, setDWordsId] = useState([]);
  const [diffword, setDiffword] = useState(false);
  const [show, setShow] = useState(false);

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
  }, [dWordsId, show]);

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

  const showPopup = useCallback((a) => {
    setShow(false);
  });

  return (
    <div className={`wordunit__container ${diffword ? "diffword" : null}`}>
      {show ? <Popup word={word} setShow={showPopup} /> : <div />}
      <img
        className="image"
        src={`https://react-learnwords-rslang.herokuapp.com/${word.image}`}
        alt={"word_image.jpg"}
        onClick={() => {
          setShow(true);
        }}
      />
      <div
        className="wordunit__content"
        onClick={() => {
          setShow(true);
        }}
      >
        <div className="wordunit__word">
          <div>{word.word.toUpperCase()}</div>
          <VolumeUpIcon
            title="Прослушать произношение"
            onClick={(event) => {
              wordCntx.soundHandler(word.audio);
              event.stopPropagation();
            }}
          />
        </div>
        {wordCntx.showWordTransl ? <div>{word.wordTranslate}</div> : null}
      </div>
      <div className="wordunit__buttons">
        {wordCntx.showDifButton ? (
          <button
            className="wordunit__button-submit"
            onClick={(event) => {
              event.stopPropagation();
              clickHandler();
            }}
          >
            {diffword ? "Убрать из сложных" : "Сложное слово"}
          </button>
        ) : null}
        {wordCntx.showDelButton ? (
          <button
            className="wordunit__button-submit"
            onClick={(event) => {
              event.stopPropagation();
              delClickHndlr();
            }}
          >
            Удалить слово
          </button>
        ) : null}
      </div>
    </div>
  );
}
