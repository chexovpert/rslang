import { Link } from "react-router-dom";
import "../../styles/components/taskComplete.scss";

export default function Complete() {
  return (
    <Link to={"/classbook"}>
      <div className="compl__container">
        <div className="compl__content">
          <h1>Поздравляем! Вы прошли этап!</h1>
          <p>На сегодня вы выполнили задание.</p>
          <p>Можете повторить другие слова, поиграть в игры или же продолжить обучение</p>
        </div>
      </div>
    </Link>
  );
}
