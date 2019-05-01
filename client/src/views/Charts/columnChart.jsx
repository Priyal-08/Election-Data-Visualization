import React from "react";
// import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from "axios";

export default class ColumnChart extends React.Component {
  constructor() {
    super();
    this.state = {
      result: []
    };
  }
  componentDidMount() {
    // console.log("inside column function");
    axios
      .get("http://localhost:4000/elections/voterturnout/1")
      .then(response => {
        var data = [];
        data.push(["Element", "Voter Turn-out", { role: "style" }]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          row.push(response.data[i][0].toString());
          row.push(response.data[i][1]);
          row.push("rgba(75,192,192,1)");
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
      <div className="App">
        <Chart
          chartType="ColumnChart"
          // width="100%"
          // height="400px"
          data={this.state.result}
          // width={480}
          // height={380}
          options={{
            title: "% of voters turn-out year wise",
            hAxis: { title: "Year", minValue: 0, maxValue: 15 },
            vAxis: { title: "% of voters turn-out", minValue: 0, maxValue: 15 },
            legend: "none",
            fontSize: 12
          }}
        />
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
// export default ColumnChart;
