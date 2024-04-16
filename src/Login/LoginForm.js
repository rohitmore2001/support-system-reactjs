import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../User/Appbar';

const LoginForm = ({ onLogin }) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        userType: ''
    });

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });

    };


    const navigate = useNavigate();

    const handleGoToRegister = () => {
        navigate('/register');
    };

    const handleLogin = (event) => {
        event.preventDefault();
        localStorage.setItem('userName', loginData.username);
        const registeredData = localStorage.getItem('registeredData');
        const users = registeredData ? JSON.parse(registeredData) : [];
        const foundUser = users.find(
            (user) =>
                user.username === loginData.username &&
                user.password === loginData.password &&
                user.userType === loginData.userType
        );
        if (foundUser) {
            // Set user type before navigating
            navigate('/');
            localStorage.setItem('currentUser', loginData.userType);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid credentials',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <>
            <ResponsiveAppBar userType={loginData.userType ? loginData.userType : 'userType' } />
            <form onSubmit={handleLogin} className='registration-form'>
                <h2>Login form</h2>
                <TextField
                    label='Username'
                    type='text'
                    name='username'
                    value={loginData.username}
                    onChange={handleFormChange}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    label='Password'
                    type='password'
                    name='password'
                    value={loginData.password}
                    onChange={handleFormChange}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    select
                    label='Login As'
                    name='userType'
                    value={loginData.userType}
                    onChange={handleFormChange}
                    fullWidth
                    margin='normal'
                >
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='user'>User</MenuItem>
                    <MenuItem value='tech-support'>Tech Support</MenuItem>
                </TextField>
                <Button type='submit' variant='contained' color='primary'>
                    Login
                </Button>
                <p>
                    New user?{' '}
                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleGoToRegister}>
                        click to register
                    </span>
                </p>
            </form>
        </>
    );
};

export default LoginForm;
