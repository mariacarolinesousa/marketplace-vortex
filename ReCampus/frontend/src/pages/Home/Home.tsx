import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdCard from "../../components/AdCard/AdCard";
import { api } from "../../services/api";
import type{ Ad } from "../../types/Ad";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadAds() {
  try {
    const response = await api.get("/ads", {
  params: {
    search,
    },
  });

    console.log("Resposta da API:", response.data);

    setAds(response.data.ads ?? response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  loadAds();
}, [search]);

  return (
    <Layout>

      <h1 className="text-4xl font-bold mb-8">
        Últimos anúncios
      </h1>

      <SearchBar onSearch={setSearch} />

      {loading && (
        <p>Carregando anúncios...</p>
      )}

      {!loading && ads.length === 0 && (
        <p>Nenhum anúncio encontrado.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
          />
        ))}

      </div>

    </Layout>
  );
}