import "../scss/MainPage.scss";
import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../app/userSlice";
export const MainPage = () => {
  const user = useSelector(selectUser);
  return (
    <section id={"main_page"}>
      <div>
        <h1 id={"main_page--h1"}>
          Вся гордость учителя в учениках в росте посеянных им семян.
        </h1>
        <h2 id={"main_page--h2"}>Личный помощник учителя.</h2>
        <div id={"main_page--buttonsection"}>
          <Link to={user.isLogged? (user.isAdmin ? "/teacher" : "/login") : "/login" } className={"buttonIM"}>
           Я учитель
          </Link>
          <Link to={user.isLogged? (user.isAdmin ? "/login" : "/diary") : "/login" }  className={"buttonIM"} id={"studentbtn"}>
              Я ученик
          </Link>
        </div>
      </div>
      <div id={"ellipse"}></div>
      <div id={"mainImageContainer"}>
        <img id={"imageMain"} src={require("../sources/main_image.png")} />
      </div>
    </section>
  );
};
