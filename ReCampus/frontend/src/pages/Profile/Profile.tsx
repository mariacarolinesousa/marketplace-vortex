import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import api from "../../services/apiClient";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  async function loadProfile() {
    try {
      const response = await api.get("/users/me");
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (!user) {
    return (
      <Layout>
        <p>Carregando...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Meu Perfil
        </h1>

        <div className="space-y-6">

          <div>
            <label className="font-semibold">
              Nome
            </label>

            <p>{user.name}</p>
          </div>

          <div>
            <label className="font-semibold">
              E-mail
            </label>

            <p>{user.email}</p>
          </div>

        </div>

      </div>
    </Layout>
  );
}
