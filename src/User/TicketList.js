import React, { useState } from 'react';
import { Box ,Card, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import Swal from 'sweetalert2';
import '../styles/Main.css'
import { useNavigate } from 'react-router-dom';

const TicketList = () => {
    // Retrieve tickets from local storage
    const [tickets, setTickets] = useState(JSON.parse(localStorage.getItem('tickets')) || []);
    const loggedInTech = localStorage.getItem('userName');

    const navigate = useNavigate();

    const handleCreateTicket = () => {
        navigate('/createTicket');
    }

    const handleDelete = (ticketId) => {
        // Filter out the ticket with the specified ID
        Swal.fire({
            title: "Do you want to delete the ticket?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
                // Update state and local storage
                setTickets(updatedTickets);
                localStorage.setItem('tickets', JSON.stringify(updatedTickets));
                Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Ticket is live", "", "info");
            }
        });
    };

    return (
        <div style={{ margin: '2%' }}>
            {tickets.length === 0 ? (
                <p>No tickets found.</p>
            ) : (
                <>
                    {/* <Box className='raise-ticket'>
                        <h1>Welcome to Support</h1>
                        <div>
                            <p className='raise-ticket-text' onClick={handleCreateTicket}><span style={{fontSize:'22px' , fontWeight:'900'}}>+</span> Raise a new ticket</p>
                        </div>
                    </Box> */}
                    <Card sx={{ m: 2 }}>
                        <h2 className='ticket-text-ml'>Your Tickets</h2>
                        <Box sx={{ overflowX: 'auto' }}>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className='table-head'>Subject</TableCell>
                                    <TableCell className='table-head'>Description</TableCell>
                                    <TableCell className='table-head'>Attachment</TableCell>
                                    <TableCell className='table-head'>Status</TableCell>
                                    <TableCell className='table-head'>Resolved message</TableCell>

                                    <TableCell className='table-head'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.map((ticket) => (
                                    ticket.name === loggedInTech && (
                                    <TableRow key={ticket.id}>
                                        <TableCell className='table-cell'>{ticket.subject}</TableCell>
                                        <TableCell className='table-cell'>{ticket.description}</TableCell>
                                        <TableCell className='table-cell'>
                                            {ticket.imageBase64 && ticket.imageBase64.startsWith('data:image/') ? (
                                                <img src={ticket.imageBase64} alt="Attachment" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                            ) : (
                                                <a href={ticket.imageBase64} target="_blank" rel="noopener noreferrer">{ticket.filename}</a>
                                            )}
                                        </TableCell>
                                        <TableCell className='table-cell'>{ticket.status}</TableCell>
                                        <TableCell className='table-cell'>{ticket.message}</TableCell>

                                        <TableCell className='table-cell'>
                                            <Button size='small' variant='contained' color='error' onClick={() => handleDelete(ticket.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                    )
                                ))}
                            </TableBody>
                        </Table>
                        </Box>
                    </Card>
                </>
            )}
        </div>
    );
};

export default TicketList;
