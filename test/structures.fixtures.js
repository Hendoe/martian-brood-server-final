function makeStructuresArray() {
  return [
    {
      "id": 1,
      "structure_name": "Spawning Pit",
      "hp": 15,
      "atk": 0,
      "biomass_cost": 10,
      "synapse_produced": 0,
      "description": "A pit dug into the ground that gets filled with Biomass to create aliens from.",
      "special_features": "Can build Worker and Warrior Drone Aliens."
  },
  {
      "id": 2,
      "structure_name": "Synapse Clusters",
      "hp": 5,
      "atk": 0,
      "biomass_cost": 10,
      "synapse_produced": 5,
      "description": "A cluster of brains that communicates telepathically with the Brood.",
      "special_features": "Produces 5 synapse for the Brood."
  },
  {
    "id": 3,
    "structure_name": "Subterranean Tentacles",
    "hp": 15,
    "atk": 10,
    "biomass_cost": 10,
    "synapse_produced": 0,
    "description": "Large razor sharp tentacles that can sprout from the ground in an instant.",
    "special_features": "Attacks invaders."
}
  ];
};

module.exports = {
  makeStructuresArray,
}