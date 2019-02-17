import React from "react";
import { Spring } from "react-spring/renderprops";

const Thermometer = ({ temperature }) => {
  const FarenheitHigh = 100;
  const mercuryPercentage =
    temperature > FarenheitHigh
      ? FarenheitHigh
      : (temperature / FarenheitHigh) * 100;

  const thermometerContainer = {
    position: "relative",
    width: "50px",
    height: "40vh",
    borderRadius: "5px",
    border: "2px solid white",
    overflow: "hidden"
  };

  const thermometerStyle = {
    bottom: "0",
    left: "0",
    width: "100%",
    backgroundColor: "red",
    position: "absolute"
  };

  console.log(mercuryPercentage);
  return (
    <div style={thermometerContainer}>
      <Spring from={{ height: "0%" }} to={{ height: `${mercuryPercentage}%` }}>
        {props => <div style={{ ...thermometerStyle, ...props }} />}
      </Spring>
    </div>
  );
};

export default Thermometer;
