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
    var url = "http://localhost:4000/elections/state/" + this.props.state_value;
    axios
      .get(url)
      .then(response => {
        var data = response.data;
        var data = [];
        data.push(["Years", "Wait time", "Registration Rejections"]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          row.push(response.data[i].year);
          row.push(response.data[i].wait * 0.9);
          row.push(response.data[i].reg_rej * 100);
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
