import { useEffect, useState } from "react";
import "../../styles/pages/testpage.scss";
import WordTest from "../componets/wordtest";
import { useWordContext } from "../context/WordContext";

export default function TestingPage() {
  const [words, setWords] = useState([]);
  const [load, setLoad] = useState(false);
  const wordCntx = useWordContext();
  const group = 0;
  const page = 0;

  useEffect(() => {
    fetch(`https://react-learnwords-rslang.herokuapp.com/words?group=${group}&page=${page}`)
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
  }, []);

  function clickHandler() {
    console.log(wordCntx.count);

    wordCntx.setCount(wordCntx.count === 19 ? 19 : wordCntx.count + 1);
    wordCntx.setAnswer("");
    wordCntx.setLearnd(true);
    if (wordCntx.correct) {
      wordCntx.setCorrect(false);
      wordCntx.setHide(true);
    }
  }

  if (load) {
    return (
      <div className="testpage">
        <div>{<WordTest word={words[wordCntx.count]} />}</div>
        <div style={{ display: "flex" }}>
          <button onClick={() => wordCntx.setCount(wordCntx.count > 1 ? wordCntx.count - 1 : 0)}>Prev</button>
          <button onClick={clickHandler}>Next</button>
        </div>
      </div>
    );
  } else {
    return <div>LOADING...</div>;
  }
}
