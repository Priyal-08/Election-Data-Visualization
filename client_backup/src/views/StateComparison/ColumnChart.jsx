import React from "react";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
// import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from "axios";

class ColumnChart extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      result: [],
      completeData: [],
      selectedOptions: [],
      dropdownOpen: false,
      selectedYear: 2016,
      years: []
    };
  }
  componentDidMount() {
    // console.log("inside column function");
    axios
      // .get("http://localhost:4000/elections/year/2016")
      .get("http://localhost:4000/elections/")
      .then(response => {
        var distinctYears = response.data.reduce(function(a, d) {
          if (a.indexOf(d.year) === -1) {
            a.push(d.year);
          }
          return a;
        }, []);

        distinctYears.sort(function(a, b) {
          return b - a;
        });
        //console.log(response.data);
        response.data.sort(function(a, b) {
          return b.wait - a.wait;
        });
        var data = [];
        var completeData = [];
        data.push(["State", "WaitTime", { role: "style" }]);
        for (var i = 0; i < response.data.length; ++i) {
          var row = [];
          var rowData = response.data[i];
          if (
            parseInt(response.data[i].year) == parseInt(this.state.selectedYear)
          ) {
            row.push(rowData.state_fips);
            row.push(parseInt(rowData.wait));
            row.push("rgba(75,192,192,1)");
            data.push(row);
          }

          completeData.push({
            state: rowData.state_fips,
            year: rowData.year,
            onlineReg: rowData.online_reg,
            waitTime: rowData.wait,
            vepTurnout: rowData.vep_turnout
          });
        }
        this.setState({ completeData: completeData });
        this.setState({ result: data });
        this.setState({ years: distinctYears });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getMax(data, column) {
    var max = data[0][column];
    for (var i = 1; i < data.length; i++) {
      if (data[i][column] > max) max = data[i][column];
    }
    return max;
  }

  getMin(data, column) {
    var min = data[0][column];
    for (var i = 1; i < data.length; i++) {
      if (data[i][column] < min) min = data[i][column];
    }
    return min;
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  changeChartData() {
    // console.log(
    //   "year changed to: ",
    //   this.state.selectedYear,
    //   " ",
    //   this.state.selectedOptions.length
    // );
    if (this.state.selectedOptions.length === 0) return;
    var stateData = this.state.completeData;
    var data = [];

    if (this.state.selectedOptions.includes(1))
      data.push(["State", "Wait", { role: "style" }]);
    else if (this.state.selectedOptions.includes(2))
      data.push(["State", "onlineReg", { role: "style" }]);
    else if (this.state.selectedOptions.includes(3))
      data.push(["State", "vepTurnout", { role: "style" }]);

    for (var i = 0; i < stateData.length; ++i) {
      if (parseInt(stateData[i].year) !== parseInt(this.state.selectedYear))
        continue;
      var row = [];
      var rowData = stateData[i];
      row.push(rowData.state);

      if (this.state.selectedOptions.includes(1))
        row.push(parseInt(rowData.waitTime));
      else if (this.state.selectedOptions.includes(2))
        row.push(parseInt(rowData.onlineReg * 100));
      else if (this.state.selectedOptions.includes(3))
        row.push(parseInt(rowData.vepTurnout * 100));
      row.push("rgba(75,192,192,1)");
      data.push(row);
    }
    data.sort(function(a, b) {
      return b[1] - a[1];
    });

    this.setState({ result: data });
  }

  changeDropdown(year) {
    this.setState({ selectedYear: year }, () => {
      this.changeChartData();
    });
  }
  onCheckboxBtnClick(selected) {
    // const index = this.state.selectedOptions.indexOf(selected);
    // if (index < 0) {
    //   this.state.selectedOptions.push(selected);
    // } else {
    //   this.state.selectedOptions.splice(index, 1);
    // }
    //this.setState({ selectedOptions: [...this.state.selectedOptions] });

    const index = this.state.selectedOptions.indexOf(selected);
    if (index < 0) {
      this.state.selectedOptions.splice(0, this.state.selectedOptions.length);
      this.state.selectedOptions.push(selected);
    } else {
      this.state.selectedOptions.splice(0, this.state.selectedOptions.length);
      this.state.selectedOptions.push(selected);
    }
    this.setState({ selectedOptions: [...this.state.selectedOptions] }, () => {
      this.changeChartData();
    });
  }
  render() {
    return (
      <div className="App">
        <div>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>{this.state.selectedYear}</DropdownToggle>
            <DropdownMenu>
              {this.state.years.map(year => {
                return (
                  <DropdownItem
                    id={year}
                    key={year}
                    onClick={() => this.changeDropdown(year)}
                  >
                    {year}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Button
            color="primary"
            onClick={() => this.onCheckboxBtnClick(1)}
            active={this.state.selectedOptions.includes(1)}
          >
            Wait Time
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            color="primary"
            onClick={() => this.onCheckboxBtnClick(2)}
            active={this.state.selectedOptions.includes(2)}
          >
            Online Reg
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            color="primary"
            onClick={() => this.onCheckboxBtnClick(3)}
            active={this.state.selectedOptions.includes(3)}
          >
            Turnout
          </Button>
        </div>
        <div>
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
      </div>
    );
  }
}

export default ColumnChart;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
// export default ColumnChart;
