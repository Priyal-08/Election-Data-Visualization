import React from "react";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row
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
      selectedOptions: [1], // By default use voting wait time indicator
      dropdownOpen: false,
      selectedYear: 2016,
      years: [],
      yearwiseData: [
        {
          year: 2016,
          data: []
        }
      ],
      gradientWith52Colors: [
        "",
        "#37C256",
        "#3DC354",
        "#44C453",
        "#4AC552",
        "#51C751",
        "#58C850",
        "#5EC94E",
        "#65CB4D",
        "#6BCC4C",
        "#72CD4B",
        "#79CF4A",
        "#7FD048",
        "#86D147",
        "#8DD346",
        "#93D445",
        "#9AD544",
        "#A0D642",
        "#A7D841",
        "#AED940",
        "#B4DA3F",
        "#BBDC3E",
        "#C1DD3C",
        "#C8DE3B",
        "#CFE03A",
        "#D5E139",
        "#DCE238",
        "#E3E437",
        "#E3DE37",
        "#E4D837",
        "#E5D337",
        "#E6CD38",
        "#E6C738",
        "#E7C238",
        "#E8BC38",
        "#E9B639",
        "#E9B139",
        "#EAAB39",
        "#EBA53A",
        "#ECA03A",
        "#EC9A3A",
        "#ED953A",
        "#EE8F3B",
        "#EF893B",
        "#EF843B",
        "#F07E3C",
        "#F1783C",
        "#F2733C",
        "#F26D3C",
        "#F3673D",
        "#F4623D",
        "#F55C3D",
        "#F6573E"
      ]
    };
  }
  componentDidMount() {
    axios
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
        //var data = [];
        var yearwiseData = [];
        var y2008 = [];
        var y2010 = [];
        var y2012 = [];
        var y2014 = [];
        var y2016 = [];
        for (var i = 0; i < response.data.length; ++i) {
          var rowData = response.data[i];
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

        // If voting wait time is less, ranking should be high
        for (var j = 0; j < yearwiseData.length; j++) {
          for (var k = 0; k < yearwiseData[j].data.length; k++) {
            yearwiseData[j].data[k].waitTime =
              1 - yearwiseData[j].data[k].waitTime;
          }
        }
        this.setState(
          { yearwiseData: yearwiseData, years: distinctYears },
          () => {
            this.updateChartData();
          }
        );
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
      row.push(parseInt(value * 100));
      row.push("rgba(75,192,192,1)");
      data.push(row);
    }

    data.sort(function(a, b) {
      return b[1] - a[1];
    });
    data[0][3] = { role: "annotation" };
    for (let a = 1; a < data.length; a++) {
      data[a][2] = this.state.gradientWith52Colors[a];
      data[a][3] = data[a][1] + "%";
      data[a][0] = data[a][0] + " " + a;
    }

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
  }
  render() {
    return (
      <div>
        <Row>
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
          &nbsp;&nbsp;&nbsp;
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
        </Row>
        <Row>
          <Chart
            chartType="BarChart"
            data={this.state.result}
            width={900}
            height={800}
            options={{
              annotations: {
                stemColor: "none"
              },
              chartArea: { width: "85%", height: "95%" },
              vAxis: {
                gridlines: {
                  color: "transparent"
                }
              },
              hAxis: {
                textPosition: "none",
                gridlines: {
                  color: "transparent"
                }
              },
              fillOpacity: "0.0",
              bar: { groupWidth: "70%" },
              legend: "none",
              fontSize: 8
            }}
          />
        </Row>
      </div>
    );
  }
}

export default ColumnChart;
