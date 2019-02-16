import React from "react";
import Appbar from "muicss/lib/react/appbar";
import { topBarStyle, rowStyle, h1Style } from "./styles";

const TopBar = props => (
  <Appbar style={topBarStyle}>
    <table width="100%">
      <tbody>
        <tr style={rowStyle}>
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
);

export default TopBar;
