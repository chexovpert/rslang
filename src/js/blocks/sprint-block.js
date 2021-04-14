import { useEffect, useState } from "react";
import Timer from "../componets/timer";
import { useWordContext } from "../context/WordContext";
import "../../styles/pages/sprint.scss";
import Gameover from "../blocks/gameover";

export default function SprintBlock({ data }) {
  const wordCntx = useWordContext();
  const [correctAns, setCorrectAns] = useState(null);
  const [score, setScore] = useState(0);
  const [quest, setQuest] = useState("word");
  const [questAns, setQuestAns] = useState("word");
  const [ans, setAns] = useState(["word1", "word2", "word3", "word4"]);
  const [mult, setMult] = useState(1);
  const [correctWords] = useState([]);
  const [wrongWords] = useState([]);
  const [correctWordsLength, setCorrectWordsLength] = useState(correctWords.length);
  const [wrongWordsLength, setWrongWordsLength] = useState(wrongWords.length);
  const [dis, setDis] = useState(false);
  const [qWord, setQword] = useState(data[0]);

  //   let qWord;

  useEffect(() => {
    startHandler();
  }, []);

  function randomWords() {
    let numarr = [];
    let qarr = [];
    let check = [];

    while (qarr.length < 1) {
      let num = Math.floor(Math.random() * 80);
      if (!check.includes(num)) {
        qarr.push(num);
        check.push(num);
      }
    }
    for (let i = 0; numarr.length < 3; i++) {
      let num = Math.floor(Math.random() * 80);
      if (!numarr.includes(num) && !qarr.includes(num)) {
        numarr.push(num);
      }
    }
    setQword(data[qarr[0]]);
    let mword1 = data[numarr[0]].wordTranslate;
    let mword2 = data[numarr[1]].wordTranslate;
    let mword3 = data[numarr[2]].wordTranslate;
    setQuest(qWord.word);
    setQuestAns(qWord.wordTranslate);
    setAns([qWord.wordTranslate, mword1, mword2, mword3].sort(() => Math.random() - 0.5));
  }

  function startHandler() {
    randomWords();
    wordCntx.setStart(true);
  }

  function ansHandler(word) {
    setDis(true);
    if (word === questAns) {
      setScore(score + mult);
      correctWords.push(qWord);
      setCorrectWordsLength(correctWords.length);
      setCorrectAns("correct");
      setTimeout(() => {
        if (mult !== 3) {
          setMult(mult + 1);
        }
        randomWords();
        setCorrectAns(null);
        setDis(false);
      }, 1000);
    } else {
      setCorrectAns("wrong");
      wrongWords.push(qWord);
      setWrongWordsLength(wrongWords.length);
      setTimeout(() => {
        setMult(1);
        randomWords();
        setCorrectAns(null);
        setDis(false);
      }, 1000);
    }
  }
  return (
    <div className="savanna">
      <div className="statistic" style={{ display: `${wordCntx.timerOut ? "flex" : "none"}` }}>
        {wordCntx.timerOut ? <Gameover correct={correctWords} wrong={wrongWords} /> : null}
      </div>
      <div className="sprint__container">
        <div className="sprint__timer">
          <Timer />
        </div>
        <div className="sprint__mult">
          <div className="sprint__mult_orb" style={{ backgroundColor: `${mult >= 1 ? "green" : "gray"}  ` }}>
            x1
          </div>
          <div className="sprint__mult_orb" style={{ backgroundColor: `${mult >= 2 ? "green" : "gray"}  ` }}>
            x2
          </div>
          <div className="sprint__mult_orb" style={{ backgroundColor: `${mult >= 3 ? "green" : "gray"}  ` }}>
            x3
          </div>
        </div>
        <div className={`sprint__questword ${correctAns}`}>{quest.toUpperCase()}</div>
        <div className="sprint__buttons">
          {ans.map((elem) => {
            return (
              <button className="registration__button-submit" onClick={ansHandler.bind(this, elem)} disabled={dis}>
                {elem}
              </button>
            );
          })}
        </div>
        <div className="sprint__score">{`Score: ${score}`}</div>
      </div>
    </div>
  );
}
