import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../services/api";
import { Link } from "react-router-dom";



export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login realizado com sucesso!");

      navigate("/");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Erro backend:",
          error.response?.data
        );

        alert(
          error.response?.data?.message ||
          "Erro ao fazer login"
        );
      } else {
        console.error(error);
        alert("Erro desconhecido");
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">
        Entrar
      </h1>
      
    <Link
    to="/register"
    className="flex justify-center bg-green-600 text-white text-sm px-3 py-1.5 rounded-md 
    hover:bg-green-70
    transition"
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
        />

        <input
          className="border p-3 rounded w-full"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded w-full"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}