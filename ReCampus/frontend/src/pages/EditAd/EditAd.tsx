import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

import Layout from "../../components/Layout/Layout";
import api from "../../services/apiClient";

export default function EditAd() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAd() {
      if (!id) {
        setError("ID do anúncio não informado.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/ads/${id}`);

        const ad = response.data.ad ?? response.data;

        setTitle(ad.title ?? "");
        setDescription(ad.description ?? "");
        setCategory(ad.category ?? "");
        setCondition(ad.condition ?? "");
        setLocation(ad.location ?? "");
        setPrice(
          ad.price !== null && ad.price !== undefined
            ? String(ad.price)
            : ""
        );
      } catch (error: unknown) {
        console.error("Erro ao carregar anúncio:", error);

        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Não foi possível carregar o anúncio."
          );
        } else {
          setError("Erro inesperado ao carregar o anúncio.");
        }
      } finally {
        setLoading(false);
      }
    }

    void loadAd();
  }, [id]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!id) {
      alert("ID do anúncio não informado.");
      return;
    }

    try {
      setSaving(true);

      await api.put(`/ads/${id}`, {
        title,
        description,
        category,
        condition,
        location,
        price: price ? Number(price) : null,
      });

      alert("Anúncio atualizado com sucesso!");

      navigate("/my-ads");
    } catch (error: unknown) {
      console.error("Erro ao atualizar anúncio:", error);

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Não foi possível atualizar o anúncio."
        );
      } else {
        alert("Erro inesperado ao atualizar o anúncio.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <p>Carregando anúncio...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className="text-red-600">{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Editar anúncio
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            className="border p-3 rounded w-full"
            type="text"
            placeholder="Título"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            required
          />

          <textarea
            className="border p-3 rounded w-full"
            placeholder="Descrição"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            required
          />

          <input
            className="border p-3 rounded w-full"
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            required
          />

          <input
            className="border p-3 rounded w-full"
            type="text"
            placeholder="Condição"
            value={condition}
            onChange={(event) =>
              setCondition(event.target.value)
            }
            required
          />

          <input
            className="border p-3 rounded w-full"
            type="text"
            placeholder="Localização"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
            required
          />

          <input
            className="border p-3 rounded w-full"
            type="number"
            step="0.01"
            min="0"
            placeholder="Preço"
            value={price}
            onChange={(event) =>
              setPrice(event.target.value)
            }
          />

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded w-full disabled:opacity-60"
          >
            {saving
              ? "Salvando..."
              : "Salvar alterações"}
          </button>
        </form>
      </div>
    </Layout>
  );
}