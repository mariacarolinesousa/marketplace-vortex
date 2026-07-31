import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../services/apiClient";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Preencha o e-mail e a senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      console.log("Resposta do login:", response.data);

      if (!response.data.token) {
        throw new Error("O backend não retornou o token.");
      }

      localStorage.setItem("token", response.data.token);

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      alert("Login realizado com sucesso!");

      navigate("/home");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("Resposta backend:", error.response?.data);
        console.error("Mensagem Axios:", error.message);
        console.error("Código:", error.code);

        const mensagem =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Não foi possível realizar o login.";

        alert(mensagem);
      } else if (error instanceof Error) {
        console.error("Erro:", error.message);
        alert(error.message);
      } else {
        console.error("Erro desconhecido:", error);
        alert("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Entrar
      </h1>

      <Link
        to="/register"
        className="flex justify-center bg-green-600 text-white text-sm px-3 py-2 rounded-md hover:bg-green-700 transition mb-5"
      >
        Criar uma conta
      </Link>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >
        <input
          className="border p-3 rounded w-full"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <input
          className="border p-3 rounded w-full"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded w-full disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}