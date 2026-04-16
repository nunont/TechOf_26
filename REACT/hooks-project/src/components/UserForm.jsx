import { useContext } from "react"
import UserContext from "../context/UserContext"

export default function UserForm(){
  
  const user = useContext(UserContext);

  return (<div>
    <input type="text" value={user.name} onChange={(e) => user.setName(e.target.value)} />
    <input type="text" value={user.email} onChange={(e) => user.setEmail(e.target.value)} />
    <input type="text" value={user.age} onChange={(e) => user.setAge(e.target.value)} />

  </div>)

}