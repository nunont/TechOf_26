import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { useAuth } from '../context/AuthContext';
import { getFieldById } from '../api/fields';
import { createBooking } from '../api/bookings';
import { extractErrorMessage } from '../utils/errors';

const durations = [1, 1.5, 2];

function toIsoDateTime(date, time) {
    return new Date(`${date}T${time}:00`).toISOString();
}

function addHours(date, time, hours) {
    const start = new Date(`${date}T${time}:00`);
    return new Date(start.getTime() + hours * 60 * 60 * 1000).toISOString();
}

function FieldDetail() {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const [field, setField] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({ date: '', time: '', duration: 1 });

    useEffect(() => {
        getFieldById(id)
            .then(setField)
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

        createBooking({
            field: id,
            startTime: toIsoDateTime(form.date, form.time),
            endTime: addHours(form.date, form.time, Number(form.duration)),
        })
            .then(() => {
                setSuccess('Marcação criada com sucesso!');
                setForm({ date: '', time: '', duration: 1 });
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

    if (!field) {
        return (
            <Container sx={{ py: 5 }}>
                <Alert severity="warning">Campo não encontrado.</Alert>
            </Container>
        );
    }

    const canBook = !isAuthenticated || user?.role === 'customer';

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                {field.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {field.club?.name} · {field.type === 'indoor' ? 'Interior' : 'Exterior'}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
                {field.pricePerHour}€ / hora
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Fazer marcação
                </Typography>

                {!canBook && (
                    <Alert severity="info">Só contas de jogador podem fazer marcações.</Alert>
                )}

                {canBook && (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Stack spacing={2}>
                            {error && <Alert severity="error">{error}</Alert>}
                            {success && <Alert severity="success">{success}</Alert>}

                            <TextField
                                label="Data"
                                type="date"
                                value={form.date}
                                onChange={handleChange('date')}
                                required
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                            <TextField
                                label="Hora de início"
                                type="time"
                                value={form.time}
                                onChange={handleChange('time')}
                                required
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                            <TextField
                                select
                                label="Duração"
                                value={form.duration}
                                onChange={handleChange('duration')}
                            >
                                {durations.map((d) => (
                                    <MenuItem key={d} value={d}>
                                        {d} hora{d > 1 ? 's' : ''}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Button type="submit" variant="contained" size="large" disabled={submitting}>
                                {isAuthenticated
                                    ? submitting ? 'A marcar...' : 'Confirmar marcação'
                                    : 'Entrar para marcar'}
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}

export default FieldDetail;
