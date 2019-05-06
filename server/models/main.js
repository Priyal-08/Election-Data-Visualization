const election = require("./election");
var csv = require("csv");

module.exports.home = function(req, res) {
  election.find(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

module.exports.getDataById = function(req, res) {
  let id = req.params.id;
  election.findById(id, function(err, electionresult) {
    res.json(electionresult);
  });
};

module.exports.getStateById = function(req, res) {
  let id = req.params.id;
  election.find({ state_abbv: id }, function(err, electionresult) {
    res.json(electionresult);
  });
};

module.exports.getYearDataById = function(req, res) {
  let id = req.params.id;
  election.find({ year: id }, function(err, electionresult) {
    // console.log(election);
    // console.log(electionresult);
    res.json(electionresult);
  });
};

module.exports.getStateDataByYear = function(req, res) {
  let year = req.params.year;
  let state = req.params.state;

  election.find({ year: year, state_abbv: state }, function(
    err,
    electionresult
  ) {
    res.json(electionresult);
  });
};

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

module.exports.getVoterTurnOut = function(req, res) {
  console.log("Voter turnout");
  const years = [2008, 2010, 2012, 2014, 2016];
  var myMap = [];
  years.forEach(y =>
    election.find({ year: y }, function(err, electionresult) {
      var count = electionresult.length;
      var sum = 0;
      for (var i = 0; i < count; i++) {
        sum += parseFloat(electionresult[i]["vep_turnout"]);
      }
      var vto = 0.0;
      vto = (sum / count) * 100;
      var data = [];
      data.push(y);
      data.push(vto);
      myMap.push(data);
    })
  );
  sleep(1000).then(() => {
    res.json(myMap.sort());
  });
  console.log(myMap);
};

function getMax(data, column) {
  var max = Number.MIN_VALUE;
  for (var i = 0; i < data.length; i++) {
    if (isNaN(parseInt(data[i][column]))) continue;
    if (Number(data[i][column]) > max) max = data[i][column];
  }
  return max;
}

function getMin(data, column) {
  var min = Number.MAX_VALUE;
  for (var i = 0; i < data.length; i++) {
    if (isNaN(parseInt(data[i][column]))) continue;
    if (Number(data[i][column]) < min) min = data[i][column];
  }
  return min;
}

module.exports.getVoterWaitTime = function(req, res) {
  console.log("Voter Wait Time");
  const years = [2008, 2010, 2012, 2014, 2016];
  var myMap = [];
  years.forEach(y =>
    election.find({ year: y }, function(err, electionresult) {
      var count = electionresult.length;
      var sum = 0;
      var sumproblems = 0;
      console.log("Year : " + y);
      // var min = this.getMin(electionresult, "wait");
      // var max = this.getMax(electionresult, "wait");
      var column = "wait";
      var max = Number.MIN_VALUE;
      for (var i = 0; i < electionresult.length; i++) {
        if (isNaN(parseInt(electionresult[i][column]))) continue;
        if (Number(electionresult[i][column]) > max)
          max = electionresult[i][column];
      }

      var min = Number.MAX_VALUE;
      for (var i = 0; i < electionresult.length; i++) {
        if (isNaN(parseInt(electionresult[i][column]))) continue;
        if (Number(electionresult[i][column]) < min)
          min = electionresult[i][column];
      }

      console.log("Min max values");

      for (var i = 0; i < electionresult.length; i++) {
        electionresult[i]["wait"] =
          (electionresult[i]["wait"] - min) / (max - min);
      }
      console.log("Normalized");
      for (var i = 0; i < count; i++) {
        sum += parseFloat(electionresult[i]["wait"]);
        if (isNaN(parseInt(electionresult[i]["reg_rej"]))) continue;
        else sumproblems += parseFloat(electionresult[i]["reg_rej"]);
      }
      var vwt = 0.0;
      var nvr = 0.0;
      vwt = (sum / count) * 100;
      nvr = (sumproblems / count) * 100;
      var data = [];
      data.push(y);
      data.push(vwt);
      data.push(nvr);
      myMap.push(data);
    })
  );
  sleep(1000).then(() => {
    console.log(myMap);
    res.json(myMap.sort());
  });
};

module.exports.getDisabilityRate = function(req, res) {
  console.log("Disability");
  const years = [2008, 2010, 2012, 2014, 2016];
  var DisMap = [];
  years.forEach(y =>
    election.find({ year: y }, function(err, electionresult) {
      var count = electionresult.length;
      var sum = 0;
      for (var i = 0; i < count; i++) {
        if (isNaN(parseInt(electionresult[i]["nonvoter_illness_pct"])))
          continue;
        else sum += parseFloat(electionresult[i]["nonvoter_illness_pct"]);
      }
      var dis = 0.0;
      dis = (sum / count) * 100;
      var data = [];
      data.push(y);
      data.push(dis);
      DisMap.push(data);
    })
  );
  sleep(1000).then(() => {
    res.json(DisMap.sort());
  });
  console.log(DisMap);
};

module.exports.getDataCompleteness = function(req, res) {
  console.log("Data Completeness");
  const years = [2008, 2010, 2012, 2014, 2016];
  var DisMap = [];
  years.forEach(y =>
    election.find({ year: y }, function(err, electionresult) {
      var count = electionresult.length;
      var sum = 0;
      for (var i = 0; i < count; i++) {
        if (isNaN(parseInt(electionresult[i]["eavs_completeness"]))) continue;
        else sum += parseFloat(electionresult[i]["eavs_completeness"]);
      }
      var dis = 0.0;
      dis = (sum / count) * 100;
      var data = [];
      data.push(y);
      data.push(dis);
      DisMap.push(data);
    })
  );
  sleep(1000).then(() => {
    res.json(DisMap.sort());
  });
  console.log(DisMap);
};

module.exports.getTotalStateWithOnlineRegistration = function(req, res) {
  console.log("Data Completeness");
  const years = [2008, 2010, 2012, 2014, 2016];
  var DisMap = [];
  years.forEach(y =>
    election.find({ year: y }, function(err, electionresult) {
      var count = electionresult.length;
      var sum = 0;
      for (var i = 0; i < count; i++) {
        if (isNaN(parseInt(electionresult[i]["online_reg"]))) continue;
        else sum += parseInt(electionresult[i]["online_reg"]);
      }
      var dis = sum;
      var data = [];
      data.push(y);
      data.push(dis);
      DisMap.push(data);
    })
  );
  sleep(1000).then(() => {
    res.json(DisMap.sort());
  });
  console.log(DisMap);
};

module.exports.getStateKpiDataByYear = function(req, res) {
  let year = req.params.year;
  let state = req.params.state;
  var resMap = {};
  election.find(
    { year: year, state_abbv: state },
    {
      _id: 0,
      vep_turnout: 1,
      wait: 1,
      nonvoter_illness_pct: 1,
      pct_reg_of_vep_vrs: 1
    },
    function(err, electionresult) {
      if (err) return next(err);
      var VoterTurnOut = electionresult[0]["vep_turnout"] * 100;
      var Disability = electionresult[0]["nonvoter_illness_pct"] * 100;
      var Vrr = electionresult[0]["pct_reg_of_vep_vrs"] * 100;
      resMap["Turnout"] = VoterTurnOut.toFixed(2);
      resMap["Disability"] = Disability.toFixed(2);
      resMap["Wait"] = parseFloat(electionresult[0]["wait"]).toFixed(2);
      resMap["Vrr"] = Vrr.toFixed(2);
      console.log(resMap);
      res.json(resMap);
    }
  );
};

var resJson = {};
module.exports.getStateKpiRankDataByYear = function(req, res) {
  let year = req.params.year;
  let state = req.params.state;
  election.find(
    { year: year },
    { _id: 0, nonvoter_illness_pct: 1, state_abbv: 1 },
    function(err, disRes) {
      var Dmap = new Map();
      var key, value;
      var count = disRes.length;
      for (var i = 0; i < count; i++) {
        key = disRes[i]["state_abbv"];
        value = disRes[i]["nonvoter_illness_pct"] * 100;
        Dmap.set(key, value);
      }
      var temp = new Map(
        [...Dmap].sort((a, b) => (a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1))
      );
      var arr = Array.from(temp.keys());
      resJson["Disability"] = arr.indexOf(state) + 1;
    }
  );

  election.find(
    { year: year },
    { _id: 0, vep_turnout: 1, state_abbv: 1 },
    function(err, vepRes) {
      var Vmap = new Map();
      var key1, value1;
      var count1 = vepRes.length;
      for (var i = 0; i < count1; i++) {
        key1 = vepRes[i]["state_abbv"];
        value1 = vepRes[i]["vep_turnout"] * 100;
        Vmap.set(key1, value1);
      }
      var temp = new Map(
        [...Vmap].sort((a, b) => (a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1))
      );
      var arr = Array.from(temp.keys());
      resJson["Turnout"] = 51 - arr.indexOf(state);
    }
  );

  election.find({ year: year }, { _id: 0, wait: 1, state_abbv: 1 }, function(
    err,
    waitRes
  ) {
    var Wmap = new Map();
    var key2, value2;
    var count2 = waitRes.length;
    for (var i = 0; i < count2; i++) {
      key2 = waitRes[i]["state_abbv"];
      value2 = parseFloat(waitRes[i]["wait"]);
      Wmap.set(key2, value2);
    }
    var temp = new Map(
      [...Wmap].sort((a, b) => (a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1))
    );
    var arr = Array.from(temp.keys());
    resJson["Wait"] = arr.indexOf(state) + 1;
  });

  election.find(
    { year: year },
    { _id: 0, pct_reg_of_vep_vrs: 1, state_abbv: 1 },
    function(err, vrrRes) {
      var Rmap = new Map();
      var key3, value3;
      var count = vrrRes.length;
      for (var i = 0; i < count; i++) {
        key3 = vrrRes[i]["state_abbv"];
        value3 = vrrRes[i]["pct_reg_of_vep_vrs"] * 100;
        Rmap.set(key3, value3);
      }
      var temp = new Map(
        [...Rmap].sort((a, b) => (a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1))
      );
      console.log(temp);
      var arr = Array.from(temp.keys());
      resJson["Vrr"] = 51 - arr.indexOf(state);
    }
  );
  console.log(resJson);
  res.json(resJson);
};

function MyCSV(
  state_abbv,
  state_fips,
  year,
  website_pollingplace,
  website_reg_status,
  website_precinct_ballot,
  website_absentee_status,
  website_provisional_status,
  reg_rej,
  prov_partic,
  prov_rej_all,
  abs_rej_all_ballots,
  abs_nonret,
  uocava_rej,
  uocava_nonret,
  eavs_completeness,
  post_election_audit,
  nonvoter_illness_pct,
  nonvoter_reg_pct,
  online_reg,
  wait,
  residual,
  pct_reg_of_vep_vrs,
  vep_turnout
) {
  this.state_abbv = state_abbv;
  this.state_fips = state_fips;
  this.year = year;
  this.website_pollingplace = website_pollingplace;
  this.website_reg_status = website_reg_status;
  this.website_precinct_ballot = website_precinct_ballot;
  this.website_absentee_status = website_absentee_status;
  this.website_provisional_status = website_provisional_status;
  this.reg_rej = reg_rej;
  this.prov_partic = prov_partic;
  this.prov_rej_all = prov_rej_all;
  this.abs_rej_all_ballots = abs_rej_all_ballots;
  this.abs_nonret = abs_nonret;
  this.uocava_rej = uocava_rej;
  this.uocava_nonret = uocava_nonret;
  this.eavs_completeness = eavs_completeness;
  this.post_election_audit = post_election_audit;
  this.nonvoter_illness_pct = nonvoter_illness_pct;
  this.nonvoter_reg_pct = nonvoter_reg_pct;
  this.online_reg = online_reg;
  this.wait = wait;
  this.residual = residual;
  this.pct_reg_of_vep_vrs = pct_reg_of_vep_vrs;
  this.vep_turnout = vep_turnout;
}

module.exports.load_data = function(req, res) {
  console.log("inside load data");
  var path = "epi_indicators-all_years.csv";
  var obj = csv();
  var users = [];
  obj.from.path(path).to.array(function(data) {
    var i = 0;
    for (i = 0; i < data.length; i++) {
      var electionCsv = new MyCSV(
        data[i][0],
        data[i][1],
        data[i][2],
        data[i][3],
        data[i][4],
        data[i][5],
        data[i][6],
        data[i][7],
        data[i][8],
        data[i][9],
        data[i][10],
        data[i][11],
        data[i][12],
        data[i][13],
        data[i][14],
        data[i][15],
        data[i][16],
        data[i][17],
        data[i][18],
        data[i][19],
        data[i][20],
        data[i][21],
        data[i][22],
        data[i][23]
      );
      insert_data(electionCsv).then(response => {
        console.log("inserted user");
      });
      if (i == data.length - 1) {
        console.log("Completed");
      }
    }
  });
};

function insert_data(electionCsv) {
  console.log("inside insert data");
  return new Promise((resolve, reject) => {
    if (reject) {
      console.log("ERROR");
    }
    election.create(
      {
        state_abbv: electionCsv.state_abbv,
        state_fips: electionCsv.state_fips,
        year: electionCsv.year,
        website_pollingplace: electionCsv.website_pollingplace,
        website_reg_status: electionCsv.website_reg_status,
        website_precinct_ballot: electionCsv.website_precinct_ballot,
        website_absentee_status: electionCsv.website_absentee_status,
        website_provisional_status: electionCsv.website_provisional_status,
        reg_rej: electionCsv.reg_rej,
        prov_partic: electionCsv.prov_partic,
        prov_rej_all: electionCsv.prov_rej_all,
        abs_rej_all_ballots: electionCsv.abs_rej_all_ballots,
        abs_nonret: electionCsv.abs_nonret,
        uocava_rej: electionCsv.uocava_rej,
        uocava_nonret: electionCsv.uocava_nonret,
        eavs_completeness: electionCsv.eavs_completeness,
        post_election_audit: electionCsv.post_election_audit,
        nonvoter_reg_pct: electionCsv.nonvoter_reg_pct,
        online_reg: electionCsv.online_reg,
        wait: electionCsv.wait,
        residual: electionCsv.residual,
        pct_reg_of_vep_vrs: electionCsv.pct_reg_of_vep_vrs,
        vep_turnout: electionCsv.vep_turnout
      },
      function(err, userData) {
        if (err) throw err;
        // result.redirect("/admin-dashboard");
      }
    );
  });
}


module.exports.getStateInfo = function(req, res) {
  let state = req.params.state;
  const fs = require('fs'); 
  const csv = require('csv-parser');
  var resMap = {};
  var path = "./models/state-info.csv";
  fs.createReadStream(path)
  .pipe(csv())
  .on('data', function(data){
      if (data['abbr'] == state){
        resMap["State"] = data['state'];
        resMap["Abbr"] = data['abbr'];
        resMap["Info"] = data['info'];
        console.log(resMap);
        res.json(resMap);
      }
    })
  .on('end',function(){
  }); 
};