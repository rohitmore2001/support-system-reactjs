import React, { useState, useEffect } from 'react';
import { Box, Card, Table, TableHead, TableBody, TableRow, TableCell, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Swal from 'sweetalert2';
import '../styles/Main.css';
import { useNavigate } from 'react-router-dom';

const AdminComponent = () => {
    // Retrieve tickets from local storage
    const [tickets, setTickets] = useState(JSON.parse(localStorage.getItem('tickets')) || []);
    // Assume registeredData contains user data with username and usertype
    const [registeredData, setRegisteredData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // State to track selected image URL

    const navigate = useNavigate();
    const handleCreateTicket = () => {
        navigate('/createTicket');
    };

    const handleResolve = (ticketId, message) => {
        const updatedTickets = tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status: 'Resolved', message: message } : ticket
        );
        // Update state and local storage
        setTickets(updatedTickets);
        localStorage.setItem('tickets', JSON.stringify(updatedTickets));
        Swal.fire(`Ticket ${ticketId} resolved with message: ${message}`, '', 'success');
    };

    const handleDelete = (ticketId) => {
        Swal.fire({
            title: 'Do you want to resolve a ticket?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            input: 'text', // Adding input field for message
            inputLabel: 'Enter resolution message', // Label for input field
            inputPlaceholder: 'Type your message here...', // Placeholder for input field
        }).then((result) => {
            if (result.isConfirmed) {
                const message = result.value; // Retrieve the entered message
                handleResolve(ticketId, message); // Pass the message to handleResolve
            } else if (result.isDenied) {
                Swal.fire('Ticket is live', '', 'info');
            }
        });
    };

    const handleAssign = (ticketId, assignedTo, name) => {
        const updatedTickets = tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, assignedTo: assignedTo } : ticket
        );
        // Update state and local storage
        setTickets(updatedTickets);
        localStorage.setItem('tickets', JSON.stringify(updatedTickets));
        Swal.fire(`Ticket ${ticketId} of ${name} assigned to ${assignedTo}`, '', 'info');
    };

    const handleChangeStatus = (ticketId, status) => {
        const updatedTickets = tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status: status } : ticket
        );
        // Update state and local storage
        setTickets(updatedTickets);
        localStorage.setItem('tickets', JSON.stringify(updatedTickets));
        Swal.fire(`Status of Ticket ${ticketId} changed to ${status}`, '', 'info');
    };

    useEffect(() => {
        // Fetch registered user data here and update state
        // For demonstration, I'm simulating fetching data from localStorage
        const storedData = JSON.parse(localStorage.getItem('registeredData')) || [];
        console.log('Fetched data:', storedData); // Log fetched data
        setRegisteredData(storedData);
    }, []);
    
    useEffect(() => {
        console.log('Registered users:', registeredData); // Log registered users
    }, [registeredData]);
    
    // Filter registered users with usertype as 'tech-support' and get their usernames
    const techSupportUsers = registeredData
    .filter(user => user.userType === 'tech-support')
    .map(user => user.username);

    // Function to open image dialog
    const openImageDialog = (imageURL) => {
        setSelectedImage(imageURL);
    };

    // Function to close image dialog
    const handleCloseImageDialog = () => {
        setSelectedImage(null);
    };

    return (
        <div style={{ margin: '2%' }}>
            {tickets.length === 0 ? (
                <p>No tickets found.</p>
            ) : (
                <>
                    <Card sx={{ m: 1 }}>
                        <h2 className='ticket-text-ml'>Tickets</h2>
                        <Box sx={{ overflowX: 'auto' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="table-head">Username</TableCell>
                                        <TableCell className="table-head">Subject</TableCell>
                                        <TableCell className="table-head">Description</TableCell>
                                        <TableCell className="table-head">Attachment</TableCell>
                                        <TableCell className="table-head">Assigned To</TableCell>
                                        <TableCell className="table-head">Status</TableCell>
                                        <TableCell className="table-head">Mark as</TableCell>
                                        <TableCell className="table-head">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tickets.map((ticket) => (
                                        <TableRow key={ticket.id}>
                                            <TableCell className="table-cell">{ticket.name}</TableCell>
                                            <TableCell className="table-cell">{ticket.subject}</TableCell>
                                            <TableCell className="table-cell">{ticket.description}</TableCell>
                                            <TableCell className='table-cell'>
                                                {ticket.imageBase64 && ticket.imageBase64.startsWith('data:image/') ? (
                                                    <img src={ticket.imageBase64} alt="Attachment" style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }} onClick={() => openImageDialog(ticket.imageBase64)} />
                                                ) : (
                                                    <a href={ticket.imageBase64} target="_blank" rel="noopener noreferrer">{ticket.filename}</a>
                                                )}
                                            </TableCell>
                                            <TableCell className="table-cell">
                                                <Select
                                                    size='small'
                                                    value={ticket.assignedTo}
                                                    onChange={(e) => handleAssign(ticket.id, e.target.value, ticket.name)}
                                                >
                                                    {techSupportUsers.map((user) => (
                                                        <MenuItem key={user} value={user}>
                                                            {user}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell className="table-cell">{ticket.status}</TableCell>
                                            <TableCell className="table-cell">
                                                <Select
                                                    size='small'
                                                    value={ticket.status}
                                                    onChange={(e) => handleChangeStatus(ticket.id, e.target.value)}
                                                >
                                                    <MenuItem value="Open">Open</MenuItem>
                                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                                    <MenuItem value="Resolved">Resolved</MenuItem>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="table-cell">
                                                <Button sx={{ mr: 1, mb: 1 }} size="small" variant="contained" color="success" onClick={() => handleDelete(ticket.id)} >
                                                    Resolve
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Card>
                </>
            )}

            {/* Image Dialog */}
            <Dialog open={!!selectedImage} onClose={handleCloseImageDialog}>
                <DialogTitle>Attachment</DialogTitle>
                <DialogContent>
                    <img src={selectedImage} alt="Attachment" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseImageDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminComponent;
