interface Props {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function Filters({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <input
        className="border rounded p-3 w-full"
        placeholder="Pesquisar anúncio..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="border rounded p-3 w-full mt-4"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >

        <option value="">
          Todas categorias
        </option>

        <option>
          Eletrônicos
        </option>

        <option>
          Livros
        </option>

        <option>
          Roupas
        </option>

        <option>
          Móveis
        </option>
      </select>
    </div>
  );

}