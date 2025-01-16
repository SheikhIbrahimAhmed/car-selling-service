import React, { useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");



    const handleUserLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Email and Password are required');
            return;
        }

        try {
            const response = await axios.post("https://car-selling-api.vercel.app/api/auth/login", {
                email,
                password
            });

            const data = response.data;

            if (response.status !== 200) {
                toast.error(data?.error || 'Something went wrong');
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setMessage(data?.message);
            setError("");
            toast.success('Login successful!');
            setEmail('');
            setPassword('');
            navigate("/create-post");

        } catch (err) {
            setError(err.message);
            setMessage("");
            toast.error(`Error: ${err.message}`);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,

            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 5,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        color: '#333',
                        textAlign: 'center',
                        marginBottom: 3,
                    }}
                >
                    Welcome Back!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'gray',
                        textAlign: 'center',
                        marginBottom: 4,
                    }}
                >
                    Please enter your credentials to continue.
                </Typography>
                <form>
                    <Box sx={{ marginBottom: 3 }}>
                        <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 4 }}>
                        <TextField
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleUserLogin}
                        sx={{
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: 2,
                            '&:hover': {
                                backgroundColor: '#1976d2',
                                boxShadow: 4,
                            }
                        }}
                    >
                        Login
                    </Button>
                </form>

            </Box>
        </Box>
    );

};

export default Login;
