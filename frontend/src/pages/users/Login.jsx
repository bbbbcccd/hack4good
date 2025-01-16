import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, FormControlLabel, Checkbox, Container, Box, Paper } from '@mui/material';

// NOT TESTED YET: seems like the password encryption is not yet done in backend
export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/dashboard');
        }
    });

    // enum for formtypes
    const FormTypes = Object.freeze({
        ADMIN: "admin",
        RESIDENT: "resident",
    });

    const [formType, setFormType] = useState(FormTypes.RESIDENT);

    const initialData = {
        username: '',
        password: '',
    };
    const [data, setData] = useState(initialData)
    
    async function loginUser(e) {
        e.preventDefault();
        const { username, password } = data;
        // NOT DONE: seems like admin get path not done yet
        const path = FormTypes.RESIDENT ? '/user' : '/admin';

        try {
            const response = await axios.get(path, { username, password });
            console.log(response);
            if (response.error) {
                console.log(response.error);
                console.log(response.msg);
            } else {
                setData(initialData);
                const userString = JSON.stringify(response.data);
                localStorage.setItem('user', userString);
                console.log("Logged in as: " + userString);
                navigate('/dashboard');
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
                <TextField label="Username" variant="outlined" fullWidth margin="normal" required id="username" type="text"
                    value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                <TextField label="Password" variant="outlined" fullWidth margin="normal" required id="password" type="password"
                    value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                <FormControlLabel
                    control={<Checkbox checked={formType == FormTypes.ADMIN} onChange={(e) => setFormType(e.target.checked ? FormTypes.ADMIN : FormTypes.RESIDENT)} />}
                    label="I'm an admin"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth> Continue </Button>
                </form>

                <Typography variant='body2' align='center' mt={2} sx={{ textDecoration: 'none', color: 'grey' }} >Don't have an account? <br/> Contact an admin to create one.</Typography>
            </Box>
        </Container>
    );
}