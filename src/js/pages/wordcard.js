import { useEffect } from "react";
import words from "../componets/words.json";

export default function Word({ word }) {
  const zaword = word;
  // console.log(words[0]);
  // let a = words.filter((elem) => elem.page === 1 && elem.group === 0);
  // console.log(a);
  // useEffect(() => {}, []);

  return (
    <div className="word__container">
      <img className="word__image" src={zaword.image} alt={`${zaword.word} image`} />
      <h1 className="word__word">{zaword.word}</h1>
      <div className="word__translate">{zaword.wordTranslate}</div>
      <div className="word__transcript">{zaword.transcription}</div>
      <div className="word__meaning" dangerouslySetInnerHTML={{ __html: zaword.textMeaning }} />
      <button>Play</button>
      <div className="word__meaning-transl">{zaword.textMeaningTranslate}</div>
      <div className="word__example" dangerouslySetInnerHTML={{ __html: zaword.textExample }} />
      <button>Play</button>
      <div className="word__example-transl">{zaword.textExampleTranslate}</div>
      <button>Difficult word</button>
      <button>Delete word</button>
      <div className="word__counter">Counter of </div>
    </div>
  );
}
