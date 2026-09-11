import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { useAuth } from '../context/AuthContext';
import { getRoomById } from '../api/rooms';
import { createReservation } from '../api/reservations';
import { extractErrorMessage } from '../utils/errors';

function toIsoDate(date) {
    return new Date(`${date}T12:00:00`).toISOString();
}

function RoomDetail() {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({ checkIn: '', checkOut: '' });

    useEffect(() => {
        getRoomById(id)
            .then(setRoom)
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (fieldName) => (event) => {
        setForm((prev) => ({ ...prev, [fieldName]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        setError('');
        setSuccess('');
        setSubmitting(true);

        createReservation({
            room: id,
            checkIn: toIsoDate(form.checkIn),
            checkOut: toIsoDate(form.checkOut),
        })
            .then(() => {
                setSuccess('Reserva criada com sucesso!');
                setForm({ checkIn: '', checkOut: '' });
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setSubmitting(false));
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!room) {
        return (
            <Container sx={{ py: 5 }}>
                <Alert severity="warning">Quarto não encontrado.</Alert>
            </Container>
        );
    }

    const canBook = !isAuthenticated || user?.role === 'guest';

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                {room.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {room.hotel?.name} · {room.type}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
                {room.pricePerNight}€ / noite
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Fazer reserva
                </Typography>

                {!canBook && (
                    <Alert severity="info">Só contas de hóspede podem fazer reservas.</Alert>
                )}

                {canBook && (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Stack spacing={2}>
                            {error && <Alert severity="error">{error}</Alert>}
                            {success && <Alert severity="success">{success}</Alert>}

                            <TextField
                                label="Check-in"
                                type="date"
                                value={form.checkIn}
                                onChange={handleChange('checkIn')}
                                required
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                            <TextField
                                label="Check-out"
                                type="date"
                                value={form.checkOut}
                                onChange={handleChange('checkOut')}
                                required
                                slotProps={{ inputLabel: { shrink: true } }}
                            />

                            <Button type="submit" variant="contained" size="large" disabled={submitting}>
                                {isAuthenticated
                                    ? submitting ? 'A reservar...' : 'Confirmar reserva'
                                    : 'Entrar para reservar'}
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}

export default RoomDetail;
