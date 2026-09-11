import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useAuth } from '../context/AuthContext';
import { extractErrorMessage } from '../utils/errors';

const initialForm = { name: '', email: '', password: '', role: 'guest' };

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleRoleChange = (_event, role) => {
        if (role) {
            setForm((prev) => ({ ...prev, role }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSubmitting(true);
        register(form)
            .then(() => navigate('/profile', { replace: true }))
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setSubmitting(false));
    };

    return (
        <Container maxWidth="xs" sx={{ py: 8 }}>
            <Paper elevation={0} variant="outlined" sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Criar conta
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Escolhe se és hóspede ou representas um hotel.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}

                        <ToggleButtonGroup
                            value={form.role}
                            exclusive
                            onChange={handleRoleChange}
                            fullWidth
                            color="primary"
                        >
                            <ToggleButton value="guest">Sou hóspede</ToggleButton>
                            <ToggleButton value="hotel">Sou um hotel</ToggleButton>
                        </ToggleButtonGroup>

                        <TextField
                            label="Nome"
                            value={form.name}
                            onChange={handleChange('name')}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={handleChange('email')}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={form.password}
                            onChange={handleChange('password')}
                            required
                            fullWidth
                            helperText="Pelo menos 4 caracteres"
                        />
                        <Button type="submit" variant="contained" size="large" disabled={submitting}>
                            {submitting ? 'A criar conta...' : 'Criar conta'}
                        </Button>
                    </Stack>
                </Box>

                <Typography variant="body2" sx={{ mt: 3 }}>
                    Já tens conta?{' '}
                    <Link component={RouterLink} to="/login">
                        Entra
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Register;
