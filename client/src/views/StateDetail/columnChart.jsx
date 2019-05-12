import React from "react";
// import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from "axios";

export default class ColumnChart extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      options: {
        // title: "Voter Turnout",
        titleTextStyle: {
          color: "black",
          fontSize: 15
        },
        pointSize: 5,
        vAxis: {baseline: 0},
        legend: { position: "none" },
        // hAxis: { title: "Year" },
        // vAxis: { title: "% of voters turn-out" },
        fontSize: 12
      }
    };
  }
  componentDidMount() {
    this.getChartData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state_value !== this.props.state_value) {
      this.getChartData();
    }
  }

  getChartData() {
    var url = "http://localhost:4000/elections/state/" + this.props.state_value;
    axios
      .get(url)
      .then(response => {
        response.data.sort(function(a, b) {
          return a.year.localeCompare(b.year);
        });
        var data = [];
        data.push(["Years", "Turn-out", { role: "style" }]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          row.push(response.data[i].year);
          row.push(response.data[i].vep_turnout * 100);
          row.push("color: rgb(51, 102, 204)");
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
        width={"350"}
        height={"350"}
        chartType="AreaChart"
        data={this.state.result}
        options={this.state.options}
      />
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
// export default ColumnChart;
