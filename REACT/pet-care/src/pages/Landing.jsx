import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Nav = styled.nav`
  position: sticky;
  top:0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #c4bfbf;
`

export default function Landing(){

  const { user, logout } = useAuth();

  async function handleLogout(){
    await logout();
  }

  return (
    <Box sx={{ background: '#f0f0f0', minHeight: '100vh'}}>
      <Nav>
        <Box component={Link} to="/">
          Pet Care
        </Box>
        <Box>
          {
            !user ? <>
            <Button component={Link} to="/login" variant="text">Login</Button>
            <Button component={Link} to="/register" variant="contained">Register</Button>
            </>
          :
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
          }
          
        </Box>
      </Nav>
    </Box>
  )
}