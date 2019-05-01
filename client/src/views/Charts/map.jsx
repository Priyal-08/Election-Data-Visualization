// Step 1 - Including react
import React from "react";
import axios from "axios";

// Step 2 - Including the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Including the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Including the map renderer
import FusionMaps from "fusioncharts/fusioncharts.maps";

// Step 5 - Including the map definition file
// import World from "fusioncharts/maps/fusioncharts.world";

import USA from "fusioncharts/maps/fusioncharts.usa";

// Step 6 - Including the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 7 - Adding the map as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionMaps, USA, FusionTheme);

// Step 8 - Creating the JSON object to store the map configurations

// componentDid;

// data = [];

// Step 8 - Creating the DOM element to pass the react-fusioncharts component
export default class Map extends React.Component {
  state = {
    result: []
  };
  chartConfigs = {
    type: "usa",
    // width: "700",
    // height: "370",
    dataFormat: "json",
    dataSource: {
      // Map Configuration
      chart: {
        caption: "Availibility of online registration in year 2016",
        showToolTip: "1",
        //subcaption: " 2016",
        numbersuffix: "",
        includevalueinlabels: "1",
        labelsepchar: ": ",
        entityFillHoverColor: "#FFF9C4",
        theme: "fusion"
      },
      // Aesthetics; ranges synced with the slider
      colorrange: {
        minvalue: "0",
        code: "#088ab2",
        gradient: "1",
        color: [
          {
            minvalue: "0",
            maxvalue: "0.5",
            color: "#32c2ef"
          },
          {
            minvalue: "0.5",
            maxvalue: "1",
            color: "#64d9db"
          }
        ]
      },
      // Source data as JSON --> id represents countries of world.
      data: []
    }
  };
  temp = [];
  loadData = () => {
    for (var i = 0, l = this.state.result.length; i < l; i++) {
      this.temp.push({
        id: this.state.result[i].state_abbv,
        value: this.state.result[i].online_reg,
        showLabel: 0
      });
    }
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/elections/year/2016")
      .then(response => {
        // console.log(response.data);
        this.setState({ result: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    this.loadData();
    this.chartConfigs.dataSource.data = this.temp;
    return <ReactFC {...this.chartConfigs} />;
  }
}

// export default Map;
