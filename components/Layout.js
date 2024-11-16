import Link from 'next/link';
import { AppBar, Toolbar, Typography, Container, Button, Box, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Layout = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 600px)'); // Checks for mobile screen size

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    const drawerLinks = (
        <List>
            <ListItem button component={Link} href="/" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} href="/posts" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Posts" />
            </ListItem>
            <ListItem button component={Link} href="/new-post" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="New Post" />
            </ListItem>
        </List>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* AppBar with a slight shadow */}
            <AppBar position="sticky" sx={{ backgroundColor: '#1976d2', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        KGK CMS Dashboard
                    </Typography>
                    {isMobile ? (
                        <IconButton color="inherit" onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <nav>
                            <Button color="inherit" component={Link} href="/" sx={{ '&:hover': { backgroundColor: '#1565c0' } }}>Home</Button>
                            <Button color="inherit" component={Link} href="/posts" sx={{ '&:hover': { backgroundColor: '#1565c0' } }}>Posts</Button>
                            <Button color="inherit" component={Link} href="/new-post" sx={{ '&:hover': { backgroundColor: '#1565c0' } }}>New Post</Button>
                        </nav>
                    )}
                </Toolbar>
            </AppBar>

            {/* Drawer for mobile navigation */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                {drawerLinks}
            </Drawer>

            {/* Main Content with flex-grow to push footer down */}
            <main style={{ flexGrow: 1 }}>
                <Container sx={{ mt: 3, backgroundColor: '#fff', padding: '30px', borderRadius: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    {children}
                </Container>
            </main>

            {/* Footer always at the bottom */}
            <footer>
                <Box sx={{ backgroundColor: '#1976d2', color: 'white', padding: '15px', textAlign: 'center' }}>
                    <Typography variant="body2">&copy; 2024 KGK CMS</Typography>
                </Box>
            </footer>
        </Box>
    );
};

export default Layout;
