import React from "react";
import Button from "muicss/lib/react/button";
import Container from "muicss/lib/react/container";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";
import Panel from "muicss/lib/react/panel";
import colors from "./helpers/colors";
import TopBar from "./components/TopBar";
import TemperaturePanel from "./components/TemperaturePanel";

const App = () => {
  let panelStyles = {
    backgroundColor: colors.lightGray,
    textAlign: "center"
  };
  let panelRowStyle = { padding: "20px 0" };
  const appStyle = {
    backgroundColor: colors.reactGray,
    minHeight: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white"
  };

  return (
    <div style={appStyle}>
      <TopBar />
      <Container fluid={true}>
        <Row style={panelRowStyle}>
          <Col md="4">
            <Panel style={panelStyles}>
              <TemperaturePanel />
            </Panel>
          </Col>
          <Col md="4">
            <Panel style={panelStyles}>
              <Button color="primary">button</Button>
            </Panel>
          </Col>
          <Col md="4">
            <Panel style={panelStyles}>
              <Button color="primary">button</Button>
            </Panel>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
