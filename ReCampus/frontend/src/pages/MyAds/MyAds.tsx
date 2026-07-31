import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Layout from "../../components/Layout/Layout";
import api from "../../services/apiClient";
import AdCard from "../../components/AdCard/AdCard";
import type { Ad } from "../../types/Ad";

export default function MyAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchMyAds() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/ads/my");

      console.log("Resposta de Meus Anúncios:", response.data);

      const receivedAds = Array.isArray(response.data)
        ? response.data
        : response.data.ads ?? [];

      setAds(receivedAds);
    } catch (error: unknown) {
      console.error("Erro completo:", error);

      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("Resposta backend:", error.response?.data);

        setError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Não foi possível carregar seus anúncios."
        );
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    const loadMyAds = async () => {
      try {
        await fetchMyAds();
      } catch {
        if (isMounted) {
          setError("Não foi possível carregar seus anúncios.");
        }
      }
    };

    void loadMyAds();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este anúncio?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/ads/${id}`);

      alert("Anúncio excluído com sucesso!");

      await fetchMyAds();
    } catch (error: unknown) {
      console.error("Erro ao excluir:", error);

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            "Erro ao excluir anúncio."
        );
      } else {
        alert("Erro desconhecido ao excluir anúncio.");
      }
    }
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">
        Meus anúncios
      </h1>

      {loading && (
        <p>Carregando seus anúncios...</p>
      )}

      {!loading && error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && ads.length === 0 && (
        <p>Você ainda não publicou nenhum anúncio.</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ads.map((ad) => (
            <div key={ad.id}>
              <AdCard ad={ad} />

              <div className="flex gap-2 mt-3">
                <Link
                  to={`/ads/edit/${ad.id}`}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded text-center hover:bg-yellow-600"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(ad.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}