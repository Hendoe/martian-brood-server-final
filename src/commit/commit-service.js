const CommitService = {
  updateStatus(knex, newStatus) {
    return knex('status_report')
      .update(newStatus)
      .returning('*')
  },
  updateAliens(knex, newAliens) {
    return knex('aliens')
      .update(newAliens)
      .returning('*')
  },
  updateAliens(knex, newStructures) {
    return knex('structures')
      .update(newStructures)
      .returning('*')
  },
};

module.exports = CommitService