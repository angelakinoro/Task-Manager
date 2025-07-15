import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "Pending",
    },
    deadline: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);


Task.belongsTo(User, { foreignKey: "user_id", onDelete: "SET NULL" });
User.hasMany(Task, { foreignKey: "user_id" });

export default Task;
