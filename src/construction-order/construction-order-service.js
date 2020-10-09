const ConstructionOrderService = {
  getAllOrders(knex) {
    return knex.select('*').from('construction_order')
  },

  insertPlan(knex, newOrder) {
    return knex
      .insert(newOrder)
      .into('construction_order')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
};

module.exports = ConstructionOrderService