import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import '../styles/Main.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../User/Appbar';

const RegistrationForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        userType: ''
    });

    const navigate = useNavigate()

    const handleGoToLogin = ()=>{
        navigate('/login')
    }
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUserTypeChange = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, userType: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('formData', formData);
        // Store the registered data in JSON format
        const registeredData = localStorage.getItem('registeredData');
        let data = registeredData ? JSON.parse(registeredData) : [];
        data.push(formData);
        localStorage.setItem('registeredData', JSON.stringify(data));
        Swal.fire({
            icon: "success",
            title: "Registration Successfull",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/login')
    };

    return (
        <>
        <ResponsiveAppBar/>
        <form onSubmit={handleSubmit} className='registration-form'>
            <h2>Registration form</h2>
            <TextField
                select
                label="Login As"
                name="userType"
                value={formData.userType}
                onChange={handleUserTypeChange}
                fullWidth
                margin="normal"
            >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="tech-support">Tech Support</MenuItem>
            </TextField>
            <TextField
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Register
            </Button>
            <p>Already a user? <span style={{cursor:'pointer' , color:'blue'}} onClick={handleGoToLogin}>click to login</span></p>
        </form>
        </>
    );
};

export default RegistrationForm;
