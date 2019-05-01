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

module.exports = router;
