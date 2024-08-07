"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import axios from 'axios';

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`, { username:username, passowrd:password,role:"admin" },
        { withCredentials: true}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    if (username === '' || password === '') {
      setError('Both fields are required');
      return;
    }
    try {
      const data = await login(username, password);
      if (data.success) {
        router.push('/admindashboard'); // Redirect to a protected page
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            MSP ASSIGNMENT ADMIN LOGIN
          </Typography>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default AdminLogin;
