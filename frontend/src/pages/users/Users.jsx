import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

import Register from '../admin/RegisterPage.jsx';

export default function Users() {
    const WindowTypes = Object.freeze({
        REGISTER: 0,
        SUSPEND: 1,
        RESET: 2
    });
    const [currentWindow, setCurrentWindow] = useState(WindowTypes.REGISTER);

    const handleChange = (event, newWindow) => {
        setCurrentWindow(newWindow);
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={currentWindow} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Register" id="register-window" />
                        <Tab label="Suspend" id="suspend-window" />
                        <Tab label="Reset" id="reset-window" />
                    </Tabs>
                </Box>
                <div hidden={currentWindow !== WindowTypes.REGISTER} id="register-window">
                    <Register/>
                </div>
                <div hidden={currentWindow !== WindowTypes.SUSPEND} id="suspend-window">
                    TODO: SUSPEND
                </div>
                <div hidden={currentWindow !== WindowTypes.RESET} id="reset-window">
                    TODO: RESET
                </div>
            </Box>
        </>
    )
}
