import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import PlaceIcon from '@mui/icons-material/Place';
import { getHotels } from '../api/hotels';
import { extractErrorMessage } from '../utils/errors';

function Home() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getHotels({ limit: 50 })
            .then((data) => setHotels(data))
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                Hotéis
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Escolhe um hotel para ver os quartos disponíveis e fazer a tua reserva.
            </Typography>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            )}
            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && hotels.length === 0 && (
                <Alert severity="info">Ainda não existem hotéis registados.</Alert>
            )}

            <Grid container spacing={3}>
                {hotels.map((hotel) => (
                    <Grid key={hotel._id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardActionArea component={RouterLink} to={`/hotels/${hotel._id}`} sx={{ height: '100%', alignItems: 'stretch' }}>
                                <CardContent>
                                    <Typography variant="h6">{hotel.name}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mt: 1 }}>
                                        <PlaceIcon fontSize="small" />
                                        <Typography variant="body2">
                                            {[hotel.city, hotel.country].filter(Boolean).join(', ') || 'Localização não indicada'}
                                        </Typography>
                                    </Box>
                                    {hotel.phone && (
                                        <Chip size="small" label={hotel.phone} sx={{ mt: 1.5 }} />
                                    )}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Home;
