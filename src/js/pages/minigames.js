import { Link, Route, Router, Switch, useParams } from "react-router-dom";
import Word from "../componets/wordcard";
import Sprint from "./game-sprint";
import words from "../componets/words.json";

export default function Minigames() {
  const { game } = useParams();
  return (
    <div className="sprint__buttons">
      <Link to={"/games/sprint"}>
        <button className="registration__button-submit">SPRINT</button>
      </Link>
      <br />
      <Link to={"/games/audio"}>
        <button className="registration__button-submit">AUDIO</button>
      </Link>
      <br />
      <Link to={"/games/forkids"}>
        <button className="registration__button-submit">ENGLISH FOR KIDS</button>
      </Link>
      <br />
      <Link to={"/games/savanna"}>
        <button className="registration__button-submit">SAVANNAH</button>
      </Link>
    </div>
  );
}
