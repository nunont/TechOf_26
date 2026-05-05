import { useNavigate } from "react-router-dom"

export default function About(){

  const navigate = useNavigate();
  return (<>
    <h1>About Page</h1>
    <button onClick={() => navigate("/")}>Ir para Home</button>
  </>)
}