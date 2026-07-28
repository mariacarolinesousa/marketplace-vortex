import { useState } from "react";

interface Props {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBar({ value, onChange,

 }: Props) {
  return (
      <input
        placeholder="Pesquisar anúncios..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl p-3 mb-8"
      />
  );
}