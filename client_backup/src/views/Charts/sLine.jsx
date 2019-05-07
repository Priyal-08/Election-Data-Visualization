import React from "react";
// import { Line } from "react-chartjs-2";
import axios from "axios";
import Chart from "react-google-charts";
class SLine extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      options: {
        // title: "Wait time",
        pointSize: 5,
        legend: "none",
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
    var result_1 = [];
    var result_2 = [];
    axios
      .get("http://localhost:4000/elections/waittime/1")
      .then(response => {
        var data = response.data;
        var data = [];
        data.push(["Years", "Wait time", "Registration rejections",  { role: "style" }]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          row.push(response.data[i][0].toString());
          row.push(response.data[i][1] * 0.9);
          row.push(response.data[i][2] * 10);
          row.push("color: #20a8d8");
          // row.push(1);
          data.push(row);
        }
        console.log(data);
        this.setState({ result: data });
        result_1 = data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Chart
        width={"100%"}
        height={"100%"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={this.state.result}
        options={this.state.options}
      />
    );
  }
}

export default SLine;
