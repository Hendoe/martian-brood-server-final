const CommitService = {
  updateStatus(knex, newStatus) {
    return knex('status_report')
      .update(newStatus)
      .returning('*')
  },
  updateAlienInventory(knex, id, newAlienInventory) {
    return knex('alien_inventory')
      .where({ id })
      .update(newAlienInventory)
      .returning('*')
  },
  updateStructureInventory(knex, newStructureInventory) {
    return knex('structure_inventory')
      .update(newStructureInventory)
      .returning('*')
  },
};

module.exports = CommitService