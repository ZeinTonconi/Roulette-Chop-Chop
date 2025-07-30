import * as React from "react";
import { Dialog, DialogTitle, DialogContent, Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// Import the image
import backgroundImage from '../assets/image1Bolivia.png';
import { useState } from "react";

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

const ChallengeModal = ({ open, handleClose, challenge, openQuestion, prize }) => {
  
  const [openMessage, setOpenMessage] = useState(false)

  const showMessage = () => {
    setOpenMessage(true);
  }

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
        <Typography variant="h4">{(challenge!=''?"RETO":"PREGUNTA")}</Typography>
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

          <Box sx={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2, // Ensure it is above the overlay
            flexDirection: "column"
          }}>
            <Typography variant="body1" sx={{ color: 'black', textAlign: 'center', fontSize: 20 }}>
              {challenge + openQuestion}
            </Typography>
            { (!openMessage)? ( 
            <Button 
              onClick={showMessage}
              sx={{
                bgcolor: "#888a88", // Red background
                color: "white",     // White text
                '&:hover': {
                  bgcolor: "#606060", // Darker red for hover
                },
                mt: 2 // Margin top for spacing
              }}
            >
                Lo lograste?
              </Button> ) : (
               <Paper 
                elevation={3}
                sx={{
                  p: 2,
                  mt: 2,
                  bgcolor: '#dadacd', // Soft yellow background
                  border: '2px dashed ', // Festive red border
                  color: '#000000', // Red text
                  fontSize: 22,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                }}
              >
                 ¡Te ganaste un: {prize}! 
              </Paper>
              )
          }
          </Box>
          
        </Box>
        <Overlay />
      </DialogContent>
    </Dialog>
  );
}

export default ChallengeModal;
