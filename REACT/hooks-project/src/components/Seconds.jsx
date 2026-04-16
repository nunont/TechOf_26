import { useEffect, useState } from "react";


export default function Seconds() {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000)

    return () => clearInterval(interval);
  }, [])

  return (<>
    <h2>Seconds: {seconds}</h2>
  </>);

}
