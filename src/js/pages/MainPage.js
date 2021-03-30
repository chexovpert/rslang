import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameOver from "../blocks/gameover";

export default () => {
  return (
    <article>
      <section className="mainPage__title">
        <h1>RS LANG</h1>
      </section>
      <section className="mainPage__description">
        <GameOver></GameOver>
        <p>Cool app</p>
      </section>
      <section className="mainPage__video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/vJHCEXFrLa4"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </section>
    </article>
  );
};
