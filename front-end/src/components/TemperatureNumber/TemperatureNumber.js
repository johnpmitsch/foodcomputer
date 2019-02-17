import React from "react";
import { useSpring, animated, config } from "react-spring";

const TemperatureNumber = ({ temperature }) => {
  const numberCircleSize = "100";

  const numberCircle = {
    margin: "auto",
    width: `${numberCircleSize}px`,
    height: `${numberCircleSize}px`,
    padding: `${numberCircleSize / 4.5}px`,
    textAlign: "center",
    fontSize: `${numberCircleSize * 0.75}px`
  };

  console.log(temperature);
  const countSpring = useSpring({
    number: temperature,
    from: { number: 0 },
    config: config.slow
  });

  return (
    <div>
      <animated.div style={numberCircle}>
        {countSpring.number.interpolate(x => x.toFixed(0))}
      </animated.div>
    </div>
  );
};

export default TemperatureNumber;
