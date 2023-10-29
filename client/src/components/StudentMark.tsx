import { IStudentMark } from "../data/model";
import "./StudentMark.scss";
import React from "react";

interface MarkProps {
  mark: IStudentMark;
}

export function MarkStudent({ mark }: MarkProps) {
  return (
    <li id={"mark__card"}>
      <p id={"mark__card--mark"}>{mark.mark}</p>
      <p id={"mark__card--data"}>{mark.data}</p>
    </li>
  );
}
