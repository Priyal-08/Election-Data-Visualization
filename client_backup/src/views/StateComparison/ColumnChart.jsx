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
      years: [],
      yearwiseData: [
        {
          year: 2016,
          data: []
        }
      ]
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
          return b.year - a.year;
        });
        var data = [];
        var completeData = [];
        var yearwiseData = [];
        var y2008 = [];
        var y2010 = [];
        var y2012 = [];
        var y2014 = [];
        var y2016 = [];
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

          switch (parseInt(rowData.year)) {
            case 2008:
              y2008.push({
                state: rowData.state_fips,
                year: rowData.year,
                onlineReg: rowData.online_reg,
                waitTime: rowData.wait,
                vepTurnout: rowData.vep_turnout
              });
              break;
            case 2010:
              y2010.push({
                state: rowData.state_fips,
                year: rowData.year,
                onlineReg: rowData.online_reg,
                waitTime: rowData.wait,
                vepTurnout: rowData.vep_turnout
              });
              break;
            case 2012:
              y2012.push({
                state: rowData.state_fips,
                year: rowData.year,
                onlineReg: rowData.online_reg,
                waitTime: rowData.wait,
                vepTurnout: rowData.vep_turnout
              });
              break;
            case 2014:
              y2014.push({
                state: rowData.state_fips,
                year: rowData.year,
                onlineReg: rowData.online_reg,
                waitTime: rowData.wait,
                vepTurnout: rowData.vep_turnout
              });
              break;
            case 2016:
              y2016.push({
                state: rowData.state_fips,
                year: rowData.year,
                onlineReg: rowData.online_reg,
                waitTime: rowData.wait,
                vepTurnout: rowData.vep_turnout
              });
              break;
            default:
              console.log("unexpected year: ", rowData.year);
          }

          completeData.push({
            state: rowData.state_fips,
            year: rowData.year,
            onlineReg: rowData.online_reg,
            waitTime: rowData.wait,
            vepTurnout: rowData.vep_turnout
          });
        }
        yearwiseData.push({ year: 2008, data: y2008 });
        yearwiseData.push({ year: 2010, data: y2010 });
        yearwiseData.push({ year: 2012, data: y2012 });
        yearwiseData.push({ year: 2014, data: y2014 });
        yearwiseData.push({ year: 2016, data: y2016 });
        for (var idx = 0; idx < yearwiseData.length; idx++) {
          yearwiseData[idx].data = this.scaleValues(
            yearwiseData[idx].data,
            "onlineReg"
          );
          yearwiseData[idx].data = this.scaleValues(
            yearwiseData[idx].data,
            "waitTime"
          );
          yearwiseData[idx].data = this.scaleValues(
            yearwiseData[idx].data,
            "vepTurnout"
          );
        }

        data.sort(function(a, b) {
          return b[1] - a[1];
        });
        this.setState({ completeData: completeData });
        this.setState({ result: data });
        this.setState({ years: distinctYears });
        this.setState({ yearwiseData: yearwiseData });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getMax(data, column) {
    var max = Number.MIN_VALUE;
    for (var i = 0; i < data.length; i++) {
      if (isNaN(parseInt(data[i][column]))) continue;
      if (Number(data[i][column]) > max) max = data[i][column];
    }
    return max;
  }

  getMin(data, column) {
    var min = Number.MAX_VALUE;
    for (var i = 0; i < data.length; i++) {
      if (isNaN(parseInt(data[i][column]))) continue;
      if (Number(data[i][column]) < min) min = data[i][column];
    }
    return min;
  }

  scaleValues(data, column) {
    var min = this.getMin(data, column);
    var max = this.getMax(data, column);
    for (var i = 0; i < data.length; i++) {
      data[i][column] = (data[i][column] - min) / (max - min);
    }
    return data;
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  updateChartData() {
    if (this.state.selectedOptions.length === 0) return;
    var year = parseInt(this.state.selectedYear);
    var stateData = [];
    for (var j = 0; j < this.state.yearwiseData.length; j++) {
      if (this.state.yearwiseData[j].year === year)
        stateData = this.state.yearwiseData[j].data;
    }

    // console.log("stateData: ", stateData);

    var data = [];

    data.push(["State", "%", { role: "style" }]);

    for (var i = 0; i < stateData.length; ++i) {
      var row = [];
      var rowData = stateData[i];
      row.push(rowData.state);
      var value = 0;
      if (this.state.selectedOptions.includes(1)) value += rowData.waitTime;
      if (this.state.selectedOptions.includes(2)) value += rowData.onlineReg;
      if (this.state.selectedOptions.includes(3)) value += rowData.vepTurnout;
      row.push(value);
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
      this.updateChartData();
    });
  }
  onCheckboxBtnClick(selected) {
    const index = this.state.selectedOptions.indexOf(selected);
    if (index < 0) {
      this.state.selectedOptions.push(selected);
    } else {
      this.state.selectedOptions.splice(index, 1);
    }
    this.setState({ selectedOptions: [...this.state.selectedOptions] }, () => {
      this.updateChartData();
    });

    // const index = this.state.selectedOptions.indexOf(selected);
    // if (index < 0) {
    //   this.state.selectedOptions.splice(0, this.state.selectedOptions.length);
    //   this.state.selectedOptions.push(selected);
    // } else {
    //   this.state.selectedOptions.splice(0, this.state.selectedOptions.length);
    //   this.state.selectedOptions.push(selected);
    // }
    // this.setState({ selectedOptions: [...this.state.selectedOptions] }, () => {
    //   this.updateChartData();
    // });
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
