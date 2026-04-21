import { useCallback, useMemo, useState } from "react";


export default function Duble(){

  const [number, setNumber] = useState(1);
  const [count, setCount] = useState(0);

  const double = useMemo(() => {
    console.log("Calcular o dobro");
    return number * 2;
  }, [number]);

  const increment = useCallback(() => {
    console.log("A Incrementar pelo callback");
    setCount(count => count + 1);
  }, [])

  return (
    <div>
      <h2>Numero: {number}</h2>
      <h2>Dobro: {double}</h2>
      <h2>Contador: {count}</h2>

      <button onClick={() => setNumber(number + 1)}>Aumentar Numero</button>
      <button onClick={increment}>Incrementa o Contador</button>
    </div>
  )

}
