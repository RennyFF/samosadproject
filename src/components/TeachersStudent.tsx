import "./TeachersStudent.scss";
import React from "react";

interface TeachersStudentProps {
  student: string;
}

export function TeachersStudent({ student }: TeachersStudentProps) {
  return (
      <li id={"student__card"}>
        <p id={"student__card-p"}>{student}</p>
      </li>
  );
}
