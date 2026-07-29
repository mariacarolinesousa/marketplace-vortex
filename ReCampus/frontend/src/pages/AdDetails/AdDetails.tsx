import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { api } from "../../services/api";
import type { Ad } from "../../types/Ad";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    async function loadAd() {
      try {
        const response = await api.get(`/ads/${id}`);
        setAd(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadAd();
  }, [id]);

  if (!ad) {
    return (
      <Layout>
        <p className="p-8">Carregando...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid lg:grid-cols-2 gap-10">

        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full rounded-xl object-cover max-h-[500px]"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {ad.title}
          </h1>

          <p className="text-gray-500 mt-2">
            {ad.location}
          </p>

          <div className="mt-6">
            {ad.isDonation ? (
              <span className="text-green-600 text-3xl font-bold">
                Doação
              </span>
            ) : (
              <span className="text-blue-600 text-4xl font-bold">
                R$ {Number(ad.price).toFixed(2)}
              </span>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">
              Descrição
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              {ad.description}
            </p>
          </div>

          <div className="mt-8 border-t pt-6">
            <h2 className="font-bold text-xl">
              Anunciante
            </h2>

            <p>{ad.user.name}</p>
          </div>

        </div>

      </div>
    </Layout>
  );
}