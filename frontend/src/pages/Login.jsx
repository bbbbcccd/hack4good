import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, FormControlLabel, Checkbox, Container, Box, Paper } from '@mui/material';

export default function Login() {
    // enum for formtypes
    const FormTypes = Object.freeze({
        ADMIN: "admin",
        RESIDENT: "resident",
    });

    const [formType, setFormType] = useState(FormTypes.RESIDENT);

    const initialData = {
        name: '',
        password: '',
    };
    const [data, setData] = useState(initialData)
    
    async function loginUser(e) {
        e.preventDefault();
        const { name, password } = data;

        try {
            // if admin then how??
            const { responseData } = await axios.post('/login', { name, password });
            // check for error depends on response from server
            if (responseData.error) {
                // error handling
                console.error(responseData.error)
            } else {
                setData(initialData);
                // not sure where the use JSON starts (responseData.payload.data?)
                localStorage.setItem('user', JSON.stringify(responseData.payload));
                console.log(`Logged in as: ${responseData.payload}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    document.title = "Login";

    return (
        <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center' }}>
            <Box component={Paper} p={10} boxShadow={3} width={400}>
                <Typography variant="h4" gutterBottom align="center"> Login </Typography>
                <form onSubmit={loginUser}>
                <TextField label="Username" variant="outlined" fullWidth margin="normal" required id="name" type="text"
                    value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                <TextField label="Password" variant="outlined" fullWidth margin="normal" required id="password" type="password"
                    value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                <FormControlLabel
                    control={<Checkbox checked={formType == FormTypes.ADMIN} onChange={(e) => setFormType(e.target.checked ? FormTypes.ADMIN : FormTypes.RESIDENT)} />}
                    label="I'm an admin"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth> Continue </Button>
                </form>
                
            </Box>
        </Container>
    );
}