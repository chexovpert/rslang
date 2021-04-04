import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
//import useHttp from "../hooks/audio.hook";
import useAudio from "../hooks/audio.hook";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { CSSTransition } from "react-transition-group";

const baseUrl = "https://react-learnwords-rslang.herokuapp.com/";

export default (props) => {
  const [url, setUrl] = useState(null);
  const correctWords = props.correct;
  const wrongWords = props.wrong;
  const [selectedValue, setSelectedValue] = useState("stats");
  const [toggle, setToggle] = useState(true);
  const [toggle1, setToggle1] = useState(false);
  const auth = useContext(AuthContext);
  //const { loading, error, request } = useHttp();
  const [playing, toggleAudio, changeSrc] = useAudio(null);

  // const gameOverHandler = async () => {
  //   try {
  //     const data = await request(
  //       "https://react-learnwords-rslang.herokuapp.com/signin",
  //       "POST",
  //       //JSON.stringify({ ...form }),
  //       { Accept: "application/json", "Content-Type": "application/json" }
  //     );
  //     auth.login(
  //       data.token,
  //       data.userId,
  //       data.name,
  //       data.refreshToken,
  //       data.message
  //     );
  //   } catch (e) {}
  // };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setToggle(!toggle);
  };
  const toggleAudioHandler = (event) => {
    changeSrc(`${baseUrl}${event.target.value}`);

    toggleAudio();
  };
  // useEffect(() => {
  //   console.log(error);
  // }, error);
  return (
    <div className="gameover__screen">
      <div className="gameover__screen_switchWindow">
        {/* <CSSTransition
          in={toggle}
          timeout={{
            enter: 1000,
            exit: 1000,
          }}
          mountOnEnter
          unmountOnExit
          classNames="audChall-buttons"
          onExited={() => {
            setToggle(false);
          }}
        > */}
        {toggle && (
          <div className="gameover__screen_switchWindowWrap">
            <div className="gameover__screen_title">
              <h2 className="gameover__screen_title-h2">Отличный результат</h2>
              <p className="gameover__screen_title-p">
                слов изучено, 0 на изучении
              </p>
            </div>
            <div className="gameover_screen_stats">
              <div className="gameover_screen_stats-statCircle">
                <div className="gameover_screen_stats-outerCircle">
                  <div className="gameover_screen_stats-innerCircle">90%</div>
                  <div className="gameover_screen_stats-animation"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* </CSSTransition> */}
        <CSSTransition
          in={!toggle}
          timeout={{
            enter: 300,
            exit: 300,
          }}
          //mountOnEnter
          unmountOnExit
          classNames="gameover-animation"
          onExited={() => {
            setToggle(true);
          }}
        >
          <div className="gameover__screen_switchWindow-list">
            <ul>
              {correctWords &&
                correctWords.map((word) => (
                  <li>
                    <button
                      onClick={toggleAudioHandler}
                      value={word.audio}
                      className={
                        playing
                          ? "audioChallenge__base-button play"
                          : "audioChallenge__base-button"
                      }
                    >
                      {playing ? "Pause" : "Play"}
                    </button>
                    <div className="audioChallenge__base-correct-word">
                      <h2>{word && word.word}</h2>
                    </div>
                    <span className="audioChallenge__base-correct-word">
                      <h4>{word && word.wordTranslate}</h4>
                    </span>
                  </li>
                ))}
            </ul>
            <ul>
              {wrongWords &&
                wrongWords.map((word) => (
                  <li>
                    <button
                      onClick={toggleAudioHandler}
                      value={word.audio}
                      className={
                        playing
                          ? "audioChallenge__base-button play"
                          : "audioChallenge__base-button"
                      }
                    >
                      {playing ? "Pause" : "Play"}
                    </button>
                    <span className="audioChallenge__base-correct-word">
                      <h4>{word && word.word}</h4>
                    </span>
                    <span className="audioChallenge__base-correct-word">
                      <h4>{word && word.wordTranslate}</h4>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </CSSTransition>
      </div>
      <RadioGroup
        row
        onChange={handleChange}
        value={selectedValue}
        className="gameover_screen-radioGroup"
      >
        <Radio
          //checked={selectedValue === true}
          //onChange={handleChange}
          value={"stats"}
          name="radio-button-demo"
          inputProps={{ "aria-label": "A" }}
        />
        <Radio
          //checked={selectedValue === false}

          value={"words"}
          name="radio-button-demo"
          inputProps={{ "aria-label": "B" }}
        />
      </RadioGroup>
      <div>
        <button
          //type="submit"
          //value="Войти"
          className="registration__button-submit"
          //onClick={authHandler}
        >
          Войти
        </button>
      </div>
    </div>
  );
};
