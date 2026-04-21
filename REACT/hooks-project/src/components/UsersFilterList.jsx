import { act, useMemo, useState } from "react";
import useFilterText from "../hooks/useFilterText";

const users = [
    { id: 1, name: 'Nuno Marques', active: true},
    { id: 2, name: 'Bruna Caetano', active: true },
    { id: 3, name: 'Glauber', active: true },
    { id: 4, name: 'Emanuela', active: false },
    { id: 5, name: 'Clarice', active: false },
];

export default function UsersFilterList() {

  const [text, setText, onlyActives, setOnlyActives, filterUsers] = useFilterText(users);
  


  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <input type="checkbox" checked={onlyActives} onChange={(e) => setOnlyActives(e.target.checked)} />
      <ul>
        { filterUsers.map(p => (
          <li key={p.id}>{p.name} - {p.active ? "Ativo" : "Não Ativo"}</li>
        ))}
      </ul>
    </div>
  )


}