import React from "react";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";
import Thermometer from "../Thermometer";
import TemperatureNumber from "../TemperatureNumber";

const TemperaturePanel = () => {
  const temperature = 75;

  return (
    <div>
      <div style={{ position: "relative", height: "100%" }}>
        <Row>
          <Col md="6">
            <Thermometer temperature={temperature} />
          </Col>
          <Col md="6">
            <TemperatureNumber temperature={temperature} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TemperaturePanel;
