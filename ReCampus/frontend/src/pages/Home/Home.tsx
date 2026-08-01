import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdCard from "../../components/AdCard/AdCard";
import api from "../../services/apiClient";
import type { Ad } from "../../types/Ad";

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAds() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/ads");

        console.log("Resposta dos anúncios:", response.data);

        const receivedAds: Ad[] = Array.isArray(response.data)
          ? response.data
          : response.data.ads ?? [];

        if (isMounted) {
          setAds(receivedAds);
        }
      } catch (error: unknown) {
        console.error("Erro ao carregar anúncios:", error);

        if (!isMounted) {
          return;
        }

        if (axios.isAxiosError(error)) {
          console.error("Status:", error.response?.status);
          console.error("Resposta do backend:", error.response?.data);

          setError(
            error.response?.data?.message ||
              error.response?.data?.error ||
              "Não foi possível carregar os anúncios."
          );
        } else {
          setError("Ocorreu um erro inesperado.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadAds();

    return () => {
      isMounted = false;
    };
  }, []);

  function normalizeText(value: unknown) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  const filteredAds = useMemo(() => {
    const searchTerm = normalizeText(search);

    if (!searchTerm) {
      return ads;
    }

    return ads.filter((ad) => {
      const searchableText = normalizeText(
        [
          ad.title,
          ad.description,
          ad.category,
          ad.condition,
          ad.location,
        ].join(" ")
      );

      return searchableText.includes(searchTerm);
    });
  }, [ads, search]);

  return (
    <Layout>
      <main className="max-w-7xl mx-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-3">
            Buscar itens
          </h1>

          <p className="text-gray-600 mb-6">
            Encontre produtos anunciados pela comunidade acadêmica.
          </p>

          <input
            type="search"
            placeholder="Pesquisar por título, categoria ou localização..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </section>

        {loading && (
          <p className="text-gray-600">
            Carregando anúncios...
          </p>
        )}

        {!loading && error && (
          <div className="border border-red-300 bg-red-50 rounded-lg p-4">
            <p className="text-red-700">
              {error}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          filteredAds.length === 0 &&
          search.trim() !== "" && (
            <div className="border rounded-lg p-6 text-center">
              <p className="text-gray-600">
                Nenhum anúncio encontrado para “{search}”.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          ads.length === 0 &&
          search.trim() === "" && (
            <div className="border rounded-lg p-6 text-center">
              <p className="text-gray-600">
                Nenhum anúncio publicado ainda.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          filteredAds.length > 0 && (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filteredAds.length}{" "}
                {filteredAds.length === 1
                  ? "anúncio encontrado"
                  : "anúncios encontrados"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAds.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                  />
                ))}
              </div>
            </>
          )}
      </main>
    </Layout>
  );
}
