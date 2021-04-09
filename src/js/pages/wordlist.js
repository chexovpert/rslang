import { Pagination, PaginationItem } from "@material-ui/lab";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Wordunit from "../componets/wordlistunit";

import "../../styles/pages/wordlist.scss";
import { useWordContext } from "../context/WordContext";
export default function Wordlist() {
  const [words, setWords] = useState([]);
  const [load, setLoad] = useState(false);
  const [dltWordsId, setDltWordsId] = useState([]);
  const { group } = useParams();
  const { page } = useParams();
  const wordCntx = useWordContext();

  useEffect(() => {
    setLoad(false);
    wordCntx.setPagenum(page);
    wordCntx.setGroupnum(group);
    fetch(`https://react-learnwords-rslang.herokuapp.com/words?group=${group - 1}&page=${page - 1}`)
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
    if ("deletewordid" in localStorage) {
      setDltWordsId(JSON.parse(localStorage.getItem("deletewordid")));
    }
  }, [group, page]);

  const delHandler = useCallback(() => {
    if ("deletewordid" in localStorage) {
      setDltWordsId(JSON.parse(localStorage.getItem("deletewordid")));
    }
  }, [dltWordsId]);

  return (
    <div className="wordlist__container">
      <div className="wordlist__groups">
        {Array.from({ length: 6 }, (x, i) => i + 1).map((elem) => {
          return (
            <Link to={`/wordlist/${elem}/${page}`}>
              <div className={parseInt(group) === elem ? "wordlist__active" : null}>{`Group ${elem}`}</div>
            </Link>
          );
        })}
      </div>
      {load ? (
        <div className="wordlist__content">
          {words.map((elem) => {
            if (!dltWordsId.includes(elem.id)) {
              return <Wordunit word={elem} delHndlr={delHandler} />;
            }
          })}
        </div>
      ) : (
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
      )}

      <Pagination
        className="wordlist__pagination"
        count={30}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem component={Link} to={`/wordlist/${group}/${item.page === 1 ? "1" : `${item.page}`}`} {...item} />
        )}
      />
    </div>
  );
}
