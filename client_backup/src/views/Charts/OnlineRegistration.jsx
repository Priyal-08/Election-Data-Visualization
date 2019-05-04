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
        // vAxis: { title: "% of voters turn-out", minValue: 0, maxValue: 15 },
        legend: {
          position: "none"
        },
        fontSize: 12
      }
    };
  }
  componentDidMount() {
    // console.log("inside column function");
    axios
      .get("http://localhost:4000/elections/onlineregistration/1")
      .then(response => {
        var data = [];
        data.push(["Years", "No. of states", { role: "style" }]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          row.push(response.data[i][0].toString());
          row.push(response.data[i][1]);
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
