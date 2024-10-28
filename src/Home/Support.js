import React, { useState } from 'react'
import  supportBanner from '../Assets/Banner.jpg'
import ResponsiveAppBar from '../User/Appbar'
import '../styles/Main.css'
import { Box, Divider, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import TicketList from '../User/TicketList'
import AdminComponent from '../Admin/AdminComponent'
import TechSupportComponent from '../TechSupport/TechSupportComponent'

const Support = () => {
    const navigate = useNavigate()

       const user = localStorage.getItem("currentUser");
    const [userType, setUserType] = useState(user);

    let mainComponent;

    switch (userType) {
        case "user":
            mainComponent = <TicketList />;
            break;
        case "admin":
            mainComponent = <AdminComponent />;
            break;
            case "tech-support":
            mainComponent = <TechSupportComponent />;
            break;
        default:
            mainComponent = "Please login to continue."
            window.location.href="/login"
            break;
    }

    const handleCreateTicket = () => {
      navigate('/createTicket');
  }


  return (
    <div>
        <ResponsiveAppBar/>
        
       

      {
        userType === 'user' ? 
        ( <>
          <Typography sx={{display:{sx: 'none' , md: 'flex'}}}>
      <img src={supportBanner} alt=""  className='support-banner'/>
      </Typography>
        <Box className='raise-ticket'>
        <h1>Welcome to Support</h1>
        <div>
            <p className='raise-ticket-text' onClick={handleCreateTicket}><span style={{fontSize:'22px' , fontWeight:'900'}}>+</span> Raise a new ticket</p>
        </div>
    </Box>
    </>) : ''
      }   


        <Divider orientation='horizontal' flexItem />

      
      {mainComponent}
        {/* <TicketList/> */}

    </div>
  )
}

export default Support
