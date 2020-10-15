const AlienInventoryService = {
  getAlienInventory(knex) {
    return knex.select('*').from('alien_inventory')
  },
};

module.exports = AlienInventoryService