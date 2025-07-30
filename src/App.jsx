import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import QuestionModal from "./QuestionModal";
import ChallengeModal from './ChallengeModal'
import { questions, prizes, challenges, openQuestions, challengePrizes, questionPrizes } from "./data";
import {Alert, Button} from '@mui/material'

import logo from '../assets/logo.jpg'

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
  const [openQuestion, setOpenQuestion] = useState('');

  const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random()*arr.length)]
  }

  function getRandomPrize(weightedPrizes) {
    const totalWeight = weightedPrizes.reduce((sum, p) => sum + p.weight, 0);
    const rand = Math.random() * totalWeight;

    let cumulative = 0;
    for (let i = 0; i < weightedPrizes.length; i++) {
      cumulative += weightedPrizes[i].weight;
      if (rand < cumulative) {
        return weightedPrizes[i].prize;
      }
    }

    // Fallback (should never hit if weights are correct)
    return weightedPrizes[0].prize;
  }

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
      setChallenge(getRandomElement(challenges))
      setPrize(getRandomPrize(challengePrizes))
    }
    else{
      setPrize(getRandomPrize(questionPrizes))
      const isOpenQuestion = (Math.random()<0.5)
      if(isOpenQuestion){
        setOpenQuestion(getRandomElement(openQuestions).question);
      }
      else{
        setQuestion(getRandomElement(questions))
      }
    }

    localStorage.setItem('spinToken', (new Date()).toDateString());
  };
  

  return (
    <>
      <div style={{backgroundColor: "#606060"}}align="center" bgcolor="#606060">
        <img src={logo} style={{width: "70%"}}/>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          outerBorderColor={["#FFFFFF"]}
          outerBorderWidth={[15]}
          innerBorderColor={["#FFFFFF"]}
          radiusLineColor={["#FFFFFF"]}
          radiusLineWidth={[10]}
          textColors={["#000000","#ffffff","#000000","#ffffff","#000000","#ffffff",]}
          fontSize={[30]}
          perpendicularText={false}
          backgroundColors={[
            "#FDFCEB",
            "#888a88",
            "#FDFCEB",
            "#888a88",
            "#FDFCEB",
            "#888a88",
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
            if(openQuestion!='' || challenge!='')
              setChallengeOpen(true);
            else
              setIsModalOpen(true);
          }}
        />
          <Button
          onClick={handleSpinClick}
          sx={{
            bgcolor: "#888a88", // Red background
            color: "white",     // White text
            '&:hover': {
              bgcolor: "#606060", // Darker red for hover
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
        open={challengeOpen}
        challenge={challenge}
        openQuestion={openQuestion}
        prize={prize}
        handleClose={() => {}}
      />}

      {alertVisible && 
        <Alert severity="error">Ya jugaste hoy! Puedes volver a intentarlo mañana.</Alert>
      }
    </>
  );
};
 