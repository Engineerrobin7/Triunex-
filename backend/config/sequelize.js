const { Sequelize } = require("sequelize");
require("dotenv").config();

// Debugging: Print database credentials
console.log("Connecting to DB with:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "Loaded ✅" : "MISSING ❌");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        logging: false, 
    }
);

sequelize.authenticate()
    .then(() => console.log("✅ PostgreSQL Connected Successfully"))
    .catch((err) => console.error("❌ Database Connection Failed:", err));

module.exports = sequelize;
