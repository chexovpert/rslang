import { useState } from "react";
import "../../styles/components/timer.scss";
import { useWordContext } from "../context/WordContext";

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const TIME_LIMIT = 60;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

export default function Timer() {
  let timerInterval = null;
  const wordCntx = useWordContext();
  let timePassed = 0;
  let timeLft = TIME_LIMIT;
  const [timeLeft, setTimeLeft] = useState(`1:00`);
  const [circleDasharray, setCircleDasharray] = useState(FULL_DASH_ARRAY);
  const [remainingPathColor, setRemainingPathColor] = useState(COLOR_CODES.info.color);

  function onTimesUp() {
    clearInterval(timerInterval);
    setTimeLeft("1:00");
    setCircleDasharray(FULL_DASH_ARRAY);
  }

  function startTimer() {
    clearInterval(timerInterval);
    wordCntx.setStart(false);
    wordCntx.setTimerOut(false);
    timerInterval = setInterval(() => {
      wordCntx.setTimer(true);
      timePassed = timePassed + 1;
      timeLft = TIME_LIMIT - timePassed;
      setTimeLeft(formatTime(timeLft));
      setCircleDasharray(`${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`);
      setPathColor(timeLft);
      if (timeLft === 0) {
        onTimesUp();
        setRemainingPathColor(COLOR_CODES.info.color);
        wordCntx.setTimer(false);
        wordCntx.setTimerOut(true);
      }
    }, 1000);
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      setRemainingPathColor(alert.color);
    } else if (timeLeft <= warning.threshold) {
      setRemainingPathColor(warning.color);
    }
  }
  if (wordCntx.start) {
    startTimer();
  }
  return (
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray={`${circleDasharray}`}
            class={`base-timer__path-remaining ${remainingPathColor}`}
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">
        {`${timeLeft}`}
      </span>
    </div>
  );
}
