import React, { useEffect, useState } from "react";
import useHttp from "../hooks/http.hook";
import EnglishForKids from "../blocks/englishforkids-block";

export default () => {
  const [fullData, setFullData] = useState(null);
  const { loading, error, request } = useHttp();
  const group = 1;
  const page = 1;
  const wordsHandler = async () => {
    try {
      const data = await request(
        `https://react-learnwords-rslang.herokuapp.com/words?group=${group}&page=${page}`,
        "GET",
        null,
        { accept: "application/json" }
      );
      const randomWords = data.slice().sort(() => Math.random() - 0.5);
      //const randomGuesses = data.slice().sort(() => Math.random() - 0.5);
      setFullData({ data: randomWords });
      console.log(data);
      console.log(randomWords);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="audioChallenge">
      {!fullData && (
        <button className="registration__button-submit" onClick={wordsHandler}>
          начать
        </button>
      )}
      {fullData && <EnglishForKids data={fullData}></EnglishForKids>}
    </div>
  );
};
