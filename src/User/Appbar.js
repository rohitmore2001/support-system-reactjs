import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
// import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import '../styles/Main.css';
import NoitaVonneLogo from '../Assets/noitavonne-logo-black-white.png';
import { Link, useNavigate } from 'react-router-dom';
import { Chip, Menu } from '@mui/material';

const pages = ['Home', 'Career', 'Support'];
const settings = ['LogOut'];

function ResponsiveAppBar({ userType }) {
  console.log('usertype', userType)
  const ticketHandlevalue = userType;
  console.log('ticketHandlevalue :', ticketHandlevalue);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate(); // Access to the navigate function

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Close the user menu
    handleCloseUserMenu();
    // Navigate to the registration page
    // navigate('/login');
    window.location.href="/login"
    localStorage.setItem('currentUser', 'noUser');
  
  };

  const user = localStorage.getItem("currentUser");
  const userName = localStorage.getItem("userName");


  return (
    <AppBar position="static" sx={{ backgroundColor: '#f7931a' }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              flexGrow: 0.1,
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={NoitaVonneLogo} height={33} alt="NoitaVonne Logo" />
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' }, textAlign: 'left' }}>
            <Button color='inherit'><Link className='nav-buttons-global' to={'/'}>Home</Link></Button>
            <Button color='inherit'>Career</Button>
            <Button color='inherit'><Link className='nav-buttons-global' to={'/support'}>Support</Link></Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', sm: 'none' }, textAlign: 'left' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={userName}>
            <IconButton onClick={handleOpenUserMenu} color="inherit">
              {/* <Avatar alt={user} src="/static/images/avatar/2.jpg" /> */}
              {/* <span>Hi {userName}...</span> */}
              <Chip
                avatar={<Avatar alt={userName} />}
                label={user === 'noUser' ? "Guest" : userName}
                variant="outlined"
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={setting === 'LogOut' ? handleLogout : handleCloseUserMenu}>
                {setting}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
        <Menu
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              {page}
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
