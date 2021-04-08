import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameOver from "../blocks/gameover";
import startScreenImage from "../../assets/images/images/mainpageimage.png";
import laptop from "../../assets/images/images/laptop.png";

export default () => {
  return (
    <div className="mainPage">
      <div className="mainPage_startScreen">
        <div className="mainPage_startScreen_textContent">
          <h1>Учите новые слова каждый день с RSlang</h1>
          <p>
            Уникальное приложение для изучения английского. Увлекательные игры
            для тренировки слов и метод интервального повторения для запоминания
            слов навсегда.
          </p>
          <Link to="/classbook" className="header__link login">
            Начать обучение
          </Link>
        </div>
        <div>
          <img className="mainPage_startScreen_image" src={startScreenImage} />
        </div>
      </div>
      <section className="mainPage__video">
        <h2>Видео</h2>
        <div
          className="mainPage__video_container"
          // style={{ backgroundImage: `url(${laptop})` }}
        >
          <iframe
            // width="560"
            // height="315"
            src="https://www.youtube.com/embed/vJHCEXFrLa4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className="mainPage__features_wrapper">
        <div className="mainPage_features">
          <h2>Особенности</h2>
          <div className="mainPage_features_card-container">
            <div className="mainPage_features_card">
              <h3>Игры</h3>
              <div className="mainPage_features_card-content">
                <div className="mainPage_features_card-text">
                  <p>
                    Изучать новое интереснее во время игры. Поэтому мы
                    подготовили 6 увлекательных красочных игр, чтобы учить
                    английский было веселее.
                  </p>
                </div>
                <div>
                  <img
                    className="mainPage_features_card-image"
                    src={startScreenImage}
                  />
                </div>
              </div>
            </div>
            <div className="mainPage_features_card">
              <h3>Игры</h3>
              <div className="mainPage_features_card-content">
                <div className="mainPage_features_card-text">
                  <p>
                    Изучать новое интереснее во время игры. Поэтому мы
                    подготовили 6 увлекательных красочных игр, чтобы учить
                    английский было веселее.
                  </p>
                </div>
                <div>
                  <img
                    className="mainPage_features_card-image"
                    src={startScreenImage}
                  />
                </div>
              </div>
            </div>
            <div className="mainPage_features_card">
              <h3>Игры</h3>
              <div className="mainPage_features_card-content">
                <div className="mainPage_features_card-text">
                  <p>
                    Изучать новое интереснее во время игры. Поэтому мы
                    подготовили 6 увлекательных красочных игр, чтобы учить
                    английский было веселее.
                  </p>
                </div>
                <div>
                  <img
                    className="mainPage_features_card-image"
                    src={startScreenImage}
                  />
                </div>
              </div>
            </div>
            <div className="mainPage_features_card">
              <h3>Игры</h3>
              <div className="mainPage_features_card-content">
                <div className="mainPage_features_card-text">
                  <p>
                    Изучать новое интереснее во время игры. Поэтому мы
                    подготовили 6 увлекательных красочных игр, чтобы учить
                    английский было веселее.
                  </p>
                </div>
                <div>
                  <img
                    className="mainPage_features_card-image"
                    src={startScreenImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mainPage__team">
        <h2>О команде</h2>
        <div
          className="mainPage__team__wrapper"
          // style={{ backgroundImage: `url(${laptop})` }}
        >
          <div className="mainPage__team__card">
          <img
                    className="mainPage__team__card-image"
                    src={startScreenImage}
                  />
                  <div  className="mainPage__team__card_description">
                    <h3>chexovert</h3>
                    <h5>Takoyto</h5>
                    <p>что-то сделалfddfsdfdfshdf fdshksdfkjfdhsdfjkdfh kdfjsjhsdfjk sdfhsdfkhsdfjkjh sdfjksvhudfghj kgrhkdfhjksdf hfhdhksdfagukef ruyier i fdjhgdjk fdhgfdjkghk fdjhdfgkgfhgkdf fdgjhdgfgkd u</p>
                  </div>
                  <a href="/github">link</a>
                  
          </div>
          <div className="mainPage__team__card">
          <img
                    className="mainPage__team__card-image"
                    src={startScreenImage}
                  />
                  <div  className="mainPage__team__card_description">
                    <h3>chexovert</h3>
                    <h5>Takoyto</h5>
                    <p>что-то сделалfddfsdfdfshdf fdshksdfkjfdhsdfjkdfh kdfjsjhsdfjk sdfhsdfkhsdfjkjh sdfjksvhudfghj kgrhkdfhjksdf hfhdhksdfagukef ruyier i fdjhgdjk fdhgfdjkghk fdjhdfgkgfhgkdf fdgjhdgfgkd u</p>
                  </div>
                  <a href="/github">link</a>
                  
          </div>
          
        </div>
      </section>
    </div>
  );
};
