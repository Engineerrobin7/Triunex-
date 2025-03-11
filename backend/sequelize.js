const { Sequelize } = require("sequelize");
require("dotenv").config();

// ✅ Initialize Sequelize Database Connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
});

sequelize
    .authenticate()
    .then(() => console.log("✅ PostgreSQL Connected Successfully"))
    .catch((err) => console.error("❌ Database Connection Failed:", err));

module.exports = sequelize; // ✅ Export `sequelize` properly
