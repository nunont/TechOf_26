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
import { getMyBookings, deleteBooking } from '../api/bookings';
import { extractErrorMessage } from '../utils/errors';

const statusColor = {
    pending: 'warning',
    confirmed: 'success',
    cancelled: 'default',
};

function formatRange(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' })} - ${endDate.toLocaleTimeString('pt-PT', { timeStyle: 'short' })}`;
}

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = () => {
        setLoading(true);
        getMyBookings()
            .then(setBookings)
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const handleCancel = (id) => {
        deleteBooking(id)
            .then(() => setBookings((prev) => prev.filter((b) => b._id !== id)))
            .catch((err) => setError(extractErrorMessage(err)));
    };

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                As minhas marcações
            </Typography>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            )}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {!loading && !error && bookings.length === 0 && (
                <Alert severity="info">Ainda não tens nenhuma marcação.</Alert>
            )}

            <List>
                {bookings.map((booking) => (
                    <ListItem
                        key={booking._id}
                        divider
                        secondaryAction={
                            <Tooltip title="Cancelar marcação">
                                <IconButton edge="end" onClick={() => handleCancel(booking._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    >
                        <ListItemText
                            primary={booking.field?.name || 'Campo'}
                            secondary={formatRange(booking.startTime, booking.endTime)}
                        />
                        <Chip
                            size="small"
                            label={booking.status}
                            color={statusColor[booking.status] || 'default'}
                            sx={{ mr: 2 }}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default MyBookings;
