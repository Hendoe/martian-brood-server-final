const StructureInventoryService = {
  getStructureInventory(knex) {
    return knex.select('*').from('structure_inventory')
  },
};

module.exports = StructureInventoryService