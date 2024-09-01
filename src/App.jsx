import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import QuestionModal from "./QuestionModal";
import ChallengeModal from './ChallengeModal'
import { questions, prizes, challenges } from "./data";

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

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

    if(data[1].option == "Reto"){
      const idChallenge = Math.floor(Math.random() * challenges.length)
      setChallenge(challenges[idChallenge])
      setChallengeOpen(true)
    }
    else{
      const newPrize = Math.floor(Math.random() * prizes.length)
      setPrize(prizes[newPrize])
  
      const newQuestion = Math.floor(Math.random() * questions.length)
      setQuestion(questions[newQuestion])
    }
  };

  

  return (
    <>
      <div align="center">
        <h1 align="center">Ruleta</h1>
        <hr />
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
        <button className="button2" onClick={handleSpinClick}>
          SPIN
        </button>
        <br />
        {!mustSpin ? data[prizeNumber].option : "0"}
        <hr />
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
    </>
  );
};
