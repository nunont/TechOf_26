
function Menu(){

  const users = [
    {
      name: "John Doe",
      age: 39
    },
    {
      name: "Daniel Doe",
      age: 25
    },
    {
      name: "Carolina Silva",
      age: 27
    }
  ];

  return (
    <ul>
      { users.map((user, i) => 
        <li key={i}>{user.name} - {user.age}</li>
      ) }
    </ul>
  )

}

export default Menu;