import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { getHotelById } from '../api/hotels';
import { getRooms } from '../api/rooms';
import { extractErrorMessage } from '../utils/errors';

function HotelDetail() {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        Promise.all([getHotelById(id), getRooms({ hotel: id, limit: 100 })])
            .then(([hotelData, roomsData]) => {
                setHotel(hotelData);
                setRooms(roomsData);
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 5 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!hotel) {
        return (
            <Container sx={{ py: 5 }}>
                <Alert severity="warning">Hotel não encontrado.</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 5 }}>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link component={RouterLink} to="/" underline="hover" color="inherit">
                    Hotéis
                </Link>
                <Typography color="text.primary">{hotel.name}</Typography>
            </Breadcrumbs>

            <Typography variant="h4" gutterBottom>
                {hotel.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {[hotel.address, hotel.city, hotel.country].filter(Boolean).join(', ') || 'Sem morada indicada'}
            </Typography>
            {hotel.phone && <Typography variant="body2" color="text.secondary">Tel: {hotel.phone}</Typography>}

            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                Quartos
            </Typography>

            {rooms.length === 0 && <Alert severity="info">Este hotel ainda não tem quartos disponíveis.</Alert>}

            <Grid container spacing={3}>
                {rooms.map((room) => (
                    <Grid key={room._id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Typography variant="h6">{room.name}</Typography>
                                    <Chip
                                        size="small"
                                        label={room.type}
                                        color={room.type === 'suite' ? 'secondary' : 'default'}
                                    />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {room.pricePerNight}€ / noite
                                </Typography>
                                {!room.active && (
                                    <Chip size="small" color="warning" label="Inativo" sx={{ mt: 1 }} />
                                )}
                            </CardContent>
                            <CardActions>
                                <Button
                                    component={RouterLink}
                                    to={`/rooms/${room._id}`}
                                    fullWidth
                                    variant="contained"
                                    disabled={!room.active}
                                >
                                    Reservar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default HotelDetail;
