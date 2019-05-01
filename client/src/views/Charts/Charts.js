import React, { Component } from "react";
import { Bar, Doughnut, Line, HorizontalBar } from "react-chartjs-2";
import { Card, CardBody, CardColumns, CardHeader } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import axios from "axios";
import HorizontalChart from "./horizontalChart";
import ColumnChart from "./columnChart";
import SLine from "./sLine";
import Map from "./map";

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
    // this.state = {
    //   bar: {
    //     labels: [],
    //     datasets: [
    //       {
    //         label: "Voter Turn-out",
    //         backgroundColor: "rgba(255,99,132,0.2)",
    //         borderColor: "rgba(255,99,132,1)",
    //         borderWidth: 1,
    //         hoverBackgroundColor: "rgba(255,99,132,0.4)",
    //         hoverBorderColor: "rgba(255,99,132,1)",
    //         data: [65, 59, 80, 81, 56, 55, 40]
    //       }
    //     ]
    //   },

    //   chartData: {
    //     labels: [],
    //     datasets: [
    //       {
    //         label: "State wise wait time in year 2016 (in minutes)",
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: [],
    //         borderColor: "rgba(75,192,192,1)",
    //         borderCapStyle: "butt",
    //         aspectRatio: 1,
    //         borderJoinStyle: "miter",
    //         pointBorderColor: "rgba(75,192,192,1)",
    //         pointBackgroundColor: "#fff",
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //         pointHoverBorderColor: "rgba(220,220,220,1)",
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         beginAtZero: true,
    //         data: []
    //       }
    //     ]
    //   },
    //   options: {
    //     maintainAspectRatio: false,
    //     legend: {
    //       labels: {
    //         fontFamily: "Source Sans Pro",
    //         fontSize: 18,
    //         fontWeight: "bold",
    //         fontColor: "black"
    //       }
    //     },
    //     scales: {
    //       yAxes: [
    //         {
    //           gridLines: {
    //             display: false
    //           }
    //         }
    //       ],
    //       xAxes: [
    //         {
    //           gridLines: {
    //             display: false
    //           }
    //         }
    //       ]
    //     }
    //   }
    // };
  }

  // getChartData() {
  //   axios
  //     .get("http://localhost:4000/elections/voterturnout/1")
  //     .then(response => {
  //       console.log(response);
  //       var data = this.state.bar;
  //       console.log(data);
  //       // var row = [];
  //       for (var i = 0; i < response.data.length; ++i) {
  //         data.labels.push(response.data[i][0].toString());
  //         data.datasets[0].data.push(response.data[i][1]);
  //         // row.push("light-blue");
  //         // data.push(row);
  //       }
  //       console.log(data);
  //       this.setState({ bar: data });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });

  //   axios
  //     .get("http://localhost:4000/elections/year/2016")
  //     .then(response => {
  //       console.log(response);
  //       var data = this.state.chartData;
  //       for (var i = 0; i < response.data.length; i++) {
  //         data.labels.push(response.data[i].state_fips);
  //         data.datasets[0].data.push(
  //           response.data[i].wait === ""
  //             ? "Incomplete Data"
  //             : response.data[i].wait
  //         );
  //         if (response.data[i].wait !== "" && response.data[i].wait < 17) {
  //           data.datasets[0].backgroundColor.push("rgba(75,192,192,0.4)");
  //         } else {
  //           data.datasets[0].backgroundColor.push("#ff3232");
  //         }
  //       }
  //       this.setState({ chartData: data });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }
  // componentDidMount() {
  //   console.log("Inside mount");
  //   this.getChartData();
  //   console.log("bar data");
  //   console.log(this.state.bar);
  // }

  render() {
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <Card>
            {/* <CardHeader>
              Line Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader> */}
            <CardBody>
              <div className="chart-wrapper">
                {/* <Line data={line} options={options} /> */}
                <SLine />
              </div>
            </CardBody>
          </Card>
          <Card>
            {/* <CardHeader>
              Bar Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader> */}
            <CardBody>
              <div className="chart-wrapper">
                {/* <Bar data={this.state.bar} options={options} /> */}
                <ColumnChart />
              </div>
            </CardBody>
          </Card>
          <Card>
            {/* <CardHeader>
              Map
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader> */}
            <CardBody>
              <div className="chart-wrapper">
                {/* <Doughnut data={doughnut} /> */}
                <Map />
              </div>
            </CardBody>
          </Card>
          <Card>
            {/* <CardHeader>
              Map
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader> */}
            <CardBody>
              <div className="chart-wrapper">
                {/* <Doughnut data={doughnut} /> */}
                <Map />
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
      </div>
    );
  }
}

export default Charts;
