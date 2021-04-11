import { CardActions } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import startScreenImage from "../../assets/images/images/mainpageimage.png";
import gameImage from "../../assets/images/images/games.png";
import onlineImage from "../../assets/images/images/online.png";
import headphoneImage from "../../assets/images/images/headphone.png";
import studybookImage from "../../assets/images/images/studybook.png";
import avatar1 from "../../assets/images/images/avatar1.png";
import avatar2 from "../../assets/images/images/avatar2.png";

import MainLayout from "../layouts/MainLayout";

const cards = [
  {
    title: "Игры",
    textContent:
      "Изучать новое интереснее во время игры. Поэтому мы подготовили 4 увлекательных красочных игр, чтобы учитьанглийский было веселее.",
    image: gameImage,
  },
  {
    title: "Онлайн доступ",
    textContent:
      "В отличии от оффлайн курсов наши игры и тренировки доступны всегда. Занимайтесь когда вам удобно, ни от чего не завися.",
    image: onlineImage,
  },
  {
    title: "Произношение",
    textContent:
      "Слушай и тренируй свое произношение. Благодаря нашим играм и аудиофайлам вы сможете полностью избавиться от своего акцента.",
    image: headphoneImage,
  },
  {
    title: "Учебник",
    textContent:
      "Благодаря нашему электронному учебнику всегда можно вспомнить сложное или выучить новое слово, кроме того можно также отмечать и удалить слова.",
    image: studybookImage,
  },
];
const users = [
  {
    nickname: "chexovpert",
    role: "Разработчик",
    textContent:
      "Отвечает за разработку мини-игр Саванна, Аудиовызов, English for kids. Создатель главной страницы, бургер-меню, формы для логина и авторизации и бэк.",
    image: avatar1,
    link: "https://github.com/chexovpert",
  },
  {
    nickname: "vepsar",
    role: "Разработчик",
    textContent:
      "Отвечает за разработку мини-игры Спринт. Разработал электронный учебник с настройками, списком слов и словарём",
    image: avatar2,
    link: "https://github.com/Vepsar",
  },
];

export default () => {
  return (
    <MainLayout>
      <div className="mainPage">
        <div className="mainPage_startScreen">
          <div className="mainPage_startScreen_textContent">
            <h1>Учите новые слова каждый день с RSlang</h1>
            <p>
              Уникальное приложение для изучения английского. Увлекательные игры
              для тренировки слов и метод интервального повторения для
              запоминания слов навсегда.
            </p>
            <Link to="/classbook" className="header__link login">
              Начать обучение
            </Link>
          </div>
          <div>
            <img
              className="mainPage_startScreen_image"
              src={startScreenImage}
            />
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
              {cards.map((card) => {
                return (
                  <div className="mainPage_features_card">
                    <h3>{card.title}</h3>
                    <div className="mainPage_features_card-content">
                      <div className="mainPage_features_card-text">
                        <p>{card.textContent}</p>
                      </div>
                      <div>
                        <img
                          className="mainPage_features_card-image"
                          src={card.image}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="mainPage__team">
          <h2>О команде</h2>
          <div
            className="mainPage__team__wrapper"
            // style={{ backgroundImage: `url(${laptop})` }}
          >
            {users.map((user) => {
              return (
                <div className="mainPage__team__card">
                  <img
                    className="mainPage__team__card-image"
                    src={user.image}
                  />
                  <div className="mainPage__team__card_description">
                    <h3>{user.nickname}</h3>
                    <h5>{user.role}</h5>
                    <p>{user.textContent}</p>
                  </div>
                  <a href={user.link}>
                    <span className="mainPage__team__card-link">
                      <svg
                        className="octicon octicon-mark-github v-align-middle"
                        height="32"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="32"
                        aria-hidden="true"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                      </svg>
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};
