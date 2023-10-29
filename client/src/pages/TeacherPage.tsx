import React, {useEffect, useState} from "react";
import "../scss/TeacherPage.scss";
import {TeachersStudent} from "../components/TeachersStudent";
import {IStudentMark, IUsers} from "../data/model";
import {MarkStudent} from "../components/StudentMark";
import {MarkTeacherStudent} from "../components/TeachersSMark";
import {Create} from "../components/Create";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../app/userSlice";

interface IUser{
  id: number,
  full_name: string,
}

export const TeacherPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [allmarks, setAllmarks] = useState<IStudentMark[]>([]);
  const [modalOpen1, setModalOpen1] = useState<boolean>(false);
  const [modalOpen2, setModalOpen2] = useState<boolean>(false);
  const [activeStudentID, setActiveStudentID] = useState<number | undefined>();
  async function fetchUsers() {
    try {
      const response = await axios.get<IUsers[]>(
          'https://samosadproject-serv.vercel.app/api/dataUser'
      );
      const _:IUser[] = []
      response.data.map((i) =>
          i.id!==0? _.push({id: i.id, full_name: i.full_name}) : null
      )
      setUsers(_);
    } catch (error) {
      alert(error);
    }
  }
  async function fetchMarks() {
    try {
      const response = await axios.get<IStudentMark[]>(
          'https://samosadproject-serv.vercel.app/api/dataMarks'
      );
      setAllmarks(response.data);
    } catch (error) {
      alert(error);
    }
  }
  const addToActive = (id: number) => setActiveStudentID(id);
  const ActiveModal1 = () => {
    setModalOpen1(modalOpen1=>!modalOpen1)
  }
  const ActiveModal2 = () => {
    setModalOpen2(modalOpen2=>!modalOpen2)
  }
  useEffect(()=>{
    fetchUsers();
    fetchMarks();
  },[]);
  const usersel = useSelector(selectUser);
  return( usersel.isAdmin && usersel.isLogged ? (<div id={"teacherPage"}>
        <h1 id={"teacherPage--h1"}>Самосадко Анна Олеговна</h1>
        <div id={"teacherPage--activesection"}>
          <div id={"teacherPage--activesection__leftsec"}>
            <p id={"teacherPage--activesection__leftsec--p"}>ученики</p>
            <div id={"teacherPage--activesection__leftsec--listDiv"}>
              <ul id="teacherPage--activesection__leftsec--listDiv--listofmarks" className="list-group">
                {users.map((i, index) =>
                    <label key={index} onClick={()=>addToActive(i.id)}><TeachersStudent student={i.full_name} key={index} /></label>
                )}
              </ul>
            </div>
            <button id={"teacherPage--activesection__leftsec--adding"} onClick={()=>ActiveModal1()}>+</button>
          </div>
          <div id={"teacherPage--activesection__rightsec"}>
            <p id={"teacherPage--activesection__rightsec--p"}>оценки</p>
            <div id={"teacherPage--activesection__rightsec--listDiv"}>
              <ul id="teacherPage--activesection__rightsec--listDiv--listofmarks" className="list-group">
                {activeStudentID!== undefined? allmarks.map((i,index)=>
                    i.related_to===activeStudentID ?<MarkTeacherStudent mark={i} key={index}/>:null
                ) : null}
              </ul>
            </div>
            <button id={"teacherPage--activesection__rightsec--adding"} onClick={()=>ActiveModal2()}>+</button>
          </div>
        </div>
        {modalOpen1 ? <Create isStudentAdding={true} state={setModalOpen1}/> : null}
        {modalOpen2 ? <Create isStudentAdding={false} state={setModalOpen2} activeID={activeStudentID}/> : null}
      </div>) : null
  )
};
