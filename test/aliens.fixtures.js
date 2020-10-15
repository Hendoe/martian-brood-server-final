function makeAliensArray() {
  return [
    {
      "id": 1,
        "alien_name": "Worker Drone",
        "spawnable": true,
        "spawning_count": 0,
        "brood_count": 0,
        "hp": 1,
        "atk": 1,
        "biomass_cost": 5,
        "synapse_required": 1,
        "description": "Simple alien. Gathers Biomass for the growth of the Brood.",
        "special_features": "Able to do many tasks."
    },
  ];
};

module.exports = {
  makeAliensArray,
}