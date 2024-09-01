import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import QuestionModal from "./QuestionModal";

const data = [
  { id: 1, option: "Premio" },
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

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
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
          textColors={["#ffffff"]}
          fontSize={[30]}
          perpendicularText={false}
          backgroundColors={[
            "#F22B35",
            "#F99533",
            "#46AEFF",
            "#F99533",
            "#46AEFF",
            "#F99533",
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
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
      (isModalOpen &&{" "}
      <QuestionModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      )
    </>
  );
};
