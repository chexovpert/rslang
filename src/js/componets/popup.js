import { useWordContext } from "../context/WordContext";
import "../../styles/components/popup.scss";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useEffect, useState } from "react";

export default function Popup({ word, setShow }) {
  const wordCntx = useWordContext();
  const [dWordsId, setDWordsId] = useState([]);

  useEffect(() => {
    if ("difWordId" in localStorage) {
      setDWordsId(JSON.parse(localStorage.getItem("difWordId")));
    }
  }, [word]);

  return (
    <div className="popup__container" onMouseDown={setShow}>
      <div
        className="popup__content"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="popup__head">
          <img
            className="popup__image"
            src={`https://react-learnwords-rslang.herokuapp.com/${word.image}`}
            alt={"word_image.jpg"}
          />
          <div className="popup__title">
            <div className="popup__word">
              <h1>{word.word}</h1>
              <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audio)} title="Прослушать произношение" />
            </div>
            <div className="popup__translate">Перевод: {word.wordTranslate}</div>
            <div className="popup__transcript">Транскрипция: {word.transcription}</div>
            {wordCntx.showWordTransl ? <div className="popup__translate">Перевод: {word.wordTranslate}</div> : null}
            <div className="popup__transcript">Транскрипция: {word.transcription}</div>
          </div>
        </div>

        <div className="popup__meaning_container">
          <h3>Значение слова</h3>
          <div className="popup__meaning">
            <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
            <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audioMeaning)} title="Прослушать произношение" />
          </div>
          <div className="popup__meaning-transl">{word.textMeaningTranslate}</div>
          {wordCntx.showExtraTransl ? <div className="popup__meaning-transl">{word.textMeaningTranslate}</div> : null}
        </div>
        <div className="popup__example_container">
          <h3>Пример слова в предложении</h3>
          <div className="popup__example">
            <div dangerouslySetInnerHTML={{ __html: word.textExample }} />
            <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audioExample)} title="Прослушать произношение" />
          </div>
          <div className="popup__example-transl">{word.textExampleTranslate}</div>
          {wordCntx.showExtraTransl ? <div className="popup__example-transl">{word.textExampleTranslate}</div> : null}
        </div>
      </div>
    </div>
  );
}
