import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          ReCampus
        </Link>

        <div className="hidden md:flex items-center border rounded-lg px-3 py-2 w-96">

          <FaSearch className="text-gray-400" />

          <input
            className="flex-1 ml-2 outline-none"
            placeholder="Pesquisar anúncios..."
          />

        </div>

        <nav className="flex items-center gap-5">

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Cadastro
          </Link>

          <FaUserCircle
            size={30}
            className="text-gray-500"
          />

        </nav>

      </div>
    </header>
  );
}