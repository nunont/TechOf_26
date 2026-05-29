import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { Box, Button, TextField } from "@mui/material";


export default function ResetPassword(){
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  useEffect(()=> {

    if(!oobCode){
      //ERROR
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
    .then((email) => {
      setEmail(email);
    })
  }, [oobCode])

  async function handleSubmit(){
    await confirmPasswordReset(auth, oobCode, password);
  }

  return (<Box>
    <TextField value={password} onChange={(e) => setPassword(e.target.value)} />
    <Button onClick={handleSubmit} >Reset</Button>
  </Box>)
} 