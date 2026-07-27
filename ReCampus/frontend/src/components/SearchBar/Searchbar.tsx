import { useState } from "react";

interface Props {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [search, setSearch] = useState("");

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Pesquisar anúncios..."
        className="w-full border rounded-lg p-4"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </div>
  );
}