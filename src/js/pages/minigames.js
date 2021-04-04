import { Link, Route, Router, Switch, useParams } from "react-router-dom";
import Word from "../componets/wordcard";
import Sprint from "./game-sprint";
import words from "../componets/words.json";

export default function Minigames() {
  const { game } = useParams();
  return (
    <div>
      <Link to={"/games/sprint"}>
        <button>SPRINT</button>
      </Link>
    </div>
  );
}
