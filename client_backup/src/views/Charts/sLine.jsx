import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
class SLine extends React.Component {
  constructor() {
    super();
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "% of voters with disability in Vermont",
            fill: false,
            lineTension: 0,
            backgroundColor: [],
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderWidth: 2,
            //aspectRatio: 1,
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: [],
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            // pointHoverBackgroundColor: "rgba(75,192,192,1)",
            // pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 5,
            beginAtZero: true,
            data: []
          }
        ]
      },
      options: {
        // responsive: true,
        // maintainAspectRatio: false,
        legend: {
          labels: {
            fontFamily: "Source Sans Pro",
            fontSize: 18,
            fontWeight: "bold",
            fontColor: "black"
          }
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "% of disabled voters",
                fontColor: "green",
                fontSize: 20
              },
              stepSize: 0.5,
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Year",
                fontColor: "green",
                fontSize: 20
              },
              gridLines: {
                display: false
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
      .get("http://localhost:4000/elections/state/VT")
      .then(response => {
        console.log(response);
        var data = this.state.chartData;
        // console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
          data.labels.push(response.data[i].year);
          data.datasets[0].data.push(
            response.data[i].nonvoter_illness_pct * 100
          );
          if (response.data[i].nonvoter_illness_pct * 100 < 10) {
            data.datasets[0].pointBackgroundColor.push("rgba(75,192,192,0.4)");
          } else {
            data.datasets[0].pointBackgroundColor.push("#ff3232");
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
          <Line
            data={this.state.chartData}
            options={this.state.options}
            // width={100}
            // height={90}
            redraw
          />
        </div>
      </div>
    );
  }
}

export default SLine;
