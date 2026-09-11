import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function NotFound() {
    return (
        <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
                404
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Não encontrámos a página que procuras.
            </Typography>
            <Box>
                <Button component={RouterLink} to="/" variant="contained">
                    Voltar ao início
                </Button>
            </Box>
        </Container>
    );
}

export default NotFound;
