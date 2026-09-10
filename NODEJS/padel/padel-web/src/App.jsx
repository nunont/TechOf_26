import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ClubDetail from './pages/ClubDetail';
import FieldDetail from './pages/FieldDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import ManageFields from './pages/ManageFields';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/clubs/:id" element={<ClubDetail />} />
                <Route path="/fields/:id" element={<FieldDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route element={<ProtectedRoute role="customer" />}>
                    <Route path="/my-bookings" element={<MyBookings />} />
                </Route>

                <Route element={<ProtectedRoute role="club" />}>
                    <Route path="/manage/fields" element={<ManageFields />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    );
}

export default App;
