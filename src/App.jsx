import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import QuestionModal from "./QuestionModal";
import ChallengeModal from './ChallengeModal'
import { questions, prizes, challenges } from "./data";
import {Alert, Button} from '@mui/material'

import logo from '../assets/logo.png'

const data = [
  { id: 1, option: "Pregunta" },
  { id: 2, option: "Reto" },
  { id: 3, option: "Pregunta" },
  { id: 4, option: "Reto" },
  { id: 5, option: "Pregunta" },
  { id: 6, option: "Reto" },
];


export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [question, setQuestion] = useState(null)
  const [prize, setPrize] = useState("")
  const [challengeOpen, setChallengeOpen] = useState(false)
  const [challenge, setChallenge] = useState('')
  const [alertVisible, setAlertVisible] = useState(false)

  const handleSpinClick = () => {

    const token = localStorage.getItem('spinToken')
    if(token && token == (new Date()).toDateString()){
      setAlertVisible(true)
      return
    }

    setAlertVisible(false)
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

    if(data[newPrizeNumber].option == "Reto"){
      const idChallenge = Math.floor(Math.random() * challenges.length)
      setChallenge(challenges[idChallenge])
    }
    else{
      const newPrize = Math.floor(Math.random() * prizes.length)
      setPrize(prizes[newPrize])
  
      const newQuestion = Math.floor(Math.random() * questions.length)
      setQuestion(questions[newQuestion])
    }

    localStorage.setItem('spinToken', (new Date()).toDateString());
  };
  

  return (
    <>
      <div align="center">
        <img src={logo} style={{width: "20%"}}/>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          outerBorderColor={["#f2f2f2"]}
          outerBorderWidth={[15]}
          innerBorderColor={["#f2f2f2"]}
          radiusLineColor={["#dedede"]}
          radiusLineWidth={[10]}
          textColors={["#000000","#ffffff","#000000","#ffffff","#000000","#ffffff",]}
          fontSize={[30]}
          perpendicularText={false}
          backgroundColors={[
            "#FDFCEB",
            "#CB2026",
            "#FDFCEB",
            "#CB2026",
            "#FDFCEB",
            "#CB2026",
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
            if(data[prizeNumber].option === "Reto")
              setChallengeOpen(true);
            else
              setIsModalOpen(true);
          }}
        />
          <Button
          onClick={handleSpinClick}
          sx={{
            bgcolor: "#CB2026", // Red background
            color: "white",     // White text
            '&:hover': {
              bgcolor: "#A11B1E", // Darker red for hover
            },
            mt: 2 // Margin top for spacing
          }}
        >
            Girar
          </Button>
      </div>
      {isModalOpen &&
      <QuestionModal
        open={isModalOpen}
        handleClose={() => {}}
        question={question}
        prize={prize}
      />
      }
      {challengeOpen && 
      <ChallengeModal
        open={challenge}
        challenge={challenge}
        handleClose={() => {}}
      />}

      {alertVisible && 
        <Alert severity="error">Ya jugaste hoy! Puedes volver a intentarlo mañana.</Alert>
      }
    </>
  );
};
 