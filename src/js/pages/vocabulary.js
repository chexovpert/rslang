import "../../styles/pages/vocabulary.scss";
import { Link, useParams } from "react-router-dom";
import Word from "../componets/wordcard";
import { useCallback, useEffect, useState } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { useWordContext } from "../context/WordContext";

export default function Vocabulary() {
  const { type } = useParams();
  const { group } = useParams();
  const { page } = useParams();
  const [wordsarray, setWordsarray] = useState([]);
  const [wordsarrayid, setWordsarrayid] = useState([]);
  const [load, setLoad] = useState(false);
  const [hide, setHide] = useState(false);
  const [test, setTest] = useState(true);
  const wordCntx = useWordContext();
  const [dltWordsId, setDltWordsId] = useState([]);

  useEffect(() => {
    fetch(`https://react-learnwords-rslang.herokuapp.com/words?group=${group - 1}&page=${page - 1}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        data && setWordsarray(data);
        setLoad(true);
        setHide(false);
      })
      .catch((error) => console.error("country countries loader", error));

    if (type === "difficult") {
      if ("difWord" in localStorage) {
        setWordsarrayid(JSON.parse(localStorage.getItem("difWordId")));
      }
    }
    if (type === "learned") {
      if ("correctword" in localStorage) {
        setWordsarrayid(JSON.parse(localStorage.getItem("correctwordid")));
      }
    }
    if (type === "deleted") {
      if ("deleteword" in localStorage) {
        setWordsarrayid(JSON.parse(localStorage.getItem("deletewordid")));
        setDltWordsId(JSON.parse(localStorage.getItem("deletewordid")));
      }
    }
  }, [type, group, page]);

  const delHandler = useCallback(
    (word) => {
      if ("deletewordid" in localStorage) {
        if (type !== "deleted") {
          setDltWordsId(JSON.parse(localStorage.getItem("deletewordid")));
        } else {
          console.log("restore");
          wordCntx.removeDeleteHndlr(word);
          setDltWordsId(JSON.parse(localStorage.getItem("deletewordid")));
        }
      }
    },
    [dltWordsId]
  );

  if (load) {
    return (
      <div className="vocabulary__container">
        {/* <div className="vocabulary__title">
        Это ваш словарь. Тут вы можете увидеть какие слова вы выучили или же какие для вас сложные
      </div> */}
        <div className="vocabulary__buttons">
          <Link to={"/vocabulary/learned/1/1"}>
            <div>Изученные слова</div>
          </Link>
          <Link to={"/vocabulary/difficult/1/1"}>
            <div>Сложные слова</div>
          </Link>
          <Link to={"/vocabulary/deleted/1/1"}>
            <div>Удаленные слова</div>
          </Link>
        </div>

        <div className="wordlist__groups">
          {Array.from({ length: 6 }, (x, i) => i + 1).map((elem) => {
            return (
              <Link to={`/vocabulary/${type}/${elem}/1`}>
                <div className={parseInt(group) === elem ? "wordlist__active" : null}>{`Group ${elem}`}</div>
              </Link>
            );
          })}
        </div>
        <div className="vocabulary__content">
          <div className="wordsmissing" hidden={hide}>
            В данном разделе слова отсутствуют по различным на то причинам
          </div>
          {/* {setHide(false)} */}
          {wordsarray.map((elem, index) => {
            if (wordsarrayid.includes(elem.id)) {
              if (hide === false) {
                setHide(true);
              }
              if (type !== "deleted") {
                if (!dltWordsId.includes(elem.id)) {
                  return <Word word={elem} key={index} delHndlr={delHandler} />;
                }
              } else {
                if (dltWordsId.includes(elem.id)) {
                  return <Word word={elem} key={index} delHndlr={delHandler} />;
                }
              }
            }
          })}
        </div>
        <Pagination
          className="wordlist__pagination"
          count={30}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/vocabulary/${type}/${group}/${item.page === 1 ? "1" : `${item.page}`}`}
              {...item}
            />
          )}
        />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
