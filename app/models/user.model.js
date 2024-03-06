const { Sequelize, DataTypes } = require('sequelize');

const { sequelize } = require('../db/db');

// Define the User model
const User = sequelize.define('User', {
   _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   reference_number: {
      type: DataTypes.STRING(65),
      allowNull: false
   },
   sso_provider_id: {
      type: DataTypes.STRING(255),
      allowNull: false
   },
   email: {
      type: DataTypes.STRING(65),
      allowNull: false
   },
   phone: {
      type: DataTypes.STRING(20),
      allowNull: true
   },
   username: DataTypes.STRING(255),
   display_name: DataTypes.STRING(255),
   profile_picture_url: DataTypes.STRING(255),
   access_token: DataTypes.STRING(255),
   refresh_token: DataTypes.STRING(255),
   token_expiry: DataTypes.DATE,
   created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
   },
   updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
   },
   is_verified: {
      type: DataTypes.INTEGER,
      defaultValue: 0
   },
   is_online: {
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
      tableName: 'tbl_areax_users'
   });

(async () => {
  await sequelize.sync();
  console.log('User model synchronized with database.');
})();

module.exports = User;