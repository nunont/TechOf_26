import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ role }) {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && user?.role !== role) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
