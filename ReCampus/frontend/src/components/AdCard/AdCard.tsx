import type { Ad } from "../../types/Ad";
import { Link } from "react-router-dom";

interface Props {
  ad: Ad;
}

export default function AdCard({ ad }: Props) {
  return (
    <Link to={`/ads/${ad.id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full h-52 object-cover"
        />

        <div className="p-4">

          <h2 className="font-bold text-lg">
            {ad.title}
          </h2>

          <p className="text-gray-500">
            {ad.location}
          </p>

          <p className="text-sm mt-2 line-clamp-2">
            {ad.description}
          </p>

          <div className="mt-4">
            {ad.isDonation ? (
              <span className="text-green-600 font-bold">
                Doação
              </span>
            ) : (
              <span className="text-blue-600 font-bold text-xl">
                R$ {Number(ad.price).toFixed(2)}
              </span>
            )}
          </div>

        </div>

      </div>
    </Link>
  );
}