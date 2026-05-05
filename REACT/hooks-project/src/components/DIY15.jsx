import { useState } from "react";
import useCounter from "../hooks/useCounter";


export default function DIY15(){

  const [count, increment, decrement] = useCounter();

  return (
    <>
    <h1>Count: {count}</h1>
    <button onClick={decrement}>Decrementar</button>
    <button onClick={() => increment()}>Incrementar</button>
    </>
  )

}