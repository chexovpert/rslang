import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
//import useHttp from "../hooks/audio.hook";
import useAudio from "../hooks/audio.hook";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { CSSTransition } from "react-transition-group";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { Link, useHistory } from "react-router-dom";
import { useWordContext } from "../context/WordContext";

const baseUrl = "https://react-learnwords-rslang.herokuapp.com/";

export default (props) => {
  const [url, setUrl] = useState(null);
  const correctWords = props.correct;
  const wrongWords = props.wrong;
  const score = props.score;
  const [selectedValue, setSelectedValue] = useState("stats");
  const [toggle, setToggle] = useState(true);
  const [toggle1, setToggle1] = useState(false);
  const auth = useContext(AuthContext);
  const [playing, toggleAudio, changeSrc] = useAudio(null);
  const wordCntx = useWordContext();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setToggle(!toggle);
  };
  const toggleAudioHandler = (audio) => {
    changeSrc(`${baseUrl}${audio}`);

    toggleAudio();
  };
  // useEffect(() => {
  //   console.log(error);
  // }, error);
  let percent =
    correctWords && wrongWords ? Math.round((correctWords.length / (correctWords.length + wrongWords.length)) * 100) : 0;
  return (
    <div className="gameover__screen">
      <div className="gameover__screen_switchWindow">
        {toggle && (
          <div className="gameover__screen_switchWindowWrap">
            <div className="gameover__screen_title">
              <h2 className="gameover__screen_title-h2">Игра окончена</h2>
              <p className="gameover__screen_title-p">
                слов изучено {correctWords ? correctWords.length : 0}, {wrongWords ? wrongWords.length : 0} на изучении
              </p>
              { score && <p className="gameover__screen_title-p">
                Ваш счет: {score}
              </p>}
            </div>
            <div className="gameover_screen_stats">
              <div className="gameover_screen_stats-statCircle">
                <div className="gameover_screen_stats-outerCircle">
                  <div className="gameover_screen_stats-innerCircle">{percent}%</div>
                  <div className="gameover_screen_stats-animation" style={{ height: `${percent}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <CSSTransition
          in={!toggle}
          timeout={{
            enter: 300,
            exit: 300,
          }}
          mountOnEnter
          unmountOnExit
          classNames="gameover-animation"
          onExited={() => {
            setToggle(true);
          }}
        >
          <div className="gameover__screen_switchWindow-listContainer">
            <ul className="gameover__screen_switchWindow-list">
              <li>
                <span>Знаю </span>
                <span className="gameover__screen_switchWindow-correctTitle">{correctWords ? correctWords.length : "0"}</span>
              </li>
              {correctWords &&
                correctWords.map((word) => {
                  wordCntx.correctHndlr(word);
                  return (
                    <li className="gameover__screen_switchWindow-li">
                      <button
                        onClick={() => toggleAudioHandler(word.audio)}
                        value={word.audio}
                        className={
                          playing ? "gameover__screen_switchWindow-soundButton" : "gameover__screen_switchWindow-soundButton"
                        }
                      >
                        <VolumeUpIcon></VolumeUpIcon>
                      </button>
                      <div className="gameover__screen_switchWindow-word">
                        <p>{word && word.word}</p>
                      </div>
                      <div className="gameover__screen_switchWindow-wordTranslate">
                        <p>- {word && word.wordTranslate}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <ul>
              <li>
                <span>Ошибок </span>
                <span className="gameover__screen_switchWindow-wrongTitle">{wrongWords ? wrongWords.length : "0"}</span>
              </li>
              {wrongWords &&
                wrongWords.map((word) => (
                  <li className="gameover__screen_switchWindow-li">
                    <button
                      onClick={() => toggleAudioHandler(word.audio)}
                      value={word.audio}
                      className={
                        playing ? "gameover__screen_switchWindow-soundButton" : "gameover__screen_switchWindow-soundButton"
                      }
                    >
                      <VolumeUpIcon></VolumeUpIcon>
                    </button>
                    <div className="gameover__screen_switchWindow-word">
                      <p>{word && word.word}</p>
                    </div>
                    <div className="gameover__screen_switchWindow-wordTranslate">
                      <p>- {word && word.wordTranslate}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </CSSTransition>
      </div>
      <RadioGroup row onChange={handleChange} value={selectedValue} className="gameover_screen-radioGroup">
        <Radio value={"stats"} name="radio-button-demo" inputProps={{ "aria-label": "A" }} />
        <Radio value={"words"} name="radio-button-demo" inputProps={{ "aria-label": "B" }} />
      </RadioGroup>
      <div>
        <Link to={"/"}>
          <button className="registration__button-submit">На главную</button>
        </Link>
      </div>
    </div>
  );
};
