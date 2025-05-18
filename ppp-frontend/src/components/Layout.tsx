import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PPP Data Tool
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box>
        {children}
      </Box>
    </Container>
    <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} PPP Data Analysis Tool &mdash; All rights reserved.
      </Typography>
    </Box>
  </>
);

export default Layout;