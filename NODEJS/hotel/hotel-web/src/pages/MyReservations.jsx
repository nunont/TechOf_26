import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { getMyReservations, deleteReservation } from '../api/reservations';
import { extractErrorMessage } from '../utils/errors';

const statusColor = {
    pending: 'warning',
    confirmed: 'success',
    cancelled: 'default',
};

function formatRange(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return `${start.toLocaleDateString('pt-PT', { dateStyle: 'short' })} - ${end.toLocaleDateString('pt-PT', { dateStyle: 'short' })}`;
}

function MyReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = () => {
        setLoading(true);
        getMyReservations()
            .then(setReservations)
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const handleCancel = (id) => {
        deleteReservation(id)
            .then(() => setReservations((prev) => prev.filter((r) => r._id !== id)))
            .catch((err) => setError(extractErrorMessage(err)));
    };

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                As minhas reservas
            </Typography>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            )}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {!loading && !error && reservations.length === 0 && (
                <Alert severity="info">Ainda não tens nenhuma reserva.</Alert>
            )}

            <List>
                {reservations.map((reservation) => (
                    <ListItem
                        key={reservation._id}
                        divider
                        secondaryAction={
                            <Tooltip title="Cancelar reserva">
                                <IconButton edge="end" onClick={() => handleCancel(reservation._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    >
                        <ListItemText
                            primary={reservation.room?.name || 'Quarto'}
                            secondary={formatRange(reservation.checkIn, reservation.checkOut)}
                        />
                        <Chip
                            size="small"
                            label={reservation.status}
                            color={statusColor[reservation.status] || 'default'}
                            sx={{ mr: 2 }}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default MyReservations;
