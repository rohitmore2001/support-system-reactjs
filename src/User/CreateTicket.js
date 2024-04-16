import React, { useState } from 'react';
import { Card, CardContent, TextField, TextareaAutosize, Button, Typography, Box, Avatar } from '@mui/material';
import '../styles/Main.css';
import ResponsiveAppBar from './Appbar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const TicketForm = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleSubmit = (event) => {
    event.preventDefault();

    let imageBase64 = null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imageBase64 = reader.result;
        const newTicket = {
          id: new Date().getTime(), // Generate unique ID for each ticket
          subject,
          description,
          imageBase64, // Include base64 string of the image
          status: 'In Progress',
          assignedTo: '-',
          name : userName,
        };

        // Retrieve existing tickets from local storage or initialize as empty array
        const existingTickets = JSON.parse(localStorage.getItem('tickets')) || [];

        // Add new ticket to the list of existing tickets
        const updatedTickets = [...existingTickets, newTicket];

        // Store updated tickets in local storage
        localStorage.setItem('tickets', JSON.stringify(updatedTickets));
        Swal.fire({
          icon: 'success',
          title: 'Your ticket is created',
          showConfirmButton: false,
          timer: 1500,
        });

        // Clear form fields after submission
        setSubject('');
        setDescription('');
        setFile(null);
        setImagePreview(null);

        // Redirect to support page
        navigate('/support');
      };
      reader.readAsDataURL(file);
    } else {
      const newTicket = {
        id: new Date().getTime(), // Generate unique ID for each ticket
        subject,
        description,
        imageBase64, // Include base64 string of the image
        status: 'In Progress',
        assignedTo: '-',
        name : userName,
      };

      // Retrieve existing tickets from local storage or initialize as empty array
      const existingTickets = JSON.parse(localStorage.getItem('tickets')) || [];

      // Add new ticket to the list of existing tickets
      const updatedTickets = [...existingTickets, newTicket];

      // Store updated tickets in local storage
      localStorage.setItem('tickets', JSON.stringify(updatedTickets));
      Swal.fire({
        icon: 'success',
        title: 'Your ticket is created',
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear form fields after submission
      setSubject('');
      setDescription('');
      setFile(null);
      setImagePreview(null);

      // Redirect to support page
      navigate('/support');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setImagePreview(null);
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Card variant="outlined" className="create-ticket-card">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Raise a Ticket
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="subject"
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <TextareaAutosize
                id="description"
                placeholder="Describe Issue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                style={{ width: '100%', height: '7%', marginBottom: '16px', resize: 'vertical' }}
              />
            </div>
            <div>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="file">
                <Button variant="contained" component="span">
                  Attach Image
                </Button>
                {file && <span style={{ marginLeft: '8px' }}>{file.name}</span>}
              </label>
            </div>
            {imagePreview && (
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Image Preview:
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar alt="Image Preview" src={imagePreview} sx={{ width: 100, height: 100 }} />
                </Box>
              </div>
            )}
            <div>
              <Button sx={{ mt: 2 }} type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default TicketForm;
