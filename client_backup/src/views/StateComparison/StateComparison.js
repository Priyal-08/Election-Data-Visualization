import React, { Component } from "react";
import { Card, CardBody, CardColumns, CardHeader } from "reactstrap";
import ColumnChart from "./ColumnChart";

class StateComparison extends Component {
  render() {
    return (
      <div className="container-fluid, animated fadeIn">
        {/* <div className="chart-wrapper"> */}
        <ColumnChart />
        {/* </div> */}
      </div>
    );
  }
}

export default StateComparison;
