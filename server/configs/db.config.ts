import {SequelizeOptions} from "sequelize-typescript";

export const sequelizeOptions: SequelizeOptions = {
    host: "localhost",
    username: "postgres",
    password: "123",
    database: "battleship-db",
    dialect: "postgres",
};
