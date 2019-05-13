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
        vAxis: {baseline: 0},
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
    axios
      .get("http://localhost:4000/elections/voterturnout/1")
      .then(response => {
        var data = [];
        data.push(["Years", "Turn-out", {role: "style"}]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          row.push(response.data[i][0].toString());
          row.push(response.data[i][1]);
          if(response.data[i][1]<50){
            row.push("red");
          }
          else{
            row.push("blue");
          }
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
