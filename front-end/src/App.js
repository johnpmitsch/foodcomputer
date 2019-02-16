import React, { Component } from "react";
import Button from "muicss/lib/react/button";
import Container from "muicss/lib/react/container";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";
import Panel from "muicss/lib/react/panel";
import colors from "./helpers/colors";
import TopBar from "./components/TopBar";

class App extends Component {
  render() {
    let panelStyles = {
      backgroundColor: colors.lightGray,
      textAlign: "center"
    };
    let panelRowStyle = { padding: "20px 0" };
    const numberCircleSize = "100";
    let numberCircle = {
      margin: "auto",
      width: `${numberCircleSize}px`,
      height: `${numberCircleSize}px`,
      padding: `${numberCircleSize / 4.5}px`,
      textAlign: "center",
      fontSize: `${numberCircleSize * 0.75}px`
    };

    const appStyle = {
      backgroundColor: colors.reactGray,
      minHeight: "100vh",
      //display: "flex",
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
                <h1>Temperature</h1>
                <div style={numberCircle}>30&#176;</div>
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
  }
}

export default App;
