const SpawningPlansService = {
  getAllPlans(knex) {
    return knex.select('*').from('spawning_plans')
  },

  insertPlan(knex, newPlan) {
    return knex
      .insert(newPlan)
      .into('spawning_plans')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
};

module.exports = SpawningPlansService