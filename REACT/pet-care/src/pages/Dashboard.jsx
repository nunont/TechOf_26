
import { Box } from "@mui/material"
import { useAuth } from "../context/AuthContext"


export default function Dashboard(){

  const {user, userProfile} = useAuth();

  return (
    <Box>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
      <p>{userProfile?.name}</p>
    </Box>
  )
}