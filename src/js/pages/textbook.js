import { Link } from "react-router-dom";
import "../../styles/blocks/textbook.scss";

export default function TextBook() {
  return (
    <div className="textbook">
      <div className="textbook__logo">
        <p>{`RSLang`}</p>
        <p>{`Изучаем язык с удовольствием`}</p>
      </div>
      <div className="textbook__statistic">
        <p>{`Здесь вы можете изучать новые слова или же повторить уже изученные или сложные слова`}</p>
        {"Выучено слов за сегодня"}
        <p>{"Тут будет статистика(добавить прогресс бар)"}</p>
      </div>
      <div className="textbook__learn">
        <div className="textbook__cell">
          <p>{"Тут сделать начать дневное обучение"}</p>
          <Link to="/testing">
            <button>{`Начать обучение`}</button>
          </Link>
        </div>
        <div className="textbook__cell">
          <p>{"Посмотреть весь список слов"}</p>
          <Link to={"/wordlist/1/1"}>
            <button>{`Посмотреть слова`}</button>
          </Link>
        </div>
        <div className="textbook__cell">
          <p>{"Повторить сложные слова"}</p>
          <Link to={"/testingdif"}>
            <button>{`Повториь сложные слова`}</button>
          </Link>
        </div>
      </div>
      <div>Здесь можно разместить чтото еще</div>
    </div>
  );
}
