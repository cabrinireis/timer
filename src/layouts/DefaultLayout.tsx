import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaultLayout() {
  return (
    <div className="max-w-[74rem] h-[calc(100vh-10rem)] bg-gray-800 rounded-3xl flex flex-col my-[5rem] mx-auto p-[2.5rem]">
      <Header />
      <Outlet />
    </div>
  );
}
