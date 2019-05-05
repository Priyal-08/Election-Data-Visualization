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
        legend: { position: "none" },
        // hAxis: { title: "Year" },
        // vAxis: { title: "% of voters turn-out" },
        fontSize: 12
      }
    };
  }
  componentDidMount() {
    // console.log("inside column function");
    var url = "http://localhost:4000/elections/state/" + this.props.state_value;
    axios
      .get(url)
      .then(response => {
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
