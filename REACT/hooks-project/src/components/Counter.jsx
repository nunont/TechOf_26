import { useEffect, useState } from "react";

export default function Counter(){

  const [count, setCount] = useState(0);

  function incrementCounter(){
    setCount(count + 1);
  }

  useEffect(() => {
    document.title = `Counter: ${count}`
  }, [count])

  return (<div>
    <h1>Count: {count}</h1>
    <button onClick={incrementCounter}>Incremantar</button>
  </div>);

}