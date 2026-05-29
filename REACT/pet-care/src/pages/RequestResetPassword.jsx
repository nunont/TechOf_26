import { Box, Button, TextField, Alert } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";

export default function RequestResetPassword(){
  const [email, setEmail] = useState('');
  const [error, setError] = useState('')

  async function handleRequest(){
    setError('')
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Email enviado com sucesso")
    })
    .catch((err) => {
      setError(err.code)
    })
  }

  return (<Box>
    {error && <Alert severity="error">{error}</Alert>}
    
    <TextField type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <Button onClick={handleRequest}>Reset Password</Button>
  </Box>)
}