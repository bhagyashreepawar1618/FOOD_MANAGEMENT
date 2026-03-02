import { createContext, useContext, useState } from "react";

const Staffcontext = createContext();

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState(null);
  const [staffToken, setStaffToken] = useState(null);
  const [totalData, setTotalData] = useState();
  const [menu, setMenu] = useState();
  const value = {
    staff,
    setStaff,
    staffToken,
    setStaffToken,
    totalData,
    setTotalData,
    menu,
    setMenu,
  };

  return (
    <Staffcontext.Provider value={value}>{children}</Staffcontext.Provider>
  );
};

export const useStaff = () => {
  return useContext(Staffcontext);
};
