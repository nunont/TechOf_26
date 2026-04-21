import { act, useMemo, useState } from "react";
import useFilterText from "../hooks/useFilterText";

const products = [
    { id: 1, name: 'Camisola', category: 'Category A', active: true},
    { id: 2, name: 'Calças', category: 'Category B', active: true },
    { id: 3, name: 'Sapatos', category: 'Category A', active: true },
    { id: 4, name: 'Chapéu', category: 'Category C', active: false },
    { id: 5, name: 'Meias', category: 'Category B', active: false },
];

export default function ProductsFilterList() {

  const [text, setText, onlyActives, setOnlyActives, filterProducts] = useFilterText(products);

  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <input type="checkbox" checked={onlyActives} onChange={(e) => setOnlyActives(e.target.checked)} />
      <ul>
        { filterProducts.map(p => (
          <li key={p.id}>{p.name} - {p.active ? "Ativo" : "Não Ativo"}</li>
        ))}
      </ul>
    </div>
  )


}