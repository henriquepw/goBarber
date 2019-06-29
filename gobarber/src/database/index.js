import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import File from '../app/models/File';
import User from '../app/models/User';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associete && model.associete(this.connection.models));
  }
}

export default new Database();
