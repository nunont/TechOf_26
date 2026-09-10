import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { getMyClub } from '../api/clubs';
import { getMyClubBookings, updateBooking } from '../api/bookings';
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

function ManageBookings() {
    const [club, setClub] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actioningId, setActioningId] = useState(null);

    const loadBookings = () => getMyClubBookings().then((result) => {
        const sorted = [...result].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        setBookings(sorted);
    });

    useEffect(() => {
        getMyClub()
            .then((clubData) => {
                setClub(clubData);
                if (clubData) {
                    return loadBookings();
                }
                return null;
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStatusChange = (booking, status) => {
        setError('');
        setActioningId(booking._id);
        updateBooking(booking._id, { status })
            .then((updated) => {
                setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setActioningId(null));
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!club) {
        return (
            <Container sx={{ py: 5 }}>
                <Alert severity="warning">
                    Ainda não criaste o perfil do teu clube. Vai a "O meu perfil" para o criares.
                </Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                Marcações — {club.name}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {bookings.length === 0 && (
                <Alert severity="info">Ainda não existem marcações para os teus campos.</Alert>
            )}

            {bookings.length > 0 && (
                <TableContainer component={Paper} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Campo</TableCell>
                                <TableCell>Jogador</TableCell>
                                <TableCell>Horário</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking.field?.name || '—'}</TableCell>
                                    <TableCell>{booking.customer?.name || '—'}</TableCell>
                                    <TableCell>{formatRange(booking.startTime, booking.endTime)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={booking.status}
                                            color={statusColor[booking.status] || 'default'}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            {booking.status === 'pending' && (
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    disabled={actioningId === booking._id}
                                                    onClick={() => handleStatusChange(booking, 'confirmed')}
                                                >
                                                    Confirmar
                                                </Button>
                                            )}
                                            {booking.status !== 'cancelled' && (
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    variant="outlined"
                                                    disabled={actioningId === booking._id}
                                                    onClick={() => handleStatusChange(booking, 'cancelled')}
                                                >
                                                    Cancelar
                                                </Button>
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}

export default ManageBookings;
