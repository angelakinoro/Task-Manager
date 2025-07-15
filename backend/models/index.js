// For syncing and exporting models to ensure that the db is connected and synced 
import sequelize from "../config/db.js";
import User from "./User.js";
import Task from "./Task.js";

const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected.");
    await sequelize.sync(); 
    console.log("✅ Models synced.");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
};

export { sequelize, initModels, User, Task };
