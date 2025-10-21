import { NavLink } from "react-router";

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
        {/* Logo / Brand */}
        <NavLink to="/" className="text-lg font-semibold text-blue-700">
          Library Management
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center space-x-3">
          <NavLink to="/books" className={navLinkClass}>
            All Books
          </NavLink>

          <NavLink to="/create-book" className={navLinkClass}>
            Add Book
          </NavLink>

          <NavLink to="/borrow-summary" className={navLinkClass}>
            Borrow Summary
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
