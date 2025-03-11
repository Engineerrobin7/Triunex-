const { Sequelize } = require("sequelize");
require("dotenv").config();

// Connect to PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL Connected Successfully");
    } catch (error) {
        console.error("❌ PostgreSQL Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
