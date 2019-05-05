import React from "react";
import { ButtonToolbar, ButtonGroup, Button, Row, Col } from "reactstrap";
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
      selectedYear: parseInt(2016),
      years: [],
      yearwiseData: [
        {
          year: 2016,
          data: []
        }
      ],
      indicators: [
        { idx: 1, value: "Voting Wait Time" },
        { idx: 2, value: "Online Registration Available" },
        { idx: 3, value: "Turnout" },
        { idx: 4, value: "Voter Registration Rate" },
        { idx: 5, value: "Registration Rejected" },
        { idx: 6, value: "Ballot Problems" },
        { idx: 7, value: "Disability/Illness Problems" },
        { idx: 8, value: "Residual Vote Rate" },
        { idx: 9, value: "Data Completeness" }
      ],
      gradientWith52Colors: [
        "#37C256",
        "#37C256",
        "#37C256",
        "#3DC354",
        "#3DC354",
        "#44C453",
        "#44C453",
        "#4AC552",
        "#4AC552",
        "#51C751",
        "#51C751",
        "#58C850",
        "#58C850",
        "#5EC94E",
        "#5EC94E",
        "#65CB4D",
        "#65CB4D",
        "#6BCC4C",
        "#6BCC4C",
        "#72CD4B",
        "#72CD4B",
        "#79CF4A",
        "#79CF4A",
        "#7FD048",
        "#7FD048",
        "#86D147",
        "#86D147",
        "#8DD346",
        "#8DD346",
        "#93D445",
        "#93D445",
        "#9AD544",
        "#9AD544",
        "#A0D642",
        "#A0D642",
        "#A7D841",
        "#A7D841",
        "#AED940",
        "#AED940",
        "#B4DA3F",
        "#B4DA3F",
        "#BBDC3E",
        "#BBDC3E",
        "#C1DD3C",
        "#C1DD3C",
        "#C8DE3B",
        "#C8DE3B",
        "#CFE03A",
        "#CFE03A",
        "#D5E139",
        "#D5E139",
        "#DCE238",
        "#DCE238",
        "#E3E437",
        "#E3E437",
        "#E3DE37",
        "#E3DE37",
        "#E4D837",
        "#E4D837",
        "#E5D337",
        "#E5D337",
        "#E6CD38",
        "#E6CD38",
        "#E6C738",
        "#E6C738",
        "#E7C238",
        "#E7C238",
        "#E8BC38",
        "#E8BC38",
        "#E9B639",
        "#E9B639",
        "#E9B139",
        "#E9B139",
        "#EAAB39",
        "#EAAB39",
        "#EBA53A",
        "#EBA53A",
        "#ECA03A",
        "#ECA03A",
        "#EC9A3A",
        "#EC9A3A",
        "#ED953A",
        "#ED953A",
        "#EE8F3B",
        "#EE8F3B",
        "#EF893B",
        "#EF893B",
        "#EF843B",
        "#EF843B",
        "#F07E3C",
        "#F07E3C",
        "#F1783C",
        "#F1783C",
        "#F2733C",
        "#F2733C",
        "#F26D3C",
        "#F26D3C",
        "#F3673D",
        "#F3673D",
        "#F4623D",
        "#F4623D",
        "#F55C3D",
        "#F55C3D",
        "#F6573E",
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
        response.data.sort(function(a, b) {
          return b.year - a.year;
        });
        var yearwiseData = [];
        var y2008 = [];
        var y2010 = [];
        var y2012 = [];
        var y2014 = [];
        var y2016 = [];
        for (var i = 0; i < response.data.length; ++i) {
          var rowData = response.data[i];
          var currData = {
            state: rowData.state_fips,
            year: rowData.year,
            onlineReg: rowData.online_reg,
            waitTime: rowData.wait,
            vepTurnout: rowData.vep_turnout,
            voterRegRate: rowData.pct_reg_of_vep_vrs,
            regRejected: rowData.reg_rej,
            ballotProblems: rowData.abs_rej_all_ballots,
            illnessProblems: rowData.nonvoter_illness_pct,
            residualVoteRate: rowData.residual,
            dataCompleteness: rowData.eavs_completeness
          };
          switch (parseInt(rowData.year)) {
            case 2008:
              y2008.push(currData);
              break;
            case 2010:
              y2010.push(currData);
              break;
            case 2012:
              y2012.push(currData);
              break;
            case 2014:
              y2014.push(currData);
              break;
            case 2016:
              y2016.push(currData);
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
          yearwiseData[idx].data = this.scaleValues(
            yearwiseData[idx].data,
            "voterRegRate"
          );
          yearwiseData[idx].data = this.scaleValues(
            yearwiseData[idx].data,
            "regRejected"
          );
          yearwiseData[idx].data = this.scaleValues(
            yearwiseData[idx].data,
            "ballotProblems"
          );
          yearwiseData[idx].data = this.scaleValues(
            yearwiseData[idx].data,
            "illnessProblems"
          );
          yearwiseData[idx].data = this.scaleValues(
            yearwiseData[idx].data,
            "residualVoteRate"
          );
          yearwiseData[idx].data = this.scaleValues(
            yearwiseData[idx].data,
            "dataCompleteness"
          );
        }

        // 1. If voting wait time is less, ranking should be high
        // 2. If rejecteion rate is less, ranking should be high
        // 3. If ballot problems are less, ranking should be high
        // 4. If illness problems are less, ranking should be high
        for (var j = 0; j < yearwiseData.length; j++) {
          for (var k = 0; k < yearwiseData[j].data.length; k++) {
            yearwiseData[j].data[k].waitTime =
              1 - yearwiseData[j].data[k].waitTime;
            yearwiseData[j].data[k].regRejected =
              1 - yearwiseData[j].data[k].regRejected;
            yearwiseData[j].data[k].ballotProblems =
              1 - yearwiseData[j].data[k].ballotProblems;
            yearwiseData[j].data[k].illnessProblems =
              1 - yearwiseData[j].data[k].illnessProblems;
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
      if (isNaN(parseInt(data[i][column]))) {
        switch (column) {
          case "waitTime":
            data[i][column] = 1;
            break;
          case "regRejected":
            data[i][column] = 1;
            break;
          case "ballotProblems":
            data[i][column] = 1;
            break;
          case "illnessProblems":
            data[i][column] = 1;
            break;
          default:
            data[i][column] = 0;
        }
      } else {
        data[i][column] = (data[i][column] - min) / (max - min);
      }
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
    let unscaledData = [];
    for (let i = 0; i < stateData.length; ++i) {
      var rowData = stateData[i];
      let value = 0;
      if (this.state.selectedOptions.includes(1)) value += rowData.waitTime;
      if (this.state.selectedOptions.includes(2)) value += rowData.onlineReg;
      if (this.state.selectedOptions.includes(3)) value += rowData.vepTurnout;
      if (this.state.selectedOptions.includes(4)) value += rowData.voterRegRate;
      if (this.state.selectedOptions.includes(5)) value += rowData.regRejected;
      if (this.state.selectedOptions.includes(6))
        value += rowData.ballotProblems;
      if (this.state.selectedOptions.includes(7))
        value += rowData.illnessProblems;
      if (this.state.selectedOptions.includes(8))
        value += rowData.residualVoteRate;
      if (this.state.selectedOptions.includes(9))
        value += rowData.dataCompleteness;
      unscaledData.push({ state: rowData.state, value: value });
    }

    unscaledData = this.scaleValues(unscaledData, "value");

    var data = [];
    data.push(["State", "%", { role: "style" }, { role: "annotation" }]);
    for (let i = 0; i < unscaledData.length; i++) {
      let row = [];
      row.push(unscaledData[i].state);
      row.push(parseInt(unscaledData[i].value * 100));
      row.push(this.state.gradientWith52Colors[100 - row[1]]);
      row.push(row[1] + "%");
      data.push(row);
    }
    data.sort(function(a, b) {
      return b[1] - a[1];
    });

    for (let i = 1; i < data.length; i++) {
      data[i][0] = data[i][0] + " " + i;
    }
    this.setState({ result: data });
  }

  updateYear(year) {
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
      <div style={{ backgroundColor: "white" }}>
        <Row>
          <Col lg="1" />
          <Col lg="3" style={{ paddingLeft: 50, backgroundColor: "#F0F0F0" }}>
            <Row>
              <ButtonToolbar
                className="float-right"
                aria-label="Toolbar with button groups"
              >
                <ButtonGroup className="mr-3" aria-label="First group">
                  {this.state.years.map(year => {
                    return (
                      <Button
                        color="outline-secondary"
                        onClick={() => this.updateYear(year)}
                        active={
                          parseInt(this.state.selectedYear) === parseInt(year)
                        }
                      >
                        {year}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </ButtonToolbar>
            </Row>
            &nbsp;&nbsp;&nbsp;
            <Row>
              <span>Indicators</span>
            </Row>
            &nbsp;&nbsp;&nbsp;
            {this.state.indicators.map(indicator => {
              return (
                <div>
                  <Row>
                    <Button
                      className="btn-lg"
                      // size="lg"
                      color="primary"
                      onClick={() => this.onCheckboxBtnClick(indicator.idx)}
                      active={this.state.selectedOptions.includes(
                        indicator.idx
                      )}
                    >
                      {indicator.value}
                    </Button>
                  </Row>
                  &nbsp;&nbsp;&nbsp;
                </div>
              );
            })}
          </Col>
          <Col lg="8">
            <Chart
              chartType="BarChart"
              data={this.state.result}
              width={1000}
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default ColumnChart;
