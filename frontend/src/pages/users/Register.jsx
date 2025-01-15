import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, FormControlLabel, Checkbox, Container, Box, Paper } from '@mui/material';

export default function Register() {
    const navigate = useNavigate();

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
        const { username, unhashedPw, phoneNumber } = data;

        try {
            const path = FormTypes.RESIDENT ? '/admin/users' : '/admin/admin';
            const responseData = await axios.post(path, { username, unhashedPw, phoneNumber });
            // check for error depends on response from server
            if (responseData.error) {
                console.log(responseData.error);
                console.log(responseData.msg);
            } else {
                setData(initialData);
                const userString = JSON.stringify(responseData.data);
                localStorage.setItem('user', userString);
                console.log("Logged in as: " + userString);
                navigate('/dashboard');
            }
        } catch (error) {
            console.log("Error during login: " + error);
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