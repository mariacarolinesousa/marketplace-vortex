import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdCard from "../../components/AdCard/AdCard";
import api from "../../services/apiClient";
import type{ Ad } from "../../types/Ad";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filters from "../../components/Filters/Filters";


export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAds() {
      setLoading(true);

      try {
        const response = await api.get("/ads", {
          params: {
            search,
          },
        });

        console.log("Resposta da API:", response.data);

        if (isMounted) {
          setAds(response.data.ads ?? response.data);
        }
      } catch (error) {
        console.error(error);
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
  }, [search]);

  const filteredAds = ads.filter((ad) => {

  const matchesTitle = ad.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "" ||
    ad.category === category;

  return matchesTitle && matchesCategory;

});


  return (
    <Layout>
      <section className="bg-blue-600 rounded-2xl p-12 text-white mb-10">

  <h1 className="text-5xl font-bold">
    Encontre tudo para a sua vida universitária
  </h1>

  <p className="mt-4 text-xl">
    Compre, venda ou doe produtos entre estudantes.
  </p>

    </section>

      <h1 className="text-4xl font-bold mb-8">
        Últimos anúncios
      </h1>

      {loading && (
        <p>Carregando anúncios...</p>
      )}

      {!loading && ads.length === 0 && (
        <p>Nenhum anúncio encontrado.</p>
      )}
        <Searchbar
        value={search}
        onChange={setSearch}
        />
        <Filters
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {filteredAds.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
          />
        ))}

      </div>

    </Layout>
  );
}
