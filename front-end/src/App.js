import React, { Component } from "react";
import Button from "muicss/lib/react/button";
import Appbar from "muicss/lib/react/appbar";
import Container from "muicss/lib/react/container";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";
import Panel from "muicss/lib/react/panel";

const colorPalette = {
  electricBlue: "#054A91",
  steelBlue: "#3E7CB1",
  pastelBlue: "#81A4CD",
  azurishWhite: "#DBE4EE",
  richBlack: "#00120B",
  columbiaBlue: "#C5D5EA",
  jetGray: "#333333",
  ghBlack: "#24292e"
};
class App extends Component {
  render() {
    let appBarStyle = { backgroundColor: colorPalette.ghBlack };
    let s1 = { verticalAlign: "middle", padding: "10px" };
    let h1Style = { "margin-left": "10px", color: "white" };
    let panelStyles = {
      backgroundColor: "#f5f5f7",
      textAlign: "center"
    };
    let topRowStyle = { padding: "20px 0" };
    const numberCircleSize = "100";
    let numberCircle = {
      margin: "auto",
      borderRadius: "50%",
      width: `${numberCircleSize}px`,
      height: `${numberCircleSize}px`,
      padding: `${numberCircleSize / 4.5}px`,
      border: `${numberCircleSize / 12}px solid ${colorPalette.columbiaBlue}`,
      color: colorPalette.electricBlue,
      textAlign: "center",
      fontSize: `${numberCircleSize * 0.75}px`
    };

    return (
      <div>
        <Appbar style={appBarStyle}>
          <table width="100%">
            <tbody>
              <tr style={s1}>
                <td className="mui--appbar-height">
                  <h1 style={h1Style}>
                    <span role="img" aria-label="seedling">
                      🌱
                    </span>
                    <span> </span>Foodcomputer.io
                  </h1>
                </td>
              </tr>
            </tbody>
          </table>
        </Appbar>

        <Container fluid={true}>
          <Row style={topRowStyle}>
            <Col md="4">
              <Panel style={panelStyles}>
                <h1>Tempurature</h1>
                <div style={numberCircle}>30</div>
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
