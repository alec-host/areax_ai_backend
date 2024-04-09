const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const InstagramActivityLogs = sequelize.define('InstagramActivityLogs', {
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    reference_number: {
        type: DataTypes.STRING(65),
        allowNull: false,
        collate: 'utf8mb4_general_ci',
    },
    route: {
        type: DataTypes.STRING(40),
        allowNull: false,
        collate: 'utf8mb4_general_ci',
    },
    operation_type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        collate: 'utf8mb4_general_ci',
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
    }, {
    indexes: [
        {
        name: 'reference_number_index',
        fields: ['reference_number'],
        using: 'BTREE',
        },
    ],
    timestamps: false,
    tableName: 'tbl_ig_activity_logs',
    collate: 'utf8mb4_general_ci',
    engine: 'InnoDB',
    });

    return InstagramActivityLogs;
};
