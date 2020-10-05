const StructuresService = {
  getAllStructures(knex) {
    return knex.select('*').from('structures')
  },
};

module.exports = StructuresService