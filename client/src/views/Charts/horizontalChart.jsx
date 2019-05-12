import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import axios from "axios";
class HorizontalChart extends React.Component {
  constructor() {
    super();
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "State wise wait time in year 2016 (in minutes)",
            fill: false,
            lineTension: 0.1,
            backgroundColor: [],
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            aspectRatio: 1,
            fontSize: 12,
            //   borderDash: [],
            //   borderDashOffset: 0.0,
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
            beginAtZero: true,
            data: []
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontFamily: "Source Sans Pro",
            fontSize: 14,
            fontWeight: "bold",
            fontColor: "black"
          }
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                fontSize: 8
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                fontSize: 10
              }
            }
          ]
        }
      }
    };
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
    axios
      .get("http://localhost:4000/elections/year/2016")
      .then(response => {
        console.log(response);
        var data = this.state.chartData;
        // console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
          data.labels.push(response.data[i].state_fips);
          data.datasets[0].data.push(
            response.data[i].wait === ""
              ? "Incomplete Data"
              : response.data[i].wait
          );
          if (response.data[i].wait !== "" && response.data[i].wait < 17) {
            data.datasets[0].backgroundColor.push("rgba(75,192,192,0.4)");
          } else {
            data.datasets[0].backgroundColor.push("#ff3232");
          }
        }
        this.setState({ chartData: data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div>
          <HorizontalBar
            data={this.state.chartData}
            // width={100}
            height={550}
            options={this.state.options}
          />
        </div>
      </div>
    );
  }
}

export default HorizontalChart;
