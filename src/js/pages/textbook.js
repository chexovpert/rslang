import { LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/blocks/textbook.scss";
import MainLayout from "../layouts/MainLayout";

export default function TextBook() {
  const [value, setValue] = useState(0);
  const [pers, setPers] = useState(2);
  const [dif, setDif] = useState(true);
  useEffect(() => {
    if ("correctwordid" in localStorage) {
      setValue(JSON.parse(localStorage.getItem("correctwordid")).length);
      setPers(value / 36);
    } else {
      setValue(0);
    }
    if ("difWordId" in localStorage) {
      let dWordsId = JSON.parse(localStorage.getItem("difWordId"));
      if (dWordsId.length < 20) {
        setDif(false);
      }
    } else {
      setDif(false)
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
              {!dif ? <span id='mark'style={{  fontStyle: "italic" }}>пока мало сложных</span> : null}
            </div>
          </Link>
        </div>
        <div className="textbook__statistic">
          <h3>Выучено всего слов</h3>
          <p>{`Изучено  ${value} из 3600 слов`}</p>
          <div className="textbook__linear">
            <LinearProgress variant="determinate" value={pers} />
            <br/>
          </div>
          {/* <br/> */}
        </div>
      </div>
    </MainLayout>
  );
}
