"use strict";

const { User } = require(`../models/index`);

class UserService {
  async create(userData) {
    const user = await User.create(userData);
    return user.get();
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user && user.get();
  }
}

module.exports = UserService;
