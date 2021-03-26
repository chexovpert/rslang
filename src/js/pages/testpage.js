import { useEffect, useState } from "react";
import Word from "./wordcard";

export default function TestingPage() {
  const [words, setWords] = useState([]);
  const [load, setLoad] = useState(false);
  const [count, setCount] = useState(0);
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
  console.log(count);
  if (load) {
    return (
      <div className="testpage">
        <div>{<Word word={words[count]} />}</div>
        <button onClick={() => setCount(count === 19 ? count - 1 : count + 1)}>Next</button>
      </div>
    );
  } else {
    return <div>LOADING...</div>;
  }
}
