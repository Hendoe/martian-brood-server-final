function makeStructureInventoryArray() {
  return [
    {
      "id": 1,
      "structure_name": "Spawning Pit",
      "constructing_count": 0,
      "brood_count": 1,
      "constructable": true
    },
    {
      "id": 2,
      "structure_name": "Synapse Clusters",
      "constructing_count": 4,
      "brood_count": 1,
      "constructable": true
    },
    {
      "id": 3,
      "structure_name": "Subterranean Tentacles",
      "constructing_count": 0,
      "brood_count": 0,
      "constructable": false
    },
  ];
};

module.exports = {
  makeStructureInventoryArray,
}