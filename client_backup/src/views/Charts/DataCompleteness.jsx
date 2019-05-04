import React from "react";
// import { Line } from "react-chartjs-2";
import axios from "axios";
import Chart from "react-google-charts";
class DataCompleteness extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      options: {
        // title: "% Data Completeness",
        // bars: "horizontal"
        legend: "none",
        titleTextStyle: {
          color: "black",
          fontSize: 15
        },
        pointSize: 7,
        curveType: "function",
        fontSize: 12
      }
    };
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
    axios
      .get("http://localhost:4000/elections/datacompleteness/1")
      .then(response => {
        var data = response.data;
        var data = [];
        data.push(["Years", "% Data Completeness"]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          row.push(response.data[i][0].toString());
          row.push(response.data[i][1]);
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
        height={"100%"}
        width={"100%"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={this.state.result}
        options={this.state.options}
      />
    );
  }
}

export default DataCompleteness;
