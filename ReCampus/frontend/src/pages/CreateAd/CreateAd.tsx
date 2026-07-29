import { useState } from "react";
import { api } from "../../services/api";
import Layout from "../../components/Layout/Layout";

export default function CreateAd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [isDonation, setIsDonation] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!image) {
      alert("Selecione uma imagem.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("isDonation", String(isDonation));
    formData.append("image", image);
    console.log("Enviando anúncio...");
    console.log({
        title,
        description,
        category,
        condition,
        location,
        price,
        isDonation,
        image,
    });

    try {
      await api.post("/ads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar o anúncio.");
    }
  }

  return (
    <Layout>
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Criar anúncio
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="border p-3 rounded w-full"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-3 rounded w-full"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Condição"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          className="border p-3 rounded w-full"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDonation}
            onChange={(e) => setIsDonation(e.target.checked)}
          />

          É uma doação
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.length) {
              setImage(e.target.files[0]);
            }
          }}
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Publicar anúncio
        </button>
      </form>
    </div>
    </Layout>
  );
}