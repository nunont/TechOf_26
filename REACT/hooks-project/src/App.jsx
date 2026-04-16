
import { useState } from 'react'
import './App.css'
import Counter from './components/Counter'
import Father from './components/Father'
import Seconds from './components/Seconds'
import UserDisplay from './components/UserDisplay'
import UserContext from './context/UserContext'
import UserForm from './components/UserForm'

function App() {

  const [name, setName] = useState("Nuno Marques");
  const [email, setEmail] = useState("nuno.marques@six-factor.com")
  const [age, setAge] = useState(27);

  return (<>
    <UserContext.Provider value={{name, setName, email, setEmail, age, setAge}}>
      {/* <Seconds />
      <Counter />
      <Father/> */}

      <UserDisplay />
      <UserForm />
    </UserContext.Provider>
  </>)
}

export default App
