import * as React from "react";
import { Dialog, DialogTitle, DialogContent, Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// Import the image
import backgroundImage from '../assets/image.png';

// Import the Chinese-themed font from Google Fonts
// import '@fontsource/noto-sans-sc'; // Example, change to preferred font

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(253, 252, 235, 0.7)', // Adjust transparency here
  zIndex: 1, // Ensure it is on top of the background image
});

const ChallengeModal = ({ open, handleClose, challenge }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ 
        bgcolor: "rgba(253, 252, 235, 0.8)", 
        fontFamily: 'Noto Sans SC', 
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '64px', 
      }}>
        <Typography variant="h4">RETO</Typography>
      </DialogTitle>
      <DialogContent sx={{ position: 'relative', bgcolor: "rgba(253, 252, 235, 0.8)", fontFamily: 'Noto Sans SC' }}>
        <Box 
          sx={{ 
            position: 'relative',
            minHeight: '300px', // Adjust based on your design
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transparent',
            backgroundImage: `url(${backgroundImage})`, // Set the image using template literals
            backgroundSize: 'cover', // Ensures the image covers the area
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat', // Prevents repeating of the image
          }}
        >
          <Overlay />
          <Box sx={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2, // Ensure it is above the overlay
          }}>
            <Typography variant="body1" sx={{ color: 'black', textAlign: 'center', fontSize: 20 }}>
              {challenge}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ChallengeModal;
