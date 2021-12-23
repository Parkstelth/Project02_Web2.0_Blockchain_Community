"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn("users", "mnemonic", {
            type: Sequelize.STRING,
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("users", "mnemonic");
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};