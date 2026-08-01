import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import api from "../../services/apiClient";
import type { Ad } from "../../types/Ad";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAd() {
      if (!id) {
        setError("ID do anúncio não informado.");
        setLoading(false);
        return;
      }

      try {
        setError("");

        const response = await api.get(`/ads/${id}`);

        console.log("Resposta do anúncio:", response.data);

        const receivedAd =
          response.data.ad ??
          response.data;

        setAd(receivedAd);
      } catch (error: unknown) {
        console.error("Erro ao carregar anúncio:", error);

        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              error.response?.data?.error ||
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
        <div className="max-w-3xl mx-auto">
          <p className="text-red-600 mb-4">
            {error}
          </p>

          <Link
            to="/home"
            className="text-blue-600 hover:underline"
          >
            Voltar para os anúncios
          </Link>
        </div>
      </Layout>
    );
  }

  if (!ad) {
    return (
      <Layout>
        <p>Anúncio não encontrado.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="max-w-4xl mx-auto">
        <Link
          to="/home"
          className="inline-block mb-6 text-blue-600 hover:underline"
        >
          ← Voltar
        </Link>

        <article className="border rounded-lg overflow-hidden bg-white">
          {ad.imageUrl && (
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">
              {ad.title}
            </h1>

            {ad.price !== null &&
              ad.price !== undefined && (
                <p className="text-2xl font-semibold text-green-700">
                  R$ {Number(ad.price).toFixed(2)}
                </p>
              )}

            <p className="text-gray-700">
              {ad.description}
            </p>

            <div className="border-t pt-4 space-y-2">
              <p>
                <strong>Categoria:</strong>{" "}
                {ad.category}
              </p>

              <p>
                <strong>Condição:</strong>{" "}
                {ad.condition}
              </p>

              <p>
                <strong>Localização:</strong>{" "}
                {ad.location}
              </p>
            </div>
          </div>
        </article>
      </main>
    </Layout>
  );
}