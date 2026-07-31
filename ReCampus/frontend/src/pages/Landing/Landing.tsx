import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  "Todos",
  "Livros",
  "Engenharia",
  "Computação",
];

const ads = [
  {
    id: 1,
    title: "Livro de Cálculo I",
    category: "Livros",
    price: "R$ 50,00",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  },
  {
    id: 2,
    title: "Notebook Dell Inspiron",
    category: "Computação",
    price: "R$ 1.800,00",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },
  {
    id: 3,
    title: "Kit de Engenharia",
    category: "Engenharia",
    price: "R$ 120,00",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758",
  },
];


export default function Landing() {

  const [category, setCategory] = useState("Todos");


  const filteredAds =
    category === "Todos"
      ? ads
      : ads.filter(
          (ad) => ad.category === category
        );


  return (
    <div className="min-h-screen bg-gray-50">


      {/* HERO */}
      <section className="bg-blue-600 text-white px-10 py-24">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-6xl font-bold max-w-3xl">
            Transformando o campus em uma economia circular
          </h1>


          <p className="mt-6 text-xl max-w-2xl">
            O ReCampus conecta estudantes para comprar,
            vender e doar produtos, reduzindo desperdícios
            e criando uma comunidade universitária mais sustentável.
          </p>


          <div className="flex gap-4 mt-10">

            <Link to="/home">
            <button>Entrar no ReCampus</button>
            </Link>


            <Link
              to="/"
              className="border border-white px-8 py-4 rounded-xl font-bold"
            >
              Buscar itens
            </Link>

          </div>

        </div>

      </section>



      {/* ESTATÍSTICAS */}
      <section className="max-w-6xl mx-auto py-16 grid md:grid-cols-4 gap-6">


        <Stat
          number="1.250+"
          text="Estudantes cadastrados"
        />

        <Stat
          number="850+"
          text="Produtos anunciados"
        />

        <Stat
          number="420"
          text="Itens reutilizados"
        />

        <Stat
          number="300kg"
          text="Materiais reaproveitados"
        />


      </section>



      {/* COMO FUNCIONA */}
      <section className="max-w-6xl mx-auto py-10">

        <h2 className="text-4xl font-bold">
          Como funciona?
        </h2>


        <div className="grid md:grid-cols-3 gap-8 mt-8">

          <Card
            title="1. Anuncie"
            text="Publique produtos que você não utiliza mais."
          />


          <Card
            title="2. Encontre"
            text="Busque materiais de outros estudantes."
          />


          <Card
            title="3. Reutilize"
            text="Dê uma nova vida aos produtos dentro do campus."
          />


        </div>

      </section>




      {/* VITRINE */}
      <section className="max-w-6xl mx-auto py-16">


        <div className="flex justify-between items-center">

          <h2 className="text-4xl font-bold">
            Últimos anúncios
          </h2>


          <Link
            to="/"
            className="text-blue-600 font-bold"
          >
            Ver todos
          </Link>


        </div>



        {/* FILTROS */}

        <div className="flex gap-3 mt-8 flex-wrap">

          {categories.map((item)=>(

            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`
              px-5 py-2 rounded-full border
              ${
                category === item
                ? "bg-blue-600 text-white"
                : "bg-white"
              }
              `}
            >
              {item}

            </button>

          ))}


        </div>



        {/* CARDS */}

        <div className="grid md:grid-cols-3 gap-8 mt-10">


          {filteredAds.map((ad)=>(

            <div
              key={ad.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >

              <img
                src={ad.image}
                className="h-52 w-full object-cover"
              />


              <div className="p-5">

                <h3 className="font-bold text-xl">
                  {ad.title}
                </h3>


                <p className="text-gray-500">
                  {ad.category}
                </p>


                <strong className="block mt-3 text-blue-600">
                  {ad.price}
                </strong>


              </div>


            </div>

          ))}


        </div>


      </section>



      {/* CTA FINAL */}

      <section className="bg-gray-900 text-white py-20 text-center">

        <h2 className="text-4xl font-bold">
          Faça parte da comunidade ReCampus
        </h2>


        <p className="mt-4">
          Venda, compre ou doe produtos dentro da universidade.
        </p>


        <Link
          to="/create"
          className="inline-block mt-8 bg-blue-600 px-10 py-4 rounded-xl font-bold"
        >
          Anunciar produto
        </Link>


      </section>


    </div>
  );
}




function Stat({
  number,
  text
}:{
  number:string;
  text:string;
}){

  return (

    <div className="bg-white rounded-xl shadow p-8 text-center">

      <h3 className="text-4xl font-bold text-blue-600">
        {number}
      </h3>

      <p className="mt-2 text-gray-600">
        {text}
      </p>

    </div>

  );

}



function Card({
  title,
  text
}:{
  title:string;
  text:string;
}){

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="font-bold text-xl">
        {title}
      </h3>


      <p className="mt-3 text-gray-600">
        {text}
      </p>


    </div>

  );

}
