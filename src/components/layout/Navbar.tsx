import React from "react";
import { NavLink } from "react-router";

const Navbar: React.FC = () => {
  const baseLinkStyle =
    "px-4 py-2 rounded-md transition-colors duration-200";
  const activeStyle =
    "bg-blue-600 text-white";
  const inactiveStyle =
    "text-gray-700 hover:bg-blue-100";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
        <div className="text-xl font-semibold text-blue-700">
          📚 Library System
        </div>

        <div className="space-x-2">
          <NavLink
            to="/books"
            className={({ isActive }) =>
              `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            All Books
          </NavLink>

          <NavLink
            to="/create-book"
            className={({ isActive }) =>
              `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Add Book
          </NavLink>

          <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
              `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Borrow Summary
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
