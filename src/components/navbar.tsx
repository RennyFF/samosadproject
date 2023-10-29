import React, { useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import {selectUser} from "../app/userSlice";
import {useSelector} from "react-redux";

export function Navbar() {
  const isLogged= useSelector(selectUser);
  return (
    <>
      <div className="nav__logo">
        <Link to="/" className="nav__logo">
          <img src={require("../sources/logo.png")} />
        </Link>
      </div>
      <nav id="nav">
        { isLogged.isLogged ? (<Link to={isLogged.isAdmin? "/teacher" : "/diary"} id="todiar">
          К журналу
        </Link>) : null}
        <a href="https://t.me/truejke" id="Support" target='_blank'>
          Поддержка
        </a>{
        isLogged.isLogged ? <p id={"hiText"}>Здравствуйте, &nbsp;<span id={"hiText--span"}>{isLogged.name.split(" ")[1]}</span>&#128075;</p> :(
        <Link to="/login" id="LoginButton">
          Вход
        </Link>
        )
      }
      </nav>
    </>
  );
}
