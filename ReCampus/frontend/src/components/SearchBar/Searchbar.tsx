import { useState } from "react";

interface Props {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
      <input
        type="text"
        placeholder="Pesquisar anúncios..."
        className="w-full border rounded-lg p-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-3 shadow-sm"
      />
  );
}