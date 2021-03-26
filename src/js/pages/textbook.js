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
          <button>{`Начать обучение`}</button>
        </div>
        <div className="textbook__cell">
          <p>{"А тут сделать чтото типо повтора слов"}</p>
          <button>{`Повторить слова`}</button>
        </div>
        <div className="textbook__cell">
          <p>{"Возможно и не один раз"}</p>
          <button>{`Повторить слова`}</button>
        </div>
      </div>
      <div>Здесь можно разместить чтото еще</div>
    </div>
  );
}
