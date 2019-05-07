import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardColumns,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import ColumnChart from "./columnChart";
import SLine from "./sLine";
import DLine from "./DisabilityLineGraph";
import OnlineRegistration from "./OnlineRegistration";
import Map from "../Charts/map";
// var elements = 27;
// var data1 = [];
// var data2 = [];
// var data3 = [];

// for (var i = 0; i <= elements; i++) {
//   data1.push(random(50, 200));
//   data2.push(random(80, 100));
//   data3.push(65);
// }

class StateDetail extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      year: 2016,
      kpi_turnout: "51.59",
      kpi_disability: "11.84",
      kpi_wait: "10.98",
      kpi_vrr: "80.35",
      rank_turnout: "48",
      rank_disability: "14",
      rank_wait: "36",
      rank_vrr: "44",
      state_value: "TX",
      state_name: "Texas",
      state_description: ""
    };
    this.childHandler = this.childHandler.bind(this);
  }

  componentDidMount() {
    this.getStateDescription();
  }

  childHandler(dataFromChild) {
    // log our state before and after we updated it
    console.log(dataFromChild);
    // this.setState({state_value: dataFromChild})
    this.onStateBtnClick(dataFromChild);
  }

  onRadioBtnClick(year) {
    //Turnout, Disability, Wait, VRR
    var year;
    this.setState(
      {
        year: year
      },
      () => {
        this.getStateDetails();
      }
    );
  }

  onStateBtnClick(state) {
    //Turnout, Disability, Wait, VRR
    var state;
    this.setState(
      {
        state_value: state
      },
      () => {
        this.getStateDetails();
        this.getStateDescription();
      }
    );
  }

  getStateDescription() {
    try {
      var url =
        "http://localhost:4000/elections/info/state/" + this.state.state_value;
      fetch(url)
        .then(res => res.json())
        .then(jsonResponse => {
          this.setState({
            state_name: jsonResponse.State,
            state_description: jsonResponse.Info
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  getStateDetails() {
    try {
      var url =
        "http://localhost:4000/elections/kpi/state/" +
        this.state.state_value +
        "/year/" +
        this.state.year;
      fetch(url)
        .then(res => res.json())
        .then(json => {
          var turnout = json.Turnout;
          var disability = json.Disability;
          var wait = json.Wait;
          var vrr = json.Vrr;

          this.setState({
            kpi_turnout: turnout,
            kpi_disability: disability,
            kpi_wait: wait == "NaN" ? "NA" : wait,
            kpi_vrr: vrr
          });
        });
    } catch (error) {
      console.log(error);
    }
    try {
      var url =
        "http://localhost:4000/elections/kpi/rank/state/" +
        this.state.state_value +
        "/year/" +
        this.state.year;
      console.log(url);
      fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log(json.message);
          var turnout_rank = json.Turnout;
          var disability_rank = json.Disability;
          var wait_rank = json.Wait;
          var vrr_rank = json.Vrr;
          // console.log(typeof data);
          // data = JSON.parse(data);
          console.log(
            "Turnout: " +
              turnout_rank +
              "Disability: " +
              disability_rank +
              "Wait: " +
              wait_rank +
              "VRR: " +
              vrr_rank
          );
          this.setState({
            rank_turnout: turnout_rank,
            rank_disability: disability_rank,
            rank_wait: wait_rank,
            rank_vrr: vrr_rank
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    //alert('Year selected:::' + this.state.year);
    return (
      <div className="animated fadeIn">
        <Col sm="0" className="d-none d-sm-inline-block">
          <ButtonToolbar
            className="float-right"
            aria-label="Toolbar with button groups"
          >
            <ButtonGroup
              style={{
                //paddingLeft: 20,
                // paddingTop: 20,
                backgroundColor: "#FFF"
              }}
            >
              <Button
                outline
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingBottom: "6px",
                  paddingTop: "6px",
                  fontSize: 13
                }}
                color="primary"
                onClick={() => this.onRadioBtnClick(2016)}
                active={this.state.year === 2016}
              >
                2016
              </Button>
              <Button
                outline
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingBottom: "6px",
                  paddingTop: "6px",
                  fontSize: 13
                }}
                color="primary"
                onClick={() => this.onRadioBtnClick(2014)}
                active={this.state.year === 2014}
              >
                2014
              </Button>
              <Button
                outline
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingBottom: "6px",
                  paddingTop: "6px",
                  fontSize: 13
                }}
                color="primary"
                onClick={() => this.onRadioBtnClick(2012)}
                active={this.state.year === 2012}
              >
                2012
              </Button>
              <Button
                outline
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingBottom: "6px",
                  paddingTop: "6px",
                  fontSize: 13
                }}
                color="primary"
                onClick={() => this.onRadioBtnClick(2010)}
                active={this.state.year === 2010}
              >
                2010
              </Button>
              <Button
                outline
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingBottom: "6px",
                  paddingTop: "6px",
                  fontSize: 13
                }}
                color="primary"
                onClick={() => this.onRadioBtnClick(2008)}
                active={this.state.year === 2008}
              >
                2008
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
        <Row>
          <Col xs="12" sm="12" lg="4">
            <Map action={this.childHandler} />
          </Col>
          <Col xs="12" sm="12" lg="8">
            <Card
              className="white"
              style={{ textAlign: "center", height: 300 }}
            >
              <CardBody className="pb-0" >
                <h1 style={{ fontWeight: "bold", textAlign: 'center'}}>{this.state.state_name}</h1>
                <hr />
                </CardBody>
               
                <CardBody className="pb-0" style={{overflowY:"scroll", textAlign: 'justify', paddingLeft: 30, paddingRight: 30, marginBottom: 30, paddingTop: 0}}>
                <span style={{ fontWeight: '100', textAlign: 'right', fontFamily: 'BlinkMacSystemFont', fontSize: '16px', paddingBottom: 30}}>{this.state.state_description}</span>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs="12" sm="12" lg="3">
            <h3 style={{textAlign:"center"}}>Disability</h3>
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div>Percentage of disabled voters</div>
                <h1 style={{ textAlign: "center", fontSize: 50 }}>
                  {this.state.kpi_disability}%
                </h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
          <h3 style={{textAlign:"center"}}>Voting Wait Time</h3>
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div>Percentage of voter wait time</div>
                <h1 style={{ textAlign: "center", fontSize: 50 }}>
                  {this.state.kpi_wait}
                </h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
          <h3 style={{textAlign:"center"}}>Registration Rate</h3>
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div>Percentage of Registration Rate</div>
                <h1 style={{ textAlign: "center", fontSize: 50 }}>
                  {this.state.kpi_vrr}%
                </h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
          <h3 style={{textAlign:"center"}}>Turnout</h3>
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div>Percentage of Voter Turnout</div>
                <h1 style={{ textAlign: "center", fontSize: 50 }}>
                  {this.state.kpi_turnout}%
                </h1>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div style={{ textAlign: "center" }}>
                  Standing amongst other states
                </div>
                <h1 style={{ textAlign: "center", fontSize: 50 }}>
                  {this.state.rank_disability}
                </h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div style={{ textAlign: "center" }}>
                  Standing amongst other states
                </div>
                <h1 style={{ textAlign: "center", fontSize: 50 }}>
                  {this.state.rank_wait}
                </h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div style={{ textAlign: "center" }}>
                  Standing amongst other states
                </div>
                <h1 style={{ textAlign: "center", fontSize: 50 }}>
                  {this.state.rank_vrr}
                </h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div style={{ textAlign: "center" }}>
                  Standing amongst other states
                </div>
                <h1 style={{ textAlign: "center", fontSize: 50 }}>
                  {this.state.rank_turnout}
                </h1>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <hr />
        <h1 style={{textAlign: "center"}}>{this.state.state_name}</h1>
        <CardColumns className="cols-2">
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>
              <b>% Non-Voters due to disability related problems</b>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                {/* <Bar data={this.state.bar} options={options} /> */}
                <DLine state_value={this.state.state_value} />
              </div>
            </CardBody>
          </Card>
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>
              <b>Voting Wait Time</b>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                {/* <Bar data={this.state.bar} options={options} /> */}
                <SLine state_value={this.state.state_value} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>
        <hr />
        <CardColumns className="cols-2">
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>
              <b>Voter Registration Rate</b>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                {/* <Bar data={this.state.bar} options={options} /> */}
                <OnlineRegistration state_value={this.state.state_value} />
              </div>
            </CardBody>
          </Card>
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>
              <b>% Voter turnout</b>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                {/* <Bar data={this.state.bar} options={options} /> */}
                <ColumnChart state_value={this.state.state_value} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

export default StateDetail;
