import "../../styles/pages/vocabulary.scss";
import { Link, useParams } from "react-router-dom";
import Word from "../componets/wordcard";
import { useCallback, useEffect, useState } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { useWordContext } from "../context/WordContext";
import MainLayout from "../layouts/MainLayout";

export default function Vocabulary() {
  const { type } = useParams();
  const { group } = useParams();
  const { page } = useParams();
  const [wordsarray, setWordsarray] = useState([]);
  const [wordsarrayid, setWordsarrayid] = useState([]);
  const [load, setLoad] = useState(false);
  const [hide, setHide] = useState(false);
  const wordCntx = useWordContext();
  const [dltWordsId, setDltWordsId] = useState([]);
  const [difWordsId, setDifWordsId] = useState([]);

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
        setHide(false);
      })
      .catch((error) => console.error("country countries loader", error));

    if (type === "difficult") {
      if ("difWordId" in localStorage) {
        setWordsarrayid(JSON.parse(localStorage.getItem("difWordId")));
        setDifWordsId(JSON.parse(localStorage.getItem("difWordId")));
        setDltWordsId(JSON.parse(localStorage.getItem("deletewordid")));
      } else {
        setWordsarrayid([]);
      }
    }
    if (type === "learned") {
      if ("correctwordid" in localStorage) {
        setWordsarrayid(JSON.parse(localStorage.getItem("correctwordid")));
      } else {
        setWordsarrayid([]);
      }
      if ("difWordId" in localStorage) {
      } else {
        localStorage.setItem("difWordId", JSON.stringify([]));
      }
      if ("deletewordid" in localStorage) {
      } else {
        localStorage.setItem("deletewordid", JSON.stringify([]));
      }
    }
    if (type === "deleted") {
      if ("deletewordid" in localStorage) {
        setWordsarrayid(JSON.parse(localStorage.getItem("deletewordid")));
        setDltWordsId(JSON.parse(localStorage.getItem("deletewordid")));
        setDifWordsId(JSON.parse(localStorage.getItem("difWordId")));
      } else {
        setWordsarrayid([]);
      }
    }
    setLoad(true);
  }, [type, group, page]);

  const delDif = useCallback(
    (word) => {
      setDifWordsId(JSON.parse(localStorage.getItem("difWordId")));
    },
    [difWordsId]
  );

  const delHandler = useCallback(
    (word) => {
      if ("deletewordid" in localStorage) {
        if (type !== "deleted") {
          wordCntx.deleteHndlr(word);
          setDltWordsId(JSON.parse(localStorage.getItem("deletewordid")));
        } else {
          wordCntx.removeDeleteHndlr(word);
          setDltWordsId(JSON.parse(localStorage.getItem("deletewordid")));
        }
      }
    },
    [dltWordsId]
  );

  if (load) {
    return (
      <MainLayout>
        <div className="vocabulary__cont">
          <div className="vocabulary__container">
            <div className="vocabulary__groups">
              {Array.from({ length: 6 }, (x, i) => i + 1).map((elem) => {
                return (
                  <Link to={`/vocabulary/${type}/${elem}/${page}`}>
                    <div className={`${parseInt(group) === elem ? "wordlist__active" : null} group`}>{`Group ${elem}`}</div>
                  </Link>
                );
              })}
            </div>
            <div className="vocabulary__buttons">
              <Link to={"/vocabulary/learned/1/1"}>
                <div className={type === "learned" ? "activated" : null}>Изученные слова</div>
              </Link>
              <Link to={"/vocabulary/difficult/1/1"}>
                <div className={type === "difficult" ? "activated" : null}>Сложные слова</div>
              </Link>
              <Link to={"/vocabulary/deleted/1/1"}>
                <div className={type === "deleted" ? "activated" : null}>Удаленные слова</div>
              </Link>
            </div>

            <div className="vocabulary__content">
              <div className="wordsmissing" style={{ display: `${hide ? "none" : "flex"}` }}>
                В данном разделе слова отсутствуют по различным на то причинам
              </div>
              {/* {setHide(false)} */}
              {wordsarray.map((elem, index) => {
                if (wordsarrayid.includes(elem.id)) {
                  if (hide === false) {
                    setHide(true);
                  }
                  if (type === "deleted") {
                    if (dltWordsId.includes(elem.id)) {
                      return <Word word={elem} key={index} delHndlr={delHandler} />;
                    }
                  } else {
                    if (type === "difficult") {
                      if (difWordsId.includes(elem.id) && !dltWordsId.includes(elem.id)) {
                        return <Word word={elem} key={index} delHndlr={delHandler} delDif={delDif} />;
                      }
                    } else {
                      if (!dltWordsId.includes(elem.id)) {
                        return <Word word={elem} key={index} delHndlr={delHandler} delDif={delDif} />;
                      }
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
              size="small"
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/vocabulary/${type}/${group}/${item.page === 1 ? "1" : `${item.page}`}`}
                  {...item}
                />
              )}
            />
          </div>
        </div>
      </MainLayout>
    );
  } else {
    return <div>Loading...</div>;
  }
}
