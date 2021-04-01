import { useEffect } from "react";
import { useWordContext } from "../context/WordContext";
import "../../styles/components/wordcard.scss";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useParams } from "react-router";

export default function Word({ word }) {
  const zaword = word;
  const wordCntx = useWordContext();
  const { type } = useParams();

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
          <div className="word__example-transl">{zaword.textExampleTranslate}</div>
        </div>
      </div>
      {/* <img className="word__image" src={`https://react-learnwords-rslang.herokuapp.com/${word.image}`} alt={`word_image.jpg`} /> */}
      <div className="word__buttons">
        {type === "difficult" ? (
          <button onClick={wordCntx.removeDifHndlr.bind(this, word)}>Убрать из сложных</button>
        ) : (
          <button onClick={wordCntx.difHndlr.bind(this, word)}>Сложное слово</button>
        )}
        {type === "deleted" ? (
          <button onClick={wordCntx.removeDeleteHndlr.bind(this, word)}>Убрать из удаленных</button>
        ) : (
          <button onClick={wordCntx.deleteHndlr.bind(this, word)}>Удалить слово</button>
        )}
      </div>
    </div>
  );
}
