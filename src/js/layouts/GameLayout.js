import React, { useEffect, useState } from "react";
import useHttp from "../hooks/http.hook";
//import EnglishForKids from "../blocks/englishforkids-block";

import CircularProgress from "@material-ui/core/CircularProgress";

export default (props) => {
  const [fullData, setFullData] = useState(null);
  const { loading, error, request } = useHttp();

  const buttons = [
    {
      text: "Очень легко",
      group: "0",
    },
    {
      text: "Легко",
      group: "1",
    },
    {
      text: "Средне",
      group: "2",
    },
    {
      text: "Выше среднего",
      group: "3",
    },
    {
      text: "Сложно",
      group: "4",
    },
    {
      text: "Очень сложно",
      group: "5",
    },
  ];

  const wordsHandler = async (group, page = 0) => {
    try {
      const data = await request(
        `https://react-learnwords-rslang.herokuapp.com/words?group=${group}&page=${page}`,
        "GET",
        null,
        { accept: "application/json" }
      );
      const randomWords = data.slice().sort(() => Math.random() - 0.5);
      randomWords.map((elem) => (elem.checked = true));
      //const randomGuesses = data.slice().sort(() => Math.random() - 0.5);
      setFullData({ data: randomWords });
      console.log(data);
      console.log(randomWords);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="content-wrapper">
        <div
          className="gameLayout"
          style={{ backgroundImage: `url(${props.gameBackground})` }}
        >
          {!fullData &&
            !loading &&
            !props.match.params.group &&
            !props.match.params.page && (
              <div>
                <h1 className="gameLayout-h1">{props.text}</h1>
                {buttons.map((elem) => (
                  <button
                    className="gameLayout-button"
                    disabled={loading}
                    onClick={() => wordsHandler(elem.group)}
                    //value={elem.group}
                  >
                    {elem.text}
                  </button>
                ))}
              </div>
            )}
          {!fullData &&
            !loading &&
            props.match.params.group &&
            props.match.params.page && (
              <div>
                <h1 className="gameLayout-h1">{props.text}</h1>
                <button
                  className="gameLayout-button"
                  disabled={loading}
                  onClick={() =>
                    wordsHandler(
                      props.match.params.group,
                      props.match.params.page
                    )
                  }
                  //value={elem.group}
                >
                  Начать игру
                </button>
              </div>
            )}
          {!fullData && loading && (
            <div>
              <CircularProgress></CircularProgress>
            </div>
          )}
          {fullData && !loading && props.children(fullData)}
        </div>
      </div>
    </div>
  );
};
