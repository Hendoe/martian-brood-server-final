const AlienInventoryService = {
  getAlienInventory(knex) {
    return knex.select('*').from('alien_inventory')
  },
  getById(knex, id) {
    return knex.from('alien_inventory').select('*').where('id', id).first()
  },
  updateAlienInventory(knex, id, newAlienInventory) {
    return knex('alien_inventory')
      .where({ id })
      .update(newAlienInventory)
  },
};

module.exports = AlienInventoryService