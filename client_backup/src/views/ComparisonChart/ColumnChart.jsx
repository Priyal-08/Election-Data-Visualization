import React from "react";
import { Button, ButtonGroup } from "reactstrap";
// import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from "axios";

class ColumnChart extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      completeData: {},
      selectedOptions: []
    };
  }
  componentDidMount() {
    // console.log("inside column function");
    axios
      .get("http://localhost:4000/elections/year/2016")
      .then(response => {
        response.data.sort(function(a, b) {
          return b.wait - a.wait;
        });
        var data = [];
        data.push(["State", "WaitTime", { role: "style" }]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          row.push(response.data[i].state_fips);
          row.push(parseInt(response.data[i].wait));
          row.push("rgba(75,192,192,1)");
          data.push(row);
        }
        console.log(data);
        this.setState({ result: data });
        this.setState({ completeData: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  onCheckboxBtnClick(selected) {
    const index = this.state.selectedOptions.indexOf(selected);
    if (index < 0) {
      this.state.selectedOptions.push(selected);
    } else {
      this.state.selectedOptions.splice(index, 1);
    }
    this.setState({ selectedOptions: [...this.state.selectedOptions] });
  }
  render() {
    return (
      <div className="App">
        {/* <ButtonGroup> */}
        <Button
          color="primary"
          onClick={() => this.onCheckboxBtnClick(1)}
          active={this.state.selectedOptions.includes(1)}
        >
          One
        </Button>
        <Button
          color="primary"
          onClick={() => this.onCheckboxBtnClick(2)}
          active={this.state.selectedOptions.includes(2)}
        >
          Two
        </Button>
        <Button
          color="primary"
          onClick={() => this.onCheckboxBtnClick(3)}
          active={this.state.selectedOptions.includes(3)}
        >
          Three
        </Button>
        {/* </ButtonGroup> */}
        <Chart
          chartType="BarChart"
          width="700px"
          height="1100px"
          data={this.state.result}
          // width={480}
          // height={380}
          options={{
            // title: "% of voters turn-out year wise",
            vAxis: {
              // title: "State",
              gridlines: {
                color: "transparent"
              }
            },
            hAxis: {
              // title: "% of voters turn-out",
              gridlines: {
                color: "transparent"
              }
            },
            //backgroundColor: "00000000",
            fillOpacity: "0.0",
            is3D: true,
            bar: { groupWidth: "75%" },
            legend: "none",
            fontSize: 10
          }}
        />
      </div>
    );
  }
}

export default ColumnChart;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
// export default ColumnChart;
