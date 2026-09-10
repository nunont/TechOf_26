import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { useAuth } from '../context/AuthContext';
import { extractErrorMessage } from '../utils/errors';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSubmitting(true);
        login(form)
            .then(() => {
                const redirectTo = location.state?.from?.pathname || '/';
                navigate(redirectTo, { replace: true });
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setSubmitting(false));
    };

    return (
        <Container maxWidth="xs" sx={{ py: 8 }}>
            <Paper elevation={0} variant="outlined" sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Entrar
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Acede à tua conta para marcares campos ou geres o teu clube.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}
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
                        />
                        <Button type="submit" variant="contained" size="large" disabled={submitting}>
                            {submitting ? 'A entrar...' : 'Entrar'}
                        </Button>
                    </Stack>
                </Box>

                <Typography variant="body2" sx={{ mt: 3 }}>
                    Ainda não tens conta?{' '}
                    <Link component={RouterLink} to="/register">
                        Regista-te
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Login;
