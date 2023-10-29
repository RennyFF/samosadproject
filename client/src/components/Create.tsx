import React, {Dispatch, useEffect, useState} from "react";
import {IStudentMark, IUsers} from "../data/model";
import "./Create.scss";
import axios from "axios";

const StudentBlank: IUsers = {
  id: 0,
  full_name: "",
  login: "",
  password: "",
  isTeacher: false,
};

const MarkBlank: IStudentMark = {
  id: 0,
  mark: 0,
  related_to: 0,
  data: ""
};

interface createModalProps {
  isStudentAdding: boolean;
  state: Dispatch<React.SetStateAction<boolean>>;
  activeID?: number;
}

export function Create({ isStudentAdding, state, activeID }: createModalProps) {
  const [valueFN, setValueFN] = useState<string>("");
  const [valueLO, setValueLO] = useState<string>("");
  const [valuePA, setValuePA] = useState<string>("");
  const [valueMA, setValueMA] = useState<number | undefined>();
  const [valueDA, setValueDA] = useState<string>("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<IUsers[]>([]);
  const [marksList, setMarksList] = useState<IStudentMark[]>([]);

  async function fetchUsers() {
    try {
      const response = await axios.get<IUsers[]>(
          'http://localhost:5000/api/dataUser'
      );
      setUsers(response.data);
    } catch (error) {
      alert(error);
    }
  }
  async function fetchMarks() {
    try {
      const response = await axios.get<IStudentMark[]>(
          'http://localhost:5000/api/dataMarks'
      );
      setMarksList(response.data);
    } catch (error) {
      alert(error);
    }
  }
  const sumbitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (valueFN.trim().length === 0 || valueLO.trim().length === 0 || valuePA.trim().length === 0) {
      setError("Ошибка в полях данных");
      return;
    }
    state(false);
    let newStudent: IUsers;
    newStudent = StudentBlank;
    newStudent.id = users[users.length-1].id +1;
    newStudent.full_name = valueFN;
    newStudent.login = valueLO;
    newStudent.password = valuePA;
    users.push(newStudent);
    try {
      const json = JSON.stringify(users, null);
      const response = await axios.post('http://localhost:5000/api/saveUser', json, {
        headers: { 'Content-Type': 'application/json' }
      })
      console.log('User saved successfully:', response);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const sumbitHandlerMark = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if(typeof activeID != "number"){
      setError("Не выбран пользователь");
      return;
    }
    if (valueMA === undefined || valueDA.trim().length === 0) {
      setError("Ошибка в полях данных");
      return;
    }
    state(false);
    let newMark: IStudentMark;
    newMark = MarkBlank;
    newMark.id = marksList[marksList.length-1].id +1;
    newMark.mark = valueMA;
    newMark.data = formatDate(valueDA);
    newMark.related_to = Number(activeID);
    marksList.push(newMark);
    try {
      const json = JSON.stringify(marksList, null);
      const response = await axios.post('http://localhost:5000/api/saveMark', json, {
        headers: { 'Content-Type': 'application/json' }
      })
      console.log('Mark saved successfully:', response);
    } catch (error) {
      console.error('Error saving mark:', error);
    }
  };

  const changeHandlerFN = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setValueFN(e.target.value);
  };
  const changeHandlerLO = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setValueLO(e.target.value);
  };

  const changeHandlerPA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setValuePA(e.target.value);
  };

  const changeHandlerMA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setValueMA(Number(e.target.value));
  };
  function formatDate(input: string): string {
    const parts = input.split('-');
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }
  const changeHandlerDA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setValueDA(e.target.value);
  };
  useEffect(()=>{
    fetchUsers();
    fetchMarks();
  },[])

  return (
      isStudentAdding ? (
          <div id={"background"}><form id={"CreateStudent"} onSubmit={sumbitHandler}>
        <h2 id={"CreateStudent--h2"}>Добавить ученика</h2>
        <input
        type='text'
        placeholder='ФИО'
        value={valueFN}
        required={true}
        onChange={changeHandlerFN}
        id={"CreateStudent--input"}
      />
        <input
            type='text'
            placeholder='Логин'
            value={valueLO}
            onChange={changeHandlerLO}
            id={"CreateStudent--input"}
            required={true}
        />
        <input
            type='text'
            placeholder='Пароль'
            value={valuePA}
            onChange={changeHandlerPA}
            id={"CreateStudent--input"}
            required={true}
        />
            {error!=="" ? <p id={"CreateStudent--error"}>{error}</p> : null}
      <button id={"CreateStudent--button"} type='submit'>Добавить</button>
            <button id={"CreateStudent--close"} onClick={()=>state(false)}>x</button>
    </form></div>) : (
        <div id={"background"}><form id={"CreateStudent"} onSubmit={sumbitHandlerMark}>
          <h2 id={"CreateStudent--h2"}>Добавить оценку</h2>
          <input
              type='number'
              placeholder='Оценка'
              value={valueMA}
              required={true}
              min={1}
              max={5}
              onChange={changeHandlerMA}
              id={"CreateStudent--input"}
          />
          <input
              type='date'
              placeholder='Дата'
              value={valueDA}
              onChange={changeHandlerDA}
              id={"CreateStudent--input"}
              required={true}
          />
          {error!=="" ? <p id={"CreateStudent--error"}>{error}</p> : null}
          <button id={"CreateStudent--button"} type='submit'>Добавить</button>
          <button id={"CreateStudent--close"} onClick={()=>state(false)}>x</button>
        </form></div>)
  );
}
