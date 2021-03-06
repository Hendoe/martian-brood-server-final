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
};

module.exports = CommitService