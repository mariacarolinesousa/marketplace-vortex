import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import api from "../../services/apiClient";
import AdCard from "../../components/AdCard/AdCard";
import type { Ad } from "../../types/Ad";

export default function MyAds() {
  const [ads, setAds] = useState<Ad[]>([]);

  async function loadAds() {
    try {
      const response = await api.get("/ads/my");
      setAds(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadAds();
  }, []);

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este anúncio?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/ads/${id}`);

      alert("Anúncio excluído com sucesso!");

      loadAds();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir anúncio.");
    }
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">
        Meus anúncios
      </h1>

      {ads.length === 0 && (
        <p>Você ainda não publicou nenhum anúncio.</p>
      )}

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
                onClick={() => handleDelete(ad.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
