import "../../styles/pages/vocabulary.scss";
import { Link, useParams } from "react-router-dom";
import Word from "../componets/wordcard";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Vocabulary() {
  const { type } = useParams();
  const [wordsarray, setWordsarray] = useState([]);
  const [wordsarrayid, setWordsarrayid] = useState([]);

  useEffect(() => {
    console.log(type);
    setWordsarray([]);
    if (type === "difficult") {
      if ("difWord" in localStorage) {
        setWordsarray(JSON.parse(localStorage.getItem("difWord")));
        setWordsarrayid(JSON.parse(localStorage.getItem("difWordId")));
      }
    }
    if (type === "learned") {
      if ("correctword" in localStorage) {
        setWordsarray(JSON.parse(localStorage.getItem("correctword")));
        setWordsarrayid(JSON.parse(localStorage.getItem("correctwordid")));
      }
    }
    if (type === "deleted") {
      if ("deleteword" in localStorage) {
        setWordsarray(JSON.parse(localStorage.getItem("deleteword")));
        setWordsarrayid(JSON.parse(localStorage.getItem("deletewordid")));
      }
    }
    console.log(wordsarray);
  }, [type, wordsarray]);

  return (
    <MainLayout>
      <div className="vocabulary__container">
        <div className="vocabulary__title">
          Это ваш словарь. Тут вы можете увидеть какие слова вы выучили или же
          какие для вас сложные
        </div>
        <div className="vocabulary__buttons">
          <Link to={"/vocabulary/learned"}>
            <div>LEARNED</div>
          </Link>
          <Link to={"/vocabulary/difficult"}>
            <div>DIFFICULT</div>
          </Link>
          <Link to={"/vocabulary/deleted"}>
            <div>DELETED</div>
          </Link>
        </div>
        <div className="vocabulary__content">
          {wordsarray.map((elem, index) => {
            return <Word word={elem} key={index} />;
          })}
        </div>
      </div>
    </MainLayout>
  );
}
