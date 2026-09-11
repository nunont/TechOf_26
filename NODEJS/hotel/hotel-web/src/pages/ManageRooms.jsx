import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { getMyHotel } from '../api/hotels';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../api/rooms';
import { extractErrorMessage } from '../utils/errors';

const emptyForm = { name: '', type: 'double', pricePerNight: '' };

function ManageRooms() {
    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    const loadRooms = (hotelId) => getRooms({ hotel: hotelId, limit: 100 }).then(setRooms);

    useEffect(() => {
        getMyHotel()
            .then((hotelData) => {
                setHotel(hotelData);
                if (hotelData) {
                    return loadRooms(hotelData._id);
                }
                return null;
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleCreate = (event) => {
        event.preventDefault();
        setError('');
        setSubmitting(true);
        createRoom({ ...form, pricePerNight: Number(form.pricePerNight) })
            .then((newRoom) => {
                setRooms((prev) => [...prev, newRoom]);
                setForm(emptyForm);
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setSubmitting(false));
    };

    const handleToggleActive = (room) => {
        updateRoom(room._id, { active: !room.active })
            .then((updated) => {
                setRooms((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
            })
            .catch((err) => setError(extractErrorMessage(err)));
    };

    const handleDelete = (id) => {
        deleteRoom(id)
            .then(() => setRooms((prev) => prev.filter((r) => r._id !== id)))
            .catch((err) => setError(extractErrorMessage(err)));
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!hotel) {
        return (
            <Container sx={{ py: 5 }}>
                <Alert severity="warning">
                    Ainda não criaste o perfil do teu hotel. Vai a "O meu perfil" para o criares antes de adicionares quartos.
                </Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                Os meus quartos — {hotel.name}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Adicionar novo quarto
                </Typography>
                <Box component="form" onSubmit={handleCreate}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
                        <TextField
                            label="Nome"
                            value={form.name}
                            onChange={handleChange('name')}
                            required
                        />
                        <TextField
                            select
                            label="Tipo"
                            value={form.type}
                            onChange={handleChange('type')}
                            sx={{ minWidth: 140 }}
                        >
                            <MenuItem value="single">Single</MenuItem>
                            <MenuItem value="double">Double</MenuItem>
                            <MenuItem value="suite">Suite</MenuItem>
                        </TextField>
                        <TextField
                            label="Preço/noite (€)"
                            type="number"
                            value={form.pricePerNight}
                            onChange={handleChange('pricePerNight')}
                            required
                            slotProps={{ htmlInput: { min: 0, step: 0.5 } }}
                        />
                        <Button type="submit" variant="contained" disabled={submitting} sx={{ height: 56 }}>
                            {submitting ? 'A adicionar...' : 'Adicionar quarto'}
                        </Button>
                    </Stack>
                </Box>
            </Paper>

            {rooms.length === 0 && <Alert severity="info">Ainda não adicionaste nenhum quarto.</Alert>}

            <Grid container spacing={3}>
                {rooms.map((room) => (
                    <Grid key={room._id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6">{room.name}</Typography>
                                    <Chip size="small" label={room.type} />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {room.pricePerNight}€ / noite
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={room.active}
                                            onChange={() => handleToggleActive(room)}
                                        />
                                    }
                                    label={room.active ? 'Ativo' : 'Inativo'}
                                />
                                <IconButton onClick={() => handleDelete(room._id)} aria-label="Eliminar quarto">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ManageRooms;
