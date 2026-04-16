import { useContext } from "react"
import UserContext from "../context/UserContext"

export default function ChildChild(){

  const user = useContext(UserContext);

  return (<>
    <h2>- - Child of Child</h2>  
    {user.name}
  </>)

}