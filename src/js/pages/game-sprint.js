import { useEffect, useState } from "react";
import Timer from "../componets/timer";
import { useWordContext } from "../context/WordContext";

//https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/ - таймер с анимацией

export default function Sprint() {
  const wordCntx = useWordContext();
  const [words, setWords] = useState([]);
  const [load, setLoad] = useState(false);
  const [hidestart, setHidestart] = useState(false);
  const [score, setScore] = useState(0);
  const [quest, setQuest] = useState("word");
  const [questAns, setQuestAns] = useState("word");
  const [ans, setAns] = useState(["word1", "word2", "word3", "word4"]);
  const group = Array.from({ length: 6 }, (x, i) => i);
  const page = Array.from({ length: 30 }, (x, i) => i);
  const request = Array.from({ length: 4 }, (x, i) => [
    group[Math.floor(Math.random() * 5)],
    page[Math.floor(Math.random() * 30)],
  ]);
  let array = [];

  useEffect(() => {
    request.map((elem) => {
      fetch(
        `https://react-learnwords-rslang.herokuapp.com/words?group=${elem[0]}&page=${elem[1]}`
      )
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
    setAns(
      [qWord.wordTranslate, mword1, mword2, mword3].sort(
        () => Math.random() - 0.5
      )
    );
    // quest = qWord.word;
    // ans = [qWord.wordTranslate, mword1, mword2, mword3];
  }

  function startHandler() {
    setHidestart(true);
    randomWords();
    wordCntx.setStart(true);
  }

  function ansHandler(word) {
    if (word === questAns) {
      setScore(score + 1);
      randomWords();
    } else {
      randomWords();
    }
  }

  if (load) {
    return (
      <div className="sprint-container">
        <div hidden={hidestart}>
          <div>START THE GAME</div>
          <button onClick={startHandler}>Start</button>
        </div>

        <div hidden={!hidestart}>
          {/* <button onClick={randomWords}>Clkic</button> */}
          <Timer />
          <div>{quest}</div>
          <div>
            {ans.map((elem) => {
              return (
                <button onClick={ansHandler.bind(this, elem)}>{elem}</button>
              );
            })}
          </div>
          <div>{`Score: ${score}`}</div>
        </div>
      </div>
    );
    // }
  } else {
    return <div>Loading....</div>;
  }
}
