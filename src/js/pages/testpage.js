import { useEffect, useState } from "react";
import "../../styles/pages/testpage.scss";
import WordTest from "../componets/wordtest";
import { useWordContext } from "../context/WordContext";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Complete from "../componets/taskcompl";
import MainLayout from "../layouts/MainLayout";

export default function TestingPage() {
  const [words, setWords] = useState([]);
  const [load, setLoad] = useState(false);
  const [compl, setCompl] = useState(false);
  const wordCntx = useWordContext();
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    wordCntx.setCount(0);
    wordCntx.pageHandler();
    setCompl(false);
    fetch(`https://react-learnwords-rslang.herokuapp.com/words?group=${wordCntx.groupnum}&page=${wordCntx.pagenum}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        data && setWords(data);
        setLoad(true);
      })
      .catch((error) => console.error("country countries loader", error));
  }, [wordCntx.pagenum]);

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
    if ("correctwordid" in localStorage) {
      setLearned(JSON.parse(localStorage.getItem("correctwordid")));
    }
    let buff = words.every((elem) => {
      return learned.includes(elem.id);
    });
    if (buff) {
      wordCntx.progressHandler();
      setCompl(buff);
    }
  }

  if (load) {
    return (
      <MainLayout>
        <div className="testpage__cont">
          <div className="testpage__container">
            {compl ? <Complete /> : null}
            <div className="testpage__arrow" onClick={clickPrevHandler}>
              <ArrowBackIosIcon fontSize="large" />
            </div>
            <div className="testpage__word">{<WordTest word={words[wordCntx.count]} next={clickNextHandler} />}</div>
            <div className="testpage__arrow" onClick={clickNextHandler}>
              <ArrowForwardIosIcon fontSize="large" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  } else {
    return (
      <MainLayout>
        <div className="testpage__cont">
          <div className="testpage__load">
            <div id="fountainG">
              <div id="fountainG_1" class="fountainG"></div>
              <div id="fountainG_2" class="fountainG"></div>
              <div id="fountainG_3" class="fountainG"></div>
              <div id="fountainG_4" class="fountainG"></div>
              <div id="fountainG_5" class="fountainG"></div>
              <div id="fountainG_6" class="fountainG"></div>
              <div id="fountainG_7" class="fountainG"></div>
              <div id="fountainG_8" class="fountainG"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}
