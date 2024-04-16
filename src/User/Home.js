import React from 'react'
import { Container, Typography, Button, Box } from '@mui/material';
import ResponsiveAppBar from './Appbar'
import imageHome from '../Assets/homeBG.jpg.png';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css'
const Home = () => {
const navigate = useNavigate();
  const handleGotoLogin = ()=> {
 navigate('/login')
  }
  return (
    <div className="home-container">
      <ResponsiveAppBar/>
      <Box>
        <img src={imageHome} alt=""  className='homebG'/>
      </Box>
       <Container className="content-container" maxWidth="md" sx={{ textAlign:'center' , paddingTop:'100px'}}>
      <Typography variant="h3" gutterBottom style={{color:'#030b1a'}}>Welcome to Our Website!</Typography>
      <Typography variant="body1" gutterBottom sx={{ backgroundColor:'#f2ab63' , border:'1px solid #e06a02s' , borderRadius:'10px'}}>
        We provide amazing services to meet all your needs. Explore our website to find out more.
      </Typography>
      <Button  variant="contained" color="primary" size="large" style={{ marginTop: '20px'  , backgroundColor:'#8304d1'}} onClick={handleGotoLogin}>
        Get Started
      </Button>
    </Container>
    </div>
  )
}

export default Home


