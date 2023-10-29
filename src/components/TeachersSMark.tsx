import { IStudentMark } from "../data/model";
import "./TeachersSMark.scss";
import React from "react";

interface MarkProps {
  mark: IStudentMark;
}

export function MarkTeacherStudent({ mark }: MarkProps) {
  return (
      <li id={"tmark__card"}>
        <p id={"tmark__card--mark"}>{mark.mark}</p>
        <p id={"tmark__card--data"}>{mark.data}</p>
      </li>
  );
}
