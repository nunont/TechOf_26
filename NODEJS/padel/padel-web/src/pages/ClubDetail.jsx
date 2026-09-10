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
import { getClubById } from '../api/clubs';
import { getFields } from '../api/fields';
import { extractErrorMessage } from '../utils/errors';

function ClubDetail() {
    const { id } = useParams();
    const [club, setClub] = useState(null);
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        Promise.all([getClubById(id), getFields({ club: id, limit: 100 })])
            .then(([clubData, fieldsData]) => {
                setClub(clubData);
                setFields(fieldsData);
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

    if (!club) {
        return (
            <Container sx={{ py: 5 }}>
                <Alert severity="warning">Clube não encontrado.</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 5 }}>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link component={RouterLink} to="/" underline="hover" color="inherit">
                    Clubes
                </Link>
                <Typography color="text.primary">{club.name}</Typography>
            </Breadcrumbs>

            <Typography variant="h4" gutterBottom>
                {club.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {[club.address, club.city, club.country].filter(Boolean).join(', ') || 'Sem morada indicada'}
            </Typography>
            {club.phone && <Typography variant="body2" color="text.secondary">Tel: {club.phone}</Typography>}

            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                Campos
            </Typography>

            {fields.length === 0 && <Alert severity="info">Este clube ainda não tem campos disponíveis.</Alert>}

            <Grid container spacing={3}>
                {fields.map((field) => (
                    <Grid key={field._id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Typography variant="h6">{field.name}</Typography>
                                    <Chip
                                        size="small"
                                        label={field.type}
                                        color={field.type === 'indoor' ? 'secondary' : 'default'}
                                    />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {field.pricePerHour}€ / hora
                                </Typography>
                                {!field.active && (
                                    <Chip size="small" color="warning" label="Inativo" sx={{ mt: 1 }} />
                                )}
                            </CardContent>
                            <CardActions>
                                <Button
                                    component={RouterLink}
                                    to={`/fields/${field._id}`}
                                    fullWidth
                                    variant="contained"
                                    disabled={!field.active}
                                >
                                    Marcar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ClubDetail;
