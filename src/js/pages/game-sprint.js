import { useEffect, useState } from "react";
import Timer from "../componets/timer";
import { useWordContext } from "../context/WordContext";
import "../../styles/pages/sprint.scss";
import Gameover from "../blocks/gameover";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// const group = Array.from({ length: 6 }, (x, i) => i);
const page = Array.from({ length: 30 }, (x, i) => i);
// const request = Array.from({ length: 4 }, (x, i) => [group[Math.floor(Math.random() * 5)], page[Math.floor(Math.random() * 30)]]);

function pagesHandler(currentGroup, currentPage) {
  let array = [];
  if (currentPage < 3) {
    for (let i = 0; array.length < 4; i++) {
      array.push([currentGroup, currentPage + i]);
    }
  } else {
    if (currentPage > 28) {
      for (let i = 0; array.length < 4; i++) {
        array.push([currentGroup, currentPage - i]);
      }
    } else {
      for (let i = -2; array.length < 4; i++) {
        array.push([currentGroup, currentPage + i]);
      }
    }
  }
  return array;
}

export default function Sprint() {
  const wordCntx = useWordContext();
  const [words, setWords] = useState([]);
  const [load, setLoad] = useState(false);
  const [correctAns, setCorrectAns] = useState(null);
  const [hidestart, setHidestart] = useState(false);
  const [score, setScore] = useState(0);
  const [quest, setQuest] = useState("word");
  const [questAns, setQuestAns] = useState("word");
  const [ans, setAns] = useState(["word1", "word2", "word3", "word4"]);

  const [mult, setMult] = useState(1);

  const request = pagesHandler(parseInt(wordCntx.groupnum), parseInt(wordCntx.pagenum));
  let array = [];

  useEffect(() => {
    console.log(request);
    request.map((elem) => {
      fetch(`https://react-learnwords-rslang.herokuapp.com/words?group=${elem[0]}&page=${elem[1]}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          array = array.concat(data);
          data && setWords(array);
          setLoad(true);
        })
        .catch((error) => console.error("country countries loader", error));
    });
    wordCntx.setStart(false);
    wordCntx.setTimerOut(false);
  }, []);

  function randomWords() {
    let numarr = [];
    for (let i = 0; numarr.length < 4; i++) {
      let num = Math.floor(Math.random() * 80);
      if (!numarr.includes(num)) {
        numarr.push(num);
      }
    }

    let qWord = words[numarr[0]];
    let mword1 = words[numarr[1]].wordTranslate;
    let mword2 = words[numarr[2]].wordTranslate;
    let mword3 = words[numarr[3]].wordTranslate;
    setQuest(qWord.word);
    setQuestAns(qWord.wordTranslate);
    setAns([qWord.wordTranslate, mword1, mword2, mword3].sort(() => Math.random() - 0.5));
  }

  function startHandler() {
    setHidestart(true);
    randomWords();
    wordCntx.setStart(true);
  }

  function ansHandler(word) {
    if (word === questAns) {
      setScore(score + mult);

      setCorrectAns("correct");
      setTimeout(() => {
        if (mult !== 3) {
          setMult(mult + 1);
        }
        randomWords();
        setCorrectAns(null);
      }, 1000);
    } else {
      setCorrectAns("wrong");

      setTimeout(() => {
        setMult(1);
        randomWords();
        setCorrectAns(null);
      }, 1000);
    }
  }

  if (load) {
    // console.log(wordCntx.groupnum, typeof wordCntx.groupnum);
    return (
      <div className="savanna">
        <div className="statistic" style={{ display: `${wordCntx.timerOut ? "flex" : "none"}` }}>
          <Gameover />
        </div>
        <div hidden={hidestart}>
          <div className="sprint__intro">
            <h1>СПРИНТ</h1>
            <div>Суть игры в том чтобы за минуту правильно перевести как можно большее количество слов</div>
          </div>
          <RadioGroup
            row
            aria-label="gender"
            name="gender1"
            value={wordCntx.groupnum}
            onChange={(event) => wordCntx.setGroupnum(parseInt(event.target.value))}
            className="sprint__groups"
          >
            <FormControlLabel value={0} control={<Radio />} label="Группа 1" />
            <FormControlLabel value={1} control={<Radio />} label="Группа 2" />
            <FormControlLabel value={2} control={<Radio />} label="Группа 3" />
            <FormControlLabel value={3} control={<Radio />} label="Группа 4" />
            <FormControlLabel value={4} control={<Radio />} label="Группа 5" />
            <FormControlLabel value={5} control={<Radio />} label="Группа 6" />
          </RadioGroup>
          <button className="registration__button-submit" onClick={startHandler}>
            Начать
          </button>
        </div>

        <div hidden={!hidestart}>
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
                  <button className="registration__button-submit" onClick={ansHandler.bind(this, elem)}>
                    {elem}
                  </button>
                );
              })}
            </div>
            <div className="sprint__score">{`Score: ${score}`}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="savanna">Loading....</div>;
  }
}
