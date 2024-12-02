import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, BottomNavigation, BottomNavigationAction, Drawer, List, ListItem, ListItemText, Box, CardMedia } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExploreIcon from '@mui/icons-material/Explore';
import BookIcon from '@mui/icons-material/Book';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MapIcon from "@mui/icons-material/Map";
import logo from './logo.svg'
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HelpIcon from "@mui/icons-material/Help";
import SchoolIcon from "@mui/icons-material/School";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Layout = ({ children }) => {
    // State for bottom navigation
    const [navValue, setNavValue] = useState(0);

    // State for menu drawer
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    // Handle bottom navigation change
    const handleNavChange = (event, newValue) => {
        setNavValue(newValue);
        switch (newValue) {
            case 0:
                navigate("/");
                break;
            case 1:
                window.location.href = "https://www.depts.ttu.edu/housing/campus-map.pdf";
                break;
            case 2:
                navigate("/");
                break;
            default:
                break;
        }
    };

    // Handle menu toggle
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden', maxWidth: '100vw' }}>
            {/* Drawer for the Menu */}
            <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
                <List>
                    <ListItem button onClick={() => navigate("/")}>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/directions")}>
                        <ListItemText primary="Directions" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/buildinginfo")}>
                        <ListItemText primary="Building Info" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/services")}>
                        <ListItemText primary="Services" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/BusSchedule")}>
                        <ListItemText primary="Bus Schedule" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/dining")}>
                        <ListItemText primary="Dining Options" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/faq")}>
                        <ListItemText primary="FAQ" />
                    </ListItem>
                </List>
            </Drawer>

            <AppBar flexDirection={'row'} display={'flex'} position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
                <Toolbar sx={{ width: '100%', justifyContent: 'space-between', paddingX: 2 }}>
                    <IconButton onClick={toggleMenu}>
                        <MenuIcon />
                    </IconButton>

                    <Box display="flex" alignItems="center" sx={{ flexGrow: 1, justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                            RaiderNav
                        </Typography>
                        <img
                            src={logo}
                            style={{
                                width: 40,
                                height: 40,
                                marginLeft: 8 // adds a small space between the text and the logo
                            }}
                            alt="logo"
                        />
                    </Box>

                    <IconButton onClick={() => navigate("/")} sx={{ marginRight: 6 }}>
                        <MapIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>


            {/* Main Content */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', width: '100vw' }}>
                {children}
            </Box>

            {/* Bottom Navigation
<BottomNavigation
    value={navValue}
    onChange={handleNavChange}
    showLabels
    sx={{
        backgroundColor: 'white',
        width: '100vw',
        position: 'fixed',  // Fixed positioning
        bottom: 0,  // Stick to the bottom
        left: 0,    // Ensure full width
        right: 0
    }}
>
    <BottomNavigationAction
        label="Explore"
        icon={<ExploreIcon />}
        sx={{
            color: navValue === 0 ? '#fed8d8' : '#1d1b20',
        }}
    />
    <BottomNavigationAction
        label="Services"
        icon={<SchoolIcon />}
        sx={{
            color: navValue === 2 ? '#fed8d8' : '#49454f',
        }}
    />
    <BottomNavigationAction
        label="More"
        icon={<MoreHorizIcon />}
        sx={{
            color: navValue === 1 ? '#fed8d8' : '#49454f',
        }}
    />
</BottomNavigation> */}

        </Box>
    );
};

export default Layout;
