export default function Wordunit({ word }) {
  return (
    <div className="wordunit__container">
      <div>{word.word}</div>
      <div>{word.wordTranslate}</div>
      <div>{word.transcription}</div>
      <br />
    </div>
  );
}
