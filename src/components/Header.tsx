import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";
import logoIgnite from "../assets/logo.svg";
const styleLink =
  "w-12 h-12 flex justify-center items-center text-gray-100 border-b-[3px] border-b-transparent border-t-[3px] border-t-transparent hover:border-b-[3px] hover:border-b-green-500 active:text-green-500";
export function Header() {
  return (
    <div className="flex center items-center justify-between">
      <span>
        <img src={logoIgnite} alt="" />
      </span>
      <nav className="flex gap-2">
        <NavLink to="/" title="Timer" className={styleLink}>
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico" className={styleLink}>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </div>
  );
}
