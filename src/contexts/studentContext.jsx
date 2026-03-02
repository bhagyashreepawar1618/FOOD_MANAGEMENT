import { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState();
  const [studentToken, setStudentToken] = useState();

  const [orderSummary, setOrderSummary] = useState();

  const value = {
    student,
    setStudent,
    studentToken,
    setStudentToken,
  };
  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export const useStudent = () => {
  return useContext(StudentContext);
};
