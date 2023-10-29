import React, {useEffect, useState} from "react";
import "./FormLogin.scss";
import {useDispatch} from "react-redux";
import {login} from "../app/userSlice";
import {IUsers} from "../data/model";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const FormLogin = () => {
  const [loginIn, setLoginIn] = useState<string>("");
  const [passIn, setPassIn] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(true);
  const navigate = useNavigate();
  const [allusers, setAllusers] = useState<IUsers[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get<IUsers[]>(
          'http://localhost:5000/api/dataUser'
      );
      setAllusers(response.data);
    } catch (error) {
      alert(error);
    }
    return true
  }
  function EntrySite(_login : string, _password : string, list : IUsers[]) : {id: number, full_name: string, isTeacher: boolean} {
    for (let i = 0; i<list.length; i++){
      if(list[i].login!=_login && list[i].password !=_password){
        continue;
      }
      else{
        setIsCorrect(true);
        return {id : Number(list[i].id), full_name : list[i].full_name, isTeacher: list[i].isTeacher }
      }
    }
    setIsCorrect(false);
    return {id : -9999, full_name : "", isTeacher: false }
  }
  const sumbitButtonLHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _tmp = EntrySite(loginIn, passIn, allusers);
    if(_tmp.id!=-9999){ dispatch(login({
      id: _tmp.id,
      name: _tmp.full_name,
      isLogged: true,
      isAdmin: _tmp.isTeacher,
    }))
      navigate(_tmp.isTeacher ?'/teacher':"/diary");
    }
  };
  const inputLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginIn(e.currentTarget.value);
  };
  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassIn(e.currentTarget.value);
  };

  return (
    <>
      <form onSubmit={sumbitButtonLHandler} id={"loginForm"}>
        <div id={"loginForm__divblock"}>
          <h1 id={"loginForm__h1"}>ВХОД</h1>
          <div id={"loginForm__divinput"}>
            <input
              id={"loginForm__login--input"}
              type={"text"}
              placeholder={"Логин"}
              required
              value={loginIn}
              onChange={(e) => inputLoginHandler(e)}
            />
            <input
              id={"loginForm__password--input"}
              type={"password"}
              placeholder={"Пароль"}
              value={passIn}
              onChange={(e) => inputPasswordHandler(e)}
              required
            />
          </div>
          {!isCorrect ? (<p id={"loginForm__incorrect"}>Данные введены не правильно!</p>) : null}
          <button id={"loginForm__submit"} type="submit">
            Войти
          </button>
        </div>
      </form>
    </>
  );
};
