const StatusService = {
  getStatus(knex) {
    return knex.select('*').from('status_report')
  },
};

module.exports = StatusService