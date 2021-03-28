import { Pagination, PaginationItem } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { MemoryRouter, Route, useParams } from "react-router";
import { Link } from "react-router-dom";
import Wordunit from "../componets/wordlistunit";
import { useWordContext } from "../context/WordContext";

import "../../styles/pages/wordlist.scss";
export default function Wordlist() {
  const [words, setWords] = useState([]);
  const [load, setLoad] = useState(false);
  const { group } = useParams();
  const { page } = useParams();
  const wordCntx = useWordContext();

  useEffect(() => {
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
  }, [group, page]);

  const paginationHandler = (event, value) => {};

  return (
    <div className="wordlist__container">
      <div className="wordlist__groups">
        {Array.from({ length: 6 }, (x, i) => i + 1).map((elem) => {
          return (
            <Link to={`/wordlist/${elem}/1`}>
              <div>{`Group ${elem}`}</div>
            </Link>
          );
        })}
      </div>
      <div>
        {words.map((elem) => {
          return <Wordunit word={elem} />;
        })}
      </div>

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
