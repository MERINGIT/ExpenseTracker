import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

const defaultTheme = createTheme();

// Base URL for API requests
const BASE_URL = 'http://54.91.182.191:3001/api';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    choice: false, // Initialize choice as false
  });

  const history = useHistory(); // Get the history object using useHistory hook

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password 
      
    ) {
      toast.error('All fields are required.');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Invalid email address.');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password should be at least 8 characters long.');
      return;
    }


    try {
      // Send Axios POST request using BASE_URL
      const response = await axios.post(`${BASE_URL}/signup`, formData);

      // Log response data
      console.log(response.data);

      // Store data in local storage
      localStorage.setItem('userData', JSON.stringify(response.data));

      // Show success toast message
      toast.success('User registered successfully!');

      // Navigate to sign-in page using history
      history.push('/');
    } catch (error) {
      console.error('Error:', error);
      // Show error toast message
      toast.error('Error registering user. Please try again.');
    }
  };

  const validateEmail = (email) => {
    // Email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="choice"
                      color="primary"
                      checked={formData.choice}
                      onChange={handleChange}
                    />
                  }
                  label="I agree to recieve daily email notification"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Toast container for displaying toast messages */}
        <ToastContainer position="bottom-center" autoClose={3000} />
      </Container>
    </ThemeProvider>
  );
}
