import _ from "lodash";
import colours from "./data/colours";
import geography from "./data/geography";
import gems from "./data/gems";
import metals from "./data/metals";
import classes from "./data/classes";
import creatures from "./data/creatures";
import elements from "./data/elements";
import weapons from "./data/weapons";

for (var i = 0; i < 100; i++) {
  console.log(GetName());
}

function GetName() {
  return GetNameArray().join(" ");
}

function GetNameArray() {
  let resultArray = [];
  resultArray.push(GetFirstPart());
  resultArray.push(GetLastPart());
  return resultArray;
}

function GetFirstPart() {
  const geography = GetGeographyOrEmpty();
  const mainPart = _.sample([
    _.sample(metals),
    _.sample(colours),
    _.sample(gems),
    _.sample(elements),
    _.sample(weapons)
  ]);

  return mainPart + geography.toLowerCase();
}

function GetGeographyOrEmpty() {
  return _.sample(["", _.sample(geography)]);
}

function GetLastPart() {
  return _.sample([_.sample(classes), _.sample(creatures)]);
}

export default GetName;
//module.exports = { GetName: GetName };
