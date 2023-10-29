import { MarkStudent } from "../components/StudentMark";
import React, {useEffect, useState} from "react";
import { IStudentMark } from "../data/model";
import "../scss/StudentPage.scss";
import {useSelector} from "react-redux";
import {selectUser} from "../app/userSlice";
import axios from "axios";
export function StudentPage() {
  const user= useSelector(selectUser);
  const [count, setCount] = useState<number>(0);
  const [marksList, setMarksList] = useState<IStudentMark[]>([]);
  const AppendToEnd = (arr: IStudentMark[], newel:IStudentMark):IStudentMark[] => {
    arr.push(newel);
    return arr;
  }
  async function fetchMarks() {
    try {
      const response = await axios.get<IStudentMark[]>(
          'https://samosadproject-serv.vercel.app/api/dataMarks'
      );
      response.data.map((i:IStudentMark, index) =>
          (i.related_to === user.id ? (setMarksList(marksList=>AppendToEnd(marksList, i)), setCount(count=>count +1)) : null)
      )
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    fetchMarks();
  }, []);
  const usersel = useSelector(selectUser);
  return(usersel.isLogged && !usersel.isAdmin ? (<section id={"diary_student_page"}>
      <img
          src={require("../sources/starone.png")}
          id={"diary_student_page--starone"}
      />
      <img
          src={require("../sources/startwo.png")}
          id={"diary_student_page--startwo"}
      />
      <div id={"contain"}>
        <h1 id={"diary_student_page--h1"}>Мои оценки:</h1>
        <div id={"diary_student_page--listDiv"}>
          <ul id="diary_student_page--ListOfMarks" className="list-group">
            {count>0 ? marksList.map((i, index) => <MarkStudent mark={i} key={index}/>
            ) : <p id={"diary_student_page--ListOfMarks--nomark"}>Оценок нет</p> }
          </ul>
        </div>
      </div>
    </section>): null)
}
