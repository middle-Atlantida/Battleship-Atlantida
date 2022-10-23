import {SequelizeOptions} from "sequelize-typescript";

export const sequelizeOptions: SequelizeOptions = {
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "battleship-db",
    dialect: "postgres",
};
