import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { useAuth } from '../context/AuthContext';

function NavBar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        setAnchorEl(null);
        logout();
        navigate('/');
    };

    return (
        <AppBar position="sticky" color="inherit" sx={{ bgcolor: 'background.paper' }}>
            <Toolbar sx={{ gap: 1 }}>
                <SportsTennisIcon color="primary" />
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary' }}
                >
                    Padel Booking
                </Typography>
                <Button component={RouterLink} to="/" color="inherit">
                    Clubes
                </Button>

                {isAuthenticated && user?.role === 'customer' && (
                    <Button component={RouterLink} to="/my-bookings" color="inherit">
                        As minhas marcações
                    </Button>
                )}
                {isAuthenticated && user?.role === 'club' && (
                    <>
                        <Button component={RouterLink} to="/manage/fields" color="inherit">
                            Os meus campos
                        </Button>
                        <Button component={RouterLink} to="/manage/bookings" color="inherit">
                            Marcações
                        </Button>
                    </>
                )}

                {!isAuthenticated && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button component={RouterLink} to="/login" color="inherit">
                            Entrar
                        </Button>
                        <Button component={RouterLink} to="/register" variant="contained">
                            Registar
                        </Button>
                    </Box>
                )}

                {isAuthenticated && (
                    <>
                        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
                                {user?.name?.charAt(0)?.toUpperCase() || '?'}
                            </Avatar>
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
                            <MenuItem disabled sx={{ opacity: '1 !important' }}>
                                {user?.name} ({user?.role})
                            </MenuItem>
                            <MenuItem
                                component={RouterLink}
                                to="/profile"
                                onClick={() => setAnchorEl(null)}
                            >
                                O meu perfil
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Terminar sessão</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
