import { useEffect, useState } from "react";

export default function Sprint() {
  const [words, setWords] = useState([]);
  const [load, setLoad] = useState(false);
  const group = Array.from({ length: 6 }, (x, i) => i);
  const page = Array.from({ length: 30 }, (x, i) => i);
  const request = Array.from({ length: 4 }, (x, i) => [
    group[Math.floor(Math.random() * 5)],
    page[Math.floor(Math.random() * 30)],
  ]);
  let array = [];

  useEffect(() => {
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
    let quest = qWord.word;
    let ans = [qWord.wordTranslate, mword1, mword2, mword3];
    console.log(quest);
  }

  if (load) {
    return (
      <div className="sprint-container">
        <div>Sprint</div>
        <button onClick={randomWords}>Clkic</button>
      </div>
    );
  } else {
    return <div>Loading....</div>;
  }
}
