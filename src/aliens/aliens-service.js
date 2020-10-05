const AliensService = {
  getAllAliens(knex) {
    return knex.select('*').from('aliens')
  },
};

module.exports = AliensService