import React from "react";
// import { Line } from "react-chartjs-2";
import axios from "axios";
import Chart from "react-google-charts";
class DisabilityLineGraph extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      options: {
        // title: "% Non-Voters due to disability related problems",
        legend: "none",
        bars: "horizontal",
        bar: { groupWidth: "30%" },
        titleTextStyle: {
          color: "black",
          fontSize: 15
        },
        fontSize: 12
      }
    };
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
    axios
      .get("http://localhost:4000/elections/disability/1")
      .then(response => {
        var data = response.data;
        var data = [];
        data.push(["Years", "% Non-Voters"]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          row.push(response.data[i][0].toString());
          row.push(response.data[i][1]);
          // row.push("color:#63c2de");
          data.push(row);
        }
        console.log(data);
        this.setState({ result: data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Chart
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={this.state.result}
        options={this.state.options}
      />
    );
  }
}

export default DisabilityLineGraph;
