import { useContext } from "react"
import UserContext from "../context/UserContext"


export default function UserDisplay(){

  const user = useContext(UserContext);

  return (<div>
    <h1>{user.name}</h1>
    <p>Email: {user.email}</p>
    <p>Age: {user.age}</p>
  </div>)

}