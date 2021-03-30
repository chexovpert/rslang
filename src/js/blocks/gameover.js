import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {CSSTransition} from "react-transition-group"

export default () => {
  const [selectedValue, setSelectedValue] = useState("stats");
  const [toggle, setToggle] = useState(true);
  const auth = useContext(AuthContext);
  const { loading, error, request } = useHttp();
 
  const gameOverHandler = async () => {
    try {
      const data = await request(
        "https://react-learnwords-rslang.herokuapp.com/signin",
        "POST",
        //JSON.stringify({ ...form }),
        { Accept: "application/json", "Content-Type": "application/json" }
      );
      auth.login(
        data.token,
        data.userId,
        data.name,
        data.refreshToken,
        data.message
      );
    } catch (e) {}
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setToggle(!toggle)
  };
  useEffect(() => {
    console.log(error);
  }, error);
  if(loading) { return(
    <div>loading</div>)
} else 
  return (
     
    <div className="gameover__screen">
        <CSSTransition
        in={toggle}
        timeout={{
          enter: 1000,
          exit: 1000,
        }}
        mountOnEnter
        unmountOnExit
        classNames="audChall-buttons"
        onExited={() => {
          setToggle(false)
        }}
      >
        <div className="gameover__screen_switchWindow">
        <div className="gameover__screen_title">
      <h2 className="gameover__screen_title-h2">Отличный результат</h2>
      <p className="gameover__screen_title-p">слов изучено, 0 на изучении</p>
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
      </CSSTransition>
      <RadioGroup row onChange={handleChange} value={selectedValue} className="gameover_screen-radioGroup">
      <Radio
        //checked={selectedValue === true}
        //onChange={handleChange}
        value={"stats"}
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        //checked={selectedValue === false}
        
        value={"words"}
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'B' }}
      /></RadioGroup>
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
