const StructureInventoryService = {
  getStructureInventory(knex) {
    return knex.select('*').from('structure_inventory')
  },
  getById(knex, id) {
    return knex.from('structure_inventory').select('*').where('id', id).first()
  },
  updateStructureInventory(knex, id, newStructureInventory) {
    return knex('structure_inventory')
      .where({ id })
      .update(newStructureInventory)
  },
};

module.exports = StructureInventoryService