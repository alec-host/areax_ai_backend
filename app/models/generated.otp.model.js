const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

// Define the GeneratedOTP model
const GeneratedOTP = sequelize.define('GeneratedOTP', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(160),
        allowNull: false
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
    is_sent: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  },{
      timestamps: false,
      tableName: 'tbl_generated_otps'
  });
  (async () => {
    await sequelize.sync();
    console.log('GeneratedOTP model synchronized with database.');
  })();
  
  module.exports = GeneratedOTP;