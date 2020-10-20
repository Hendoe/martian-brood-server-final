const StatusService = {
  getStatus(knex) {
    return knex.select('*').from('status')
  },
};

module.exports = StatusService