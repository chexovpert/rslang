import "../../styles/components/wordlistunit.scss";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useWordContext } from "../context/WordContext";

export default function Wordunit({ word }) {
  const wordCntx = useWordContext();
  return (
    <div className="wordunit__container">
      <img src={`https://react-learnwords-rslang.herokuapp.com/${word.image}`} alt={"word_image.jpg"} />
      <div>
        <div className="wordunit__word">
          <div>{word.word.toUpperCase()}</div>
          <VolumeUpIcon onClick={wordCntx.soundHandler.bind(this, word.audio)} title="Прослушать произношение" />
        </div>
        <div>{word.wordTranslate}</div>
        <div>{word.transcription}</div>
      </div>
    </div>
  );
}
