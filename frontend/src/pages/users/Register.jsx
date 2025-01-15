import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, FormControlLabel, Checkbox, Container, Box, Paper } from '@mui/material';

export default function Register() {
    // enum for formtypes
    const FormTypes = Object.freeze({
        ADMIN: "admin",
        RESIDENT: "resident",
    });

    const [formType, setFormType] = useState(FormTypes.RESIDENT);

    const initialData = {
        username: '',
        unhashedPw: '',
        phoneNumber: '',
    };
    const [data, setData] = useState(initialData)
    
    async function registerUser(e) {
        e.preventDefault();
        const { name, password } = data;

        try {
            const path = formType = FormTypes.RESIDENT ? '/users' : '/admin';
            const { responseData } = await axios.post(path, { name, password });
            // check for error depends on response from server
            if (responseData.error) {
                // error handling
                console.error(responseData.error)
            } else {
                setData(initialData);
                // not sure where the use JSON starts (responseData.payload.data?)
                localStorage.setItem('user', JSON.stringify(responseData.payload.data));
                console.log(`Logged in as: ${responseData.payload.data}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    document.title = "Login";

    return (
        <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center' }}>
            <Box component={Paper} p={10} boxShadow={3} width={400}>
                <Typography variant="h4" gutterBottom align="center"> Register </Typography>
                <form onSubmit={registerUser}>
                <TextField label="Username" variant="outlined" fullWidth margin="normal" required id="username" type="text"
                    value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                <TextField label="Password" variant="outlined" fullWidth margin="normal" required id="unhashedPw" type="password"
                    value={data.unhashedPw} onChange={(e) => setData({ ...data, unhashedPw: e.target.value })} />
                {formType == FormTypes.RESIDENT && 
                    <TextField label="Phone no." variant="outlined" fullWidth margin="normal" required id="phoneNumber" type="text"
                    value={data.phoneNumber} onChange={(e) => setData({ ...data, phoneNumber: e.target.value })} />
                }
                <FormControlLabel
                    control={<Checkbox checked={formType == FormTypes.ADMIN} onChange={(e) => setFormType(e.target.checked ? FormTypes.ADMIN : FormTypes.RESIDENT)} />}
                    label="Create an Admin"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth> Continue </Button>
                </form>
                
            </Box>
        </Container>
    );
}