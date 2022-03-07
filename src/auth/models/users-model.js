'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,

        },
        
    }
} : {};

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);

const User = (Sequelize, DataTypes) => Sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {
    db: sequelize,
    User: User(sequelize, DataTypes)
}

