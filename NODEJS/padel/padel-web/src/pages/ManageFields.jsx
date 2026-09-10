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
import { getMyClub } from '../api/clubs';
import { getFields, createField, updateField, deleteField } from '../api/fields';
import { extractErrorMessage } from '../utils/errors';

const emptyForm = { name: '', type: 'outdoor', pricePerHour: '' };

function ManageFields() {
    const [club, setClub] = useState(null);
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    const loadFields = (clubId) => getFields({ club: clubId, limit: 100 }).then(setFields);

    useEffect(() => {
        getMyClub()
            .then((clubData) => {
                setClub(clubData);
                if (clubData) {
                    return loadFields(clubData._id);
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
        createField({ ...form, pricePerHour: Number(form.pricePerHour) })
            .then((newField) => {
                setFields((prev) => [...prev, newField]);
                setForm(emptyForm);
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setSubmitting(false));
    };

    const handleToggleActive = (field) => {
        updateField(field._id, { active: !field.active })
            .then((updated) => {
                setFields((prev) => prev.map((f) => (f._id === updated._id ? updated : f)));
            })
            .catch((err) => setError(extractErrorMessage(err)));
    };

    const handleDelete = (id) => {
        deleteField(id)
            .then(() => setFields((prev) => prev.filter((f) => f._id !== id)))
            .catch((err) => setError(extractErrorMessage(err)));
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
                    Ainda não criaste o perfil do teu clube. Vai a "O meu perfil" para o criares antes de adicionares campos.
                </Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                Os meus campos — {club.name}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Adicionar novo campo
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
                            <MenuItem value="outdoor">Exterior</MenuItem>
                            <MenuItem value="indoor">Interior</MenuItem>
                        </TextField>
                        <TextField
                            label="Preço/hora (€)"
                            type="number"
                            value={form.pricePerHour}
                            onChange={handleChange('pricePerHour')}
                            required
                            slotProps={{ htmlInput: { min: 0, step: 0.5 } }}
                        />
                        <Button type="submit" variant="contained" disabled={submitting} sx={{ height: 56 }}>
                            {submitting ? 'A adicionar...' : 'Adicionar campo'}
                        </Button>
                    </Stack>
                </Box>
            </Paper>

            {fields.length === 0 && <Alert severity="info">Ainda não adicionaste nenhum campo.</Alert>}

            <Grid container spacing={3}>
                {fields.map((field) => (
                    <Grid key={field._id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6">{field.name}</Typography>
                                    <Chip size="small" label={field.type} />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {field.pricePerHour}€ / hora
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={field.active}
                                            onChange={() => handleToggleActive(field)}
                                        />
                                    }
                                    label={field.active ? 'Ativo' : 'Inativo'}
                                />
                                <IconButton onClick={() => handleDelete(field._id)} aria-label="Eliminar campo">
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

export default ManageFields;
