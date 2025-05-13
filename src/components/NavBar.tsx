import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="bg-white font-bold text-2xl  fixed p-2 z-10 w-full flex justify-center gap-10">
    <Link to="/" className="hover:text-orange-500">
      Home
    </Link>
    <Link to="/add-user"  className="hover:text-orange-500">Add User</Link>
  </nav>
);

export default NavBar;
