import { NavLink } from "react-router-dom";
import { sidebarItems } from "../types/sidebaritems";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white text-gray-800 font-light p-10 flex flex-col">

      {/* Logo */}
      <div className="p-2 mb-2 rounded-full">
        <img
          src="/images/care-logo.png"
          alt="Logo"
          className="w-32 h-32 rounded-xl shadow-lg"
        />
      </div>

      <div className="border-b border-gray-300 mb-4"/>

      {/* Top Buttons */}
      <ul className="space-y-2">
        {sidebarItems.slice(0, sidebarItems.length - 1).map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors duration-200 
                ${isActive ? "bg-blue-800 font-semibold text-white" : "hover:bg-green-600 hover:text-white"}`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      
      <ul className="mt-auto">
        {sidebarItems.slice(-1).map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors duration-200 
                ${isActive ? "bg-blue-800 font-semibold text-white" : "hover:bg-emerald-600/50 hover:text-white"}`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
