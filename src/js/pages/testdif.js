import { useEffect, useState } from "react";
import "../../styles/pages/testpage.scss";
import WordDifTest from "../componets/worddIftest";
import { useWordContext } from "../context/WordContext";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Complete from "../componets/taskcompl";

export default function TestingDifPage() {
  const [words, setWords] = useState([]);
  const [load, setLoad] = useState(false);
  const [compl, setCompl] = useState(false);
  const wordCntx = useWordContext();
  const [learned, setLearned] = useState([]);
  const [crct, setCrct] = useState([]);
  let dWordsId = [];

  let wordsarr = [];

  //   let correct = [];

  function createDifArray() {
    let arr = [];
    if ("difWordId" in localStorage) {
      dWordsId = JSON.parse(localStorage.getItem("difWordId"));
      for (let i = 0; arr.length < 20; i += 1) {
        let a = Math.floor(Math.random() * dWordsId.length);
        if (!arr.includes(dWordsId[a])) {
          arr.push(dWordsId[a]);
        }
      }
    }
    return arr;
  }

  useEffect(() => {
    let wrds = createDifArray();
    wordCntx.setCount(0);
    wordCntx.pageHandler();
    setCompl(false);
    wrds.map((elem) => {
      fetch(`https://react-learnwords-rslang.herokuapp.com/words/${elem}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          wordsarr = wordsarr.concat(data);
          data && setWords(wordsarr);
          setLoad(true);
        })
        .catch((error) => console.error("country countries loader", error));
    });
    setWords(wordsarr);
  }, []);

  function clickNextHandler() {
    learnComplited();
    wordCntx.setCount(wordCntx.count === 19 ? 0 : wordCntx.count + 1);
    wordCntx.setAnswer("");
    wordCntx.setLearnd(true);
    if (wordCntx.correct) {
      wordCntx.setCorrect(false);
      wordCntx.setHide(true);
    }
  }

  function clickPrevHandler() {
    learnComplited();
    wordCntx.setCount(wordCntx.count === 0 ? 19 : wordCntx.count - 1);
    wordCntx.setAnswer("");
    wordCntx.setLearnd(true);
  }

  function learnComplited() {
    setLearned(crct);
    setCompl(
      words.every((elem) => {
        return learned.includes(elem.id);
      })
    );
    if (compl) {
      wordCntx.progressHandler();
    }
  }

  if (load) {
    return (
      <div className="testpage__container">
        {compl ? <Complete /> : null}
        <div className="testpage__arrow" onClick={clickPrevHandler}>
          <ArrowBackIosIcon fontSize="large" />
        </div>
        <div className="testpage__word">{<WordDifTest word={words[wordCntx.count]} crct={crct} setCrct={setCrct} />}</div>
        <div className="testpage__arrow" onClick={clickNextHandler}>
          <ArrowForwardIosIcon fontSize="large" />
        </div>
      </div>
    );
  } else {
    return <div>LOADING...</div>;
  }
}
