import { Link } from "react-router-dom";
import "../../styles/components/taskComplete.scss";

export default function Complete() {
  return (
    <Link to={"/classbook"}>
      <div className="compl__container">
        <div className="compl__content">
          <p>Поздравляем! Вы прошли этап!</p>
          <p>На сегодня вы выполнили задание.</p>
          <p>Можете повторить другие слова или же поиграть в игры</p>
        </div>
      </div>
    </Link>
  );
}
