
import { Box, TextField, Button, Alert } from "@mui/material";
import { useState } from 'react'
import { useAuth } from "../context/AuthContext";

export default function Register() {

  const [form, setForm] = useState(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  );
  const [error, setError] = useState('');
  const { register } = useAuth();
  const handleChange = (e) => setForm(f => ({...f, [e.target.name]: e.target.value}))

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('')
    if (form.password !== form.confirmPassword){
      setError('As password têm que ser iguais')
      return;
    }

    try {
      await register(form.name, form.email, form.password);
    } catch(err){
      setError(err.code);
    }

  }

  return (
    <Box component="form" onSubmit={onSubmit}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField label="Full name" name="name" value={form.name} 
        onChange={handleChange} required/>
      <TextField label="Email" name="email" value={form.email} 
        onChange={handleChange} required/>
      <TextField label="Password" name="password" type="password" 
        value={form.password} onChange={handleChange} required/>
      <TextField label="Confirm password" name="confirmPassword" 
        type="password" value={form.confirmPassword} onChange={handleChange} required/>
      <Button type="submit">Register</Button>
    </Box>
  )

}
