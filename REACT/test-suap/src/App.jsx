import { supabase } from './utils/supabase'
import { useEffect, useState, useRef } from 'react'

import './App.css'

function App() {

  const [todos, setTodos] = useState([])
  
  useEffect(() => {
    async function getTodos() {
      const { data : todos } = await supabase.from('todos').select()
      console.log(todos )

      if (todos) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [])

  const addTodo = async () => {
    const { data : todo } = await supabase.from('todos').insert({ name: inputRef.current.value }).select().single()
    
    inputRef.current.value = ''

    if (todo) {
      setTodos([...todos, todo])
    }
  }

  const inputRef = useRef()

  return (
    <>
      <input type="text" placeholder='Add a todo' ref={inputRef} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
      
    </>
  )
}

export default App
