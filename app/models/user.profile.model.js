const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const UserProfile = sequelize.define('UserProfile', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reference_number: {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(65),
        allowNull: true
    },
    city: {
        type: DataTypes.STRING(65),
        allowNull: true
    },
    country: {
        type: DataTypes.STRING(65),
        allowNull: true
    },
    preferences: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_archived: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    is_deleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  },{
    // Define table options
    timestamps: false,
    tableName: 'tbl_user_profiles'
  });
  
  (async () => {
    await sequelize.sync();
    console.log('UserProfile model synchronized with database.');
  })();
  
  module.exports = UserProfile;