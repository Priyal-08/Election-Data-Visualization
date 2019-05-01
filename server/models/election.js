const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let electionData = new Schema({
  state_abbv: {
    type: String
  },
  state_fips: {
    type: String
  },
  year: {
    type: String
  },
  website_pollingplace: {
    type: String
  },
  website_reg_status: {
    type: String
  },
  website_precinct_ballot: {
    type: String
  },
  website_absentee_status: {
    type: String
  },
  website_provisional_status: {
    type: String
  },
  reg_rej: {
    type: String
  },
  prov_partic: {
    type: String
  },
  prov_rej_all: {
    type: String
  },
  abs_rej_all_ballots: {
    type: String
  },
  abs_nonret: {
    type: String
  },
  uocava_rej: {
    type: String
  },
  uocava_nonret: {
    type: String
  },
  eavs_completeness: {
    type: String
  },
  post_election_audit: {
    type: String
  },
  nonvoter_illness_pct: {
    type: String
  },
  nonvoter_reg_pct: {
    type: String
  },
  online_reg: {
    type: String
  },
  wait: {
    type: String
  },
  residual: {
    type: String
  },
  pct_reg_of_vep_vrs: {
    type: String
  },
  vep_turnout: {
    type: String
  }
});

let election_data = mongoose.model("election", electionData, "election");
module.exports = election_data;
