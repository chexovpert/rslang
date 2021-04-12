import { LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/blocks/textbook.scss";
import MainLayout from "../layouts/MainLayout";

export default function TextBook() {
  const [value, setValue] = useState(10);
  const [pers, setPers] = useState(2);
  const [dif, setDif] = useState(true);
  useEffect(() => {
    if ("correctwordid" in localStorage) {
      setValue(JSON.parse(localStorage.getItem("correctwordid")));
      setPers(value.length / 36);
    } else {
      setValue(0);
    }
    setPers(value.length / 36);
    if ("difWordId" in localStorage) {
      let dWordsId = JSON.parse(localStorage.getItem("difWordId"));
      if (dWordsId.length < 20) {
        setDif(false);
      }
    }
  }, []);
  return (
    <MainLayout>
      <div className="textbook">
        <div className="textbook__logo">
          <h1>{`Учебник RSLang`}</h1>
          <p>{`Добро пожаловать на страницу учебника`}</p>
          <p>{`Здесь вы можете изучать новые слова или же повторить уже изученные или сложные слова`}</p>
        </div>

        <div className="textbook__learn">
          <Link to="/testing">
            <div className="textbook__cell">
              <h3 style={{ color: "rgb(165, 0, 0)" }}>MOST IMPOTANT</h3>
              <p>{"Изучить слова на сегодня"}</p>
            </div>
          </Link>
          <Link to={"/wordlist/1/1"}>
            <div className="textbook__cell">
              <h4 style={{ color: "green", textDecoration: "underline" }}>К сведению</h4>
              <p>{"Посмотреть весь список слов"}</p>
            </div>
          </Link>
          <Link to={dif ? "/testingdif" : null}>
            <div className="textbook__cell">
              <h4 style={{ color: "blue", textDecoration: "dash ed" }}>НАПОМИНАНИЕ!!!</h4>
              <p>{"Повторить сложные слова"}</p>
              {!dif ? <p style={{ fontSize: "20px", fontStyle: "italic" }}>пока мало сложных</p> : null}
            </div>
          </Link>
        </div>
        <div className="textbook__statistic">
          <h2>Выучено всего слов</h2>
          <p>{`Изучено  ${value.length} из 3600 слов`}</p>
          <div className="textbook__linear">
            <LinearProgress variant="determinate" value={pers} />
          </div>
          <div>Здесь можно разместить чтото еще</div>
        </div>
        {/* <div>Здесь можно разместить чтото еще</div> */}
      </div>
    </MainLayout>
  );
}
