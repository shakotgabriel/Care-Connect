import { NavLink, useNavigate } from "react-router-dom";
import { sidebarItems } from "../types/sidebaritems";
import { useContext } from "react";
import { AuthContext } from "../src/contexts/AuthContext";

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext must be used within an AuthProvider");

  const { user, logout } = authContext;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

      {/* Bottom Buttons */}
      <ul className="mt-auto space-y-2">
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

        {/* Logout Button */}
        {user && (
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </aside>
  );
}
