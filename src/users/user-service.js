const UserService = {
  getUser(knex) {
    return knex.select('*').from('user_info')
  },
  getUserWithBroodName(db, brood_name) {
    return db('user_info')
      .where({ brood_name })
      .first()
  },
};

module.exports = UserService