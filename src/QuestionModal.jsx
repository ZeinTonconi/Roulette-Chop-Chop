import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import ButtonGroup from '@mui/material/ButtonGroup';

import { Dialog, DialogTitle, DialogContent, Grid, ToggleButton, ToggleButtonGroup, Button, Alert  } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


const QuestionModal = ({ open, handleClose, question, prize }) => {

  const [answer, setAnswer] = React.useState(0)
  const [disable, setDisable] = React.useState(false)
  const [message, setMessage] = React.useState("")

  const handleAnswer = (index) => {
    setAnswer(index)
    setDisable(true)
    if (index === question.correct) {
      setMessage(`¡Correcto! ¡Has ganado un premio! Te ganaste`);
    } else {
      setMessage("¡Incorrecto! Puedes volver a intentarlo mañana.");
    }
  }

  const getButtonColor = (option) => {
    if (!disable) return "default"; 
    return option === question.correct ? "success" : "error"; 
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ bgcolor: "#FDFCEB" }}>
      <Box mb={2}
        display="flex"
        justifyContent="center">
        <img
          src="../assets/image1.png" 
          style={{ width: '50%', height: 'auto', borderRadius: 8 }}
        />
      </Box>
        {question.question}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#FDFCEB" }}>
        <Grid container spacing={2}>
          {question.options.map((option, index) => (
            <Grid item xs={6} key={index}>
              <Button
                variant={disable ? "contained" : "outlined"}
                color={getButtonColor(index)}
                fullWidth
                onClick={() => handleAnswer(index)}
              >
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>

        {message && (
          <> 
           
            <Alert
              severity={ answer === question.correct ? "success" : "error"}
              sx={{ marginTop: 2 }}
            >
              {message} {answer == question.correct && <h3>{prize}</h3>}
            </Alert>
          </>
        )}  

      </DialogContent>
    </Dialog>
  );
};

export default QuestionModal;
