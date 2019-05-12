import React from "react";
// import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from "axios";

export default class OnlineRegistration extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      options: {
        // title: "States with online registration",
        titleTextStyle: {
          color: "black",
          fontSize: 15
        },
        // hAxis: { title: "Year", minValue: 0, maxValue: 15 },
        vAxis: { baseline: 0,gridlines: {
          color: "transparent"
        }},
        legend: {
          position: "none"
        },
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
        data.push(["Years", "No. of states", { role: "style" }]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          row.push(response.data[i].year);
          row.push(response.data[i].pct_reg_of_vep_vrs * 100);
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
        width={"100%"}
        height={"100%"}
        chartType="ColumnChart"
        data={this.state.result}
        options={this.state.options}
      />
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
// export default OnlineRegistration;
