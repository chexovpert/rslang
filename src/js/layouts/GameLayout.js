import React, { useEffect, useState } from "react";
import useHttp from "../hooks/http.hook";
import HeaderAuthorized from "../blocks/header-autorized";
//import EnglishForKids from "../blocks/englishforkids-block";
import Burger from "../blocks/burger";

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
    if (props.type === "sprint") {
      const rqst = pagesHandler(group, page);
      let wordsarr = [];
      try {
        let rq = await Promise.all(
          rqst.map(async (elem) => {
            const data = await request(
              `https://react-learnwords-rslang.herokuapp.com/words?group=${elem[0]}&page=${elem[1]}`,
              "GET",
              null,
              { accept: "application/json" }
            );
            wordsarr = wordsarr.concat(data);
          })
        );
        setFullData(wordsarr.sort(() => Math.random() - 0.5));
      } catch (e) {
        console.log(e);
      }
    } else {
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
        //console.log(data);
        //console.log(randomWords);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="app-wrapper">
      <div className="content-wrapper">
        {/* <HeaderAuthorized /> */}

        <div className="gameLayout" style={{ backgroundImage: `url(${props.gameBackground})` }}>
          <div
            style={{
              position: "absolute",
              top: "2%",
              //left: "0%",
              right: "0%",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            <Burger></Burger>
          </div>
          {!fullData && !loading && !props.match.params.group && !props.match.params.page && (
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
          {!fullData && !loading && props.match.params.group && props.match.params.page && (
            <div>
              <h1 className="gameLayout-h1">{props.text}</h1>
              <button
                className="gameLayout-button"
                disabled={loading}
                onClick={() => wordsHandler(props.match.params.group, props.match.params.page)}
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
