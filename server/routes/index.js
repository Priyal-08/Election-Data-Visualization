var express = require("express");
var router = express.Router();
var modelMain = require("../models/main");
/*
 * GET home page.
 */
router.get("/", modelMain.home);

/*
 * Get election data by id
 */
router.get("/:id", modelMain.getDataById);

/*
 * Get election data by state id
 */
router.get("/state/:id", modelMain.getStateById);

/*
 * Get election data by year
 */
router.get("/year/:id", modelMain.getYearDataById);

/*
 * Get election data for a state for a year
 */
router.get("/state/:state/year/:year", modelMain.getStateDataByYear);

/*
 * Get election voter turn out data for all states for all years
 */
router.get("/voterturnout/:id", modelMain.getVoterTurnOut);

/*
 * Get disability rate for all states for all years
 */
router.get("/disability/:id", modelMain.getDisabilityRate);

/*
 * Get KPI data state and year wise
 */
router.get("/kpi/state/:state/year/:year", modelMain.getStateKpiDataByYear);

/*
 * Get KPI's rank for state and year wise
 */
router.get(
  "/kpi/rank/state/:state/year/:year",
  modelMain.getStateKpiRankDataByYear
);

router.get("/waittime/:id", modelMain.getVoterWaitTime);

router.get("/datacompleteness/:id", modelMain.getDataCompleteness);

router.get(
  "/onlineregistration/:id",
  modelMain.getTotalStateWithOnlineRegistration
);

module.exports = router;
