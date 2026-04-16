
function UserDetails(){

  const userData = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    age: 30
  }

  return (
    <div>
      <h2>User Details</h2>
      {userData.age > 18 ? 
        <>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Age: {userData.age} </p>
        </> : 
        <b>The user is bellow legal age!</b>
      }
    </div>
  )
}

export default UserDetails;