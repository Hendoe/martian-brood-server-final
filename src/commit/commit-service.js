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
};

module.exports = CommitService