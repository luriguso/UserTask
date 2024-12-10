import User from "./user.js";
import Task from "./tasks.js";
import db from "../config.js";

const user = db.define('User', User, {timestamps: false, createdAt: false});
const task = db.define('Task', Task, {timestamps: false, createdAt: false});
user.hasMany(task, {
    foreignKey: 'user_id'
});

export default db