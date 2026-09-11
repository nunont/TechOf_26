import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import HotelDetail from './pages/HotelDetail';
import RoomDetail from './pages/RoomDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyReservations from './pages/MyReservations';
import ManageRooms from './pages/ManageRooms';
import ManageReservations from './pages/ManageReservations';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotels/:id" element={<HotelDetail />} />
                <Route path="/rooms/:id" element={<RoomDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route element={<ProtectedRoute role="guest" />}>
                    <Route path="/my-reservations" element={<MyReservations />} />
                </Route>

                <Route element={<ProtectedRoute role="hotel" />}>
                    <Route path="/manage/rooms" element={<ManageRooms />} />
                    <Route path="/manage/reservations" element={<ManageReservations />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    );
}

export default App;
