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
import { getClubs } from '../api/clubs';
import { extractErrorMessage } from '../utils/errors';

function Home() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getClubs({ limit: 50 })
            .then((data) => setClubs(data))
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                Clubes de padel
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Escolhe um clube para ver os campos disponíveis e fazer a tua marcação.
            </Typography>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            )}
            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && clubs.length === 0 && (
                <Alert severity="info">Ainda não existem clubes registados.</Alert>
            )}

            <Grid container spacing={3}>
                {clubs.map((club) => (
                    <Grid key={club._id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardActionArea component={RouterLink} to={`/clubs/${club._id}`} sx={{ height: '100%', alignItems: 'stretch' }}>
                                <CardContent>
                                    <Typography variant="h6">{club.name}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mt: 1 }}>
                                        <PlaceIcon fontSize="small" />
                                        <Typography variant="body2">
                                            {[club.city, club.country].filter(Boolean).join(', ') || 'Localização não indicada'}
                                        </Typography>
                                    </Box>
                                    {club.phone && (
                                        <Chip size="small" label={club.phone} sx={{ mt: 1.5 }} />
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
