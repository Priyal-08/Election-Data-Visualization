import React from "react";

const Charts = React.lazy(() => import("./views/Charts"));
const StateDetail = React.lazy(() => import("./views/StateDetail"));
const StateComparison = React.lazy(() => import("./views/StateComparison"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/stateDetail", name: "StateDetail", component: StateDetail },
  {
    path: "/stateComparison",
    name: "StateComparison",
    component: StateComparison
  }
];

export default routes;
