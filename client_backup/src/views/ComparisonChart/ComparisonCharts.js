import React, { Component } from "react";
import { Card, CardBody, CardColumns, CardHeader } from "reactstrap";
import ColumnChart from "./ColumnChart";
import axios from "axios";

class ComparisonCharts extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <Card>
            <CardBody>
              <div className="chart-wrapper">
                <ColumnChart />
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

export default ComparisonCharts;
