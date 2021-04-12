import GameLayout from "../layouts/GameLayout";
import SprintBlock from "../blocks/sprint-block";
import gameBackground from "../../assets/images/backgrounds/sprint.jpg";

const text = "Sprint";
export default (props) => {
  return (
    <GameLayout {...props} gameBackground={gameBackground} text={text} type="sprint">
      {(gameprops) => <SprintBlock data={gameprops} />}
    </GameLayout>
  );
};
