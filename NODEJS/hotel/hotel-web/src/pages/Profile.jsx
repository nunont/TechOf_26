import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../context/AuthContext';
import { getMyGuest, createGuest, updateGuest } from '../api/guests';
import { getMyHotel, createHotel, updateHotel } from '../api/hotels';
import { extractErrorMessage } from '../utils/errors';

const guestFields = [
    { name: 'name', label: 'Nome', type: 'text', required: true },
    { name: 'phone', label: 'Telefone', type: 'text' },
    { name: 'dateOfBirth', label: 'Data de nascimento', type: 'date' },
];

const hotelFields = [
    { name: 'name', label: 'Nome do hotel', type: 'text', required: true },
    { name: 'address', label: 'Morada', type: 'text' },
    { name: 'city', label: 'Cidade', type: 'text' },
    { name: 'country', label: 'País', type: 'text' },
    { name: 'phone', label: 'Telefone', type: 'text' },
];

function Profile() {
    const { user } = useAuth();
    const isHotel = user?.role === 'hotel';
    const fields = isHotel ? hotelFields : guestFields;
    const getMy = isHotel ? getMyHotel : getMyGuest;
    const create = isHotel ? createHotel : createGuest;
    const update = isHotel ? updateHotel : updateGuest;

    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getMy()
            .then((data) => {
                setProfile(data);
                if (data) {
                    setForm({
                        ...data,
                        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : '',
                    });
                }
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHotel]);

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);

        const action = profile ? update(profile._id, form) : create(form);
        action
            .then((data) => {
                setProfile(data);
                setSuccess('Perfil guardado com sucesso!');
            })
            .catch((err) => setError(extractErrorMessage(err)))
            .finally(() => setSaving(false));
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                O meu perfil
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Conta: {user?.name} ({user?.email}) · {isHotel ? 'Hotel' : 'Hóspede'}
            </Typography>

            <Paper variant="outlined" sx={{ p: 3 }}>
                {!profile && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        {isHotel
                            ? 'Ainda não criaste o perfil do teu hotel. Preenche os dados abaixo.'
                            : 'Ainda não criaste o teu perfil de hóspede. Preenche os dados abaixo.'}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">{success}</Alert>}

                        {fields.map((field) => (
                            <TextField
                                key={field.name}
                                label={field.label}
                                type={field.type}
                                value={form[field.name] || ''}
                                onChange={handleChange(field.name)}
                                required={field.required}
                                fullWidth
                                slotProps={field.type === 'date' ? { inputLabel: { shrink: true } } : undefined}
                            />
                        ))}

                        <Button type="submit" variant="contained" size="large" disabled={saving}>
                            {saving ? 'A guardar...' : profile ? 'Guardar alterações' : 'Criar perfil'}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default Profile;
