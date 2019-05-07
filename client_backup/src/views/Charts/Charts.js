import React, { Component } from "react";
import { Bar, Doughnut, Line, HorizontalBar } from "react-chartjs-2";
import { Card, CardBody, CardColumns, CardHeader } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import axios from "axios";
import HorizontalChart from "./horizontalChart";
import ColumnChart from "./columnChart";
import SLine from "./sLine";
import DLine from "./DisabilityLineGraph";
import Map from "./map";
import StateComparisonChart from "../StateComparison/ColumnChart";
import DataCompleteness from "./DataCompleteness";
import OnlineRegistration from "./OnlineRegistration";
import Widget02 from "../Widgets/Widget02";
import { CardGroup, Col, Row } from "reactstrap";

import { Widgets } from "..";
const line = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      fontSize: 12,
      data: []
    }
  ]
};

// getChartData();

// const bar = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "My First dataset",
//       backgroundColor: "rgba(255,99,132,0.2)",
//       borderColor: "rgba(255,99,132,1)",
//       borderWidth: 1,
//       hoverBackgroundColor: "rgba(255,99,132,0.4)",
//       hoverBorderColor: "rgba(255,99,132,1)",
//       data: [65, 59, 80, 81, 56, 55, 40]
//     }
//   ]
// };

const doughnut = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

const radar = {
  labels: [
    "Eating",
    "Drinking",
    "Sleeping",
    "Designing",
    "Coding",
    "Cycling",
    "Running"
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: [65, 59, 90, 81, 56, 55, 40]
    },
    {
      label: "My Second dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)",
      data: [28, 48, 40, 19, 96, 27, 100]
    }
  ]
};

const pie = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

const polar = {
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
      backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
      label: "My dataset" // for legend
    }
  ],
  labels: ["Red", "Green", "Yellow", "Grey", "Blue"]
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};

class Charts extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-3">
          <Card style={{ height: "590px", width: "100%" }}>
            <CardHeader>
              <b>% Data Completeness</b>
            </CardHeader>
            <CardBody style={{ height: "590px", width: "100%" }}>
              <div
                className="chart-wrapper"
                style={{ height: "90%", width: "100%" }}
              >
                <DataCompleteness />
              </div>
            </CardBody>
          </Card>
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>
              <b>% Voter turnout</b>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                {/* <Bar data={this.state.bar} options={options} /> */}
                <ColumnChart />
              </div>
            </CardBody>
          </Card>
          <Card
            style={{
              height: "100%",
              width: "100%",
              fontFamily: "sans-serif"
            }}
          >
            <CardHeader>
              <b>Wait time and Registration rejection correlation</b>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <SLine />
              </div>
            </CardBody>
          </Card>
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>
              <b>% Non-Voters due to disability related problems</b>
            </CardHeader>
            {/* <CardHeader>
              "States with online registration"
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader> */}
            <CardBody>
              <div className="chart-wrapper">
                {/* <Bar data={this.state.bar} options={options} /> */}
                <DLine />
              </div>
            </CardBody>
          </Card>
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>
              <b>States with online registration</b>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                {/* <Bar data={this.state.bar} options={options} /> */}
                <OnlineRegistration />
              </div>
            </CardBody>
          </Card>
          {/* <Card>
            
            <CardBody>
              <div
                className="chart-wrapper"
                style={{ height: "550px", width: "450px" }}
              >

                <HorizontalChart />
              </div>
            </CardBody>
          </Card> */}

          {/* <Card>
            <CardHeader>
              Radar Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Radar data={radar} />
              </div>
            </CardBody>
          </Card> */}
          {/* <Card>
            <CardHeader>
              Pie Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card> */}
          {/* <Card>
            <CardHeader>
              Polar Area Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Polar data={polar} options={options} />
              </div>
            </CardBody>
          </Card> */}
        </CardColumns>
        <CardColumns>
          <Widget02
            icon="icon-pie-chart"
            color="primary"
            header="51"
            mainText="States"
          />
          <Widget02
            icon="icon-pie-chart"
            color="primary"
            header="5"
            mainText="Years analyzed"
          />
           <Widget02
            icon="icon-pie-chart"
            color="primary"
            header="6"
            mainText="Key Performance Indicators"
          />
        </CardColumns>
        {/* <CardColumns className="mb-3">
          <Widget02
            icon="icon-pie-chart"
            color="primary"
            header="1"
            mainText="Data source"
          />
          <Widget02
            icon="icon-pie-chart"
            color="primary"
            header="4352"
            mainText="Data Points"
          />
          <Widget02
            icon="icon-pie-chart"
            color="primary"
            header="5"
            mainText="Elections analyzed"
          />
        </CardColumns> */}
      </div>
    );
  }
}

export default Charts;
