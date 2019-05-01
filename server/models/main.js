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
  console.log("Sleep called");
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
      //myMap[y] = vto;
    })
  );
  sleep(1000).then(() => {
    console.log(myMap);
    res.json(myMap.sort());
  });
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
