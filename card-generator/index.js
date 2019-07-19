import _ from "lodash";
import rarities from "./data/rarities";
import abilities from "./data/abilities";
import GetName from "../card-namer/lib";

for (var i = 0; i < 10; i++) GetRandomCard();

function GetRandomCard() {
  const name = GetName();
  const rarity = GetRarity();
  const cost = GetCost();
  const selectedAbilities = GetAbilities(cost, rarity);
  const [attack, health] = GetAttackAndHealth(cost, rarity, selectedAbilities);
  console.log(
    `${name} - ${cost} Mana ${rarity} ${attack}/${health} ${GetAbilitiesDescription(
      selectedAbilities
    )}`
  );
}

function GetAbilitiesDescription(selectedAbilities) {
  return _.map(selectedAbilities, "name").join(", ");
}

function GetRarity() {
  return _.sample(rarities);
}

function GetCost() {
  return _.sample(_.range(0, 10));
}

function GetAbilities(cost, rarity) {
  let possibleAbilities = 0;
  if (cost < 2) {
    possibleAbilities = cost;
  } else {
    possibleAbilities = GetRarityIdx(rarity) + 1;
  }
  // TODO: don't allow abilities that cost more than cost!
  let selectedAbilities = _.sampleSize(abilities, possibleAbilities);

  selectedAbilities = ReplaceAllButOneTargeted(
    selectedAbilities,
    possibleAbilities
  );

  return selectedAbilities;
}

function GetRarityIdx(rarityName) {
  return _.indexOf(rarities, rarityName);
}

function ReplaceAllButOneTargeted(selectedAbilities, possibleAbilities) {
  const targeted = _.filter(selectedAbilities, { targeted: true });
  if (targeted.length > 1) {
    const untargetedList = _.filter(abilities, { targeted: false });
    const newUntargeted = _.sampleSize(untargetedList, possibleAbilities - 1);
    selectedAbilities = [targeted[0], ...newUntargeted];
  }
  return selectedAbilities;
}

function GetAttackAndHealth(cost, rarity, selectedAbilities) {
  const abilityCost = _.sum(_.map(selectedAbilities, "cost"));
  const rarityModifier = GetRarityIdx(rarity);
  const totalPoints = (cost - abilityCost + rarityModifier) * 2 + 1;

  const splitPos = _.sample(_.range(0, totalPoints));

  return [splitPos, totalPoints - splitPos];
}
