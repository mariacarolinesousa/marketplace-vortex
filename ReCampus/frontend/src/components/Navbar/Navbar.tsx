import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <header className="bg-blue-600 shadow">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-bold text-white"
        >
          ReCampus
        </Link>

        <div className="flex items-center gap-4">

          <Link
            to="/"
            className="text-white hover:text-gray-200"
          >
            Início
          </Link>

          <Link
          to="/profile"
          className="text-white"
          >
           Meu Perfil
          </Link>

          {token && (
            <Link
              to="/create"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
            >
              <Link
              to="/my-ads"
              className="text-white"
              >
              Meus anúncios
              </Link>
              Publicar anúncio
            </Link>
          )}

          {!token ? (
            <Link
              to="/login"
              className="text-white"
            >
              Entrar
            </Link>
          ) : (
            <>
              <span className="text-white">
                Olá, {user?.name}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Sair
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
}