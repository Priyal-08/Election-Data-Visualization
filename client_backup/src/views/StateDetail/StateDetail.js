import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardColumns,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import Map from "../Charts/map";
import ColumnChart from "./columnChart";
import SLine from "./sLine";
import DLine from "./DisabilityLineGraph";
import OnlineRegistration from "./OnlineRegistration";

import { getFromStorage, setInStorage } from '../storage';

const Widget03 = lazy(() => import('../Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class StateDetail extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      year: 2016,
      kpi_turnout:'51.59',
      kpi_disability:'11.84',
      kpi_wait:'10.98',
      kpi_vrr:'80.35',
      rank_turnout:'48',
      rank_disability:'14',
      rank_wait:'36',
      rank_vrr:'44',
      state_value: "TX",
    };
  }

  onRadioBtnClick(year) {
    //Turnout, Disability, Wait, VRR 
    var year;
    this.setState({
      year: year,
    });
    console.log(year);
    try {
      var url =
        "http://localhost:4000/elections/kpi/state/TX/year/" + year;
      fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log(json.message);
          var turnout = json.Turnout; 
          var disability = json.Disability;
          var wait = json.Wait; 
          var vrr = json.Vrr;
          // console.log(typeof data);
          // data = JSON.parse(data);
          console.log("Turnout: " + turnout + "Disability: " + disability + "Wait: " + wait + "VRR: " + vrr);
          
          this.setState({ 
            kpi_turnout: turnout,
            kpi_disability: disability,
            kpi_wait: wait=="NaN"? "NA" : wait,
            kpi_vrr: vrr
          });
        });
    } catch (error) {
      console.log(error);
    }
    try {
      var url =
        "http://localhost:4000/elections/kpi/rank/state/TX/year/" + year;
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
          console.log("Turnout: " + turnout_rank + "Disability: " + disability_rank + "Wait: " + wait_rank + "VRR: " + vrr_rank);
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
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
   //alert('Year selected:::' + this.state.year);
    return (
      <div className="animated fadeIn">
      <Col sm="0" className="d-none d-sm-inline-block">
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2016)} active={this.state.year === 2016}>2016</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2014)} active={this.state.year === 2014}>2014</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2012)} active={this.state.year === 2012}>2012</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2010)} active={this.state.year === 2010}>2010</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
        <Row>
          <Col xs="12" sm="12" lg="4">
            <Map/>
          </Col>
          <Col xs="12" sm="12" lg="8" style={{paddingLeft: 50}}>
            <Card className="white" style={{textAlign: "center", height: 300}}>
              <CardBody className="pb-0">
                <h1 style={{fontWeight: "bold"}}>California</h1>
                <hr/>
                <h3>Some detail about the state.</h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col xs="12" sm="12" lg="3">
          <h2>Disability</h2>
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div>Percentage of disabled voters</div>
                <h1 style={{textAlign: "center", fontSize: 50}}>{this.state.kpi_disability}%</h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
          <h2>Voting Wait Time</h2>
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div>Percentage of voter wait time</div>
                <h1 style={{textAlign: "center", fontSize: 50}}>{this.state.kpi_wait}</h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
          <h2>Registration Rate</h2>
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div>Percentage of Registration Rate</div>
                <h1 style={{textAlign: "center", fontSize: 50}}>{this.state.kpi_vrr}%</h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
          <h2>Turnout</h2>
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div>Percentage of Voter Turnout</div>
                <h1 style={{textAlign: "center", fontSize: 50}}>{this.state.kpi_turnout}%</h1>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div style={{textAlign: "center"}}>Standing amongst other states</div>
                <h1 style={{textAlign: "center", fontSize: 50}}>{this.state.rank_disability}</h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div style={{textAlign: "center"}}>Standing amongst other states</div>
                <h1 style={{textAlign: "center", fontSize: 50}}>{this.state.rank_wait}</h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div style={{textAlign: "center"}}>Standing amongst other states</div>
                <h1 style={{textAlign: "center", fontSize: 50}}>{this.state.rank_vrr}</h1>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div style={{textAlign: "center"}}>Standing amongst other states</div>
                <h1 style={{textAlign: "center", fontSize: 50}}>{this.state.rank_turnout}</h1>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <hr/>
        <CardColumns className="cols-2">
          <Card style={{ height: "100%", width: "100%" }}>
              <CardHeader>
                <b>% Non-Voters due to disability related problems</b>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {/* <Bar data={this.state.bar} options={options} /> */}
                  <DLine state_value={this.state.state_value}/>
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
                  <SLine state_value={this.state.state_value}/>
                </div>
              </CardBody>
            </Card>
        </CardColumns>
        <hr/>
        <CardColumns className="cols-2">
            <Card style={{ height: "100%", width: "100%" }}>
              <CardHeader>
                <b>Voter Registration Rate</b>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                {/* <Bar data={this.state.bar} options={options} /> */}
                <OnlineRegistration state_value={this.state.state_value}/>
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
                  <ColumnChart state_value={this.state.state_value}/>
                </div>
              </CardBody>
            </Card>
        </CardColumns>
      </div>
    );
  }
}

export default StateDetail;
