import { useState } from "react";

function Counter(){

  const [counter, setCounter] = useState(0);
  const name = "Nuno";
  const age = 20;

  function showName(name, event){
    alert(name)
    console.log(event)
  }

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => showName(name)}>ShowName</button>
      <button onClick={(event) => showName(age, event)}>Age</button>

    </div>
  )

}

export default Counter;