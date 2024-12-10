import {Sequelize} from "sequelize";

const Task = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        notEmpty: true
        }
    },
    done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
        notEmpty: true
        },
        defaultValue: "false"
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
        notEmpty: true
        }
    }
}

export default Task;