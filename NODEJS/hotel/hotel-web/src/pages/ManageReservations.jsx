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
import { getMyHotel } from '../api/hotels';
import { getMyHotelReservations, updateReservation } from '../api/reservations';
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

function ManageReservations() {
    const [hotel, setHotel] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actioningId, setActioningId] = useState(null);

    const loadReservations = () => getMyHotelReservations().then((result) => {
        const sorted = [...result].sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
        setReservations(sorted);
    });

    useEffect(() => {
        getMyHotel()
            .then((hotelData) => {
                setHotel(hotelData);
                if (hotelData) {
                    return loadReservations();
                }
                return null;
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStatusChange = (reservation, status) => {
        setError('');
        setActioningId(reservation._id);
        updateReservation(reservation._id, { status })
            .then((updated) => {
                setReservations((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
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

    if (!hotel) {
        return (
            <Container sx={{ py: 5 }}>
                <Alert severity="warning">
                    Ainda não criaste o perfil do teu hotel. Vai a "O meu perfil" para o criares.
                </Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                Reservas — {hotel.name}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {reservations.length === 0 && (
                <Alert severity="info">Ainda não existem reservas para os teus quartos.</Alert>
            )}

            {reservations.length > 0 && (
                <TableContainer component={Paper} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Quarto</TableCell>
                                <TableCell>Hóspede</TableCell>
                                <TableCell>Período</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservations.map((reservation) => (
                                <TableRow key={reservation._id}>
                                    <TableCell>{reservation.room?.name || '—'}</TableCell>
                                    <TableCell>{reservation.guest?.name || '—'}</TableCell>
                                    <TableCell>{formatRange(reservation.checkIn, reservation.checkOut)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={reservation.status}
                                            color={statusColor[reservation.status] || 'default'}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            {reservation.status === 'pending' && (
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    disabled={actioningId === reservation._id}
                                                    onClick={() => handleStatusChange(reservation, 'confirmed')}
                                                >
                                                    Confirmar
                                                </Button>
                                            )}
                                            {reservation.status !== 'cancelled' && (
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    variant="outlined"
                                                    disabled={actioningId === reservation._id}
                                                    onClick={() => handleStatusChange(reservation, 'cancelled')}
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

export default ManageReservations;
