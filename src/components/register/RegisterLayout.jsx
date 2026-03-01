import { Outlet } from "react-router";
import RegisterHeader from "./RegisterHeader";
function RegisterLayout() {
  return (
    <>
      <RegisterHeader />
      <Outlet />
    </>
  );
}

export default RegisterLayout;
