import React, { useState, useEffect } from "react";

export default (url) => {
  const [src, setSrc] = useState(url);
  const [audio] = useState(new Audio(src));
  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => setPlaying(!playing);
  const changeSrc = (url) => {
    setSrc(url);
    console.log(url);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);
  useEffect(() => {
    audio.src = src;
    audio.play();
  }, [src]);

  return [playing, toggleAudio, changeSrc];
};
