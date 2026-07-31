import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Profile() {
  const [user] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      return JSON.parse(storedUser) as User;
    } catch (error) {
      console.error("Erro ao ler usuário salvo:", error);
      return null;
    }
  });

  if (!user) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">
            Meu perfil
          </h1>

          <p className="text-red-600 mb-4">
            Não foi possível encontrar os dados do usuário.
          </p>

          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Entrar novamente
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Meu perfil
        </h1>

        <div className="border rounded-lg p-6 space-y-5 bg-white">
          <div>
            <p className="text-sm text-gray-500">
              Nome
            </p>

            <p className="text-lg font-medium">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              E-mail
            </p>

            <p className="text-lg font-medium">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
