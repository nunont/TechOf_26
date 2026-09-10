import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1b6d4c',
        },
        secondary: {
            main: '#d6a419',
        },
        background: {
            default: '#f4f6f5',
        },
    },
    shape: {
        borderRadius: 10,
    },
    typography: {
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 600 },
    },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: { textTransform: 'none', fontWeight: 600 },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: { boxShadow: 'none', borderBottom: '1px solid rgba(0,0,0,0.08)' },
            },
        },
    },
});

export default theme;
