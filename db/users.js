import {DataTypes} from "sequelize";
import sequelize from "./sequelize.js";

const Users = sequelize.define("Users", {
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    subscription: {
        type: DataTypes.ENUM,
        values: ["starter", "pro", "business"],
        defaultValue: "starter"
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    avatarURL: DataTypes.STRING
})

await Users.sync({alter: true});

export default Users;