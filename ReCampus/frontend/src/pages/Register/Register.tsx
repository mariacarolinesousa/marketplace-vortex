import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../services/apiClient";

export default function Register() {
  console.log("Register carregou");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Cadastro realizado com sucesso!");

      navigate("/login");

    } catch (error) {

      if (axios.isAxiosError(error)) {
        console.log(
          "Erro backend:",
          error.response?.data
        );

        alert(
          error.response?.data?.message ||
          "Erro ao cadastrar usuário"
        );

      } else {
        alert("Erro desconhecido");
      }
    }
  }


  return (
    <div className="max-w-md mx-auto mt-20">

      <h1 className="text-3xl font-bold mb-6">
        Criar conta
      </h1>


      <form
        onSubmit={handleRegister}
        className="space-y-4"
      >

        <input
          className="border p-3 rounded w-full"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />


        <input
          className="border p-3 rounded w-full"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        <input
          className="border p-3 rounded w-full"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded w-full"
        >
          Cadastrar
        </button>

      </form>


    </div>
  );
}
