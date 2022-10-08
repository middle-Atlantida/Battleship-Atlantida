<<<<<<< HEAD
import { Sequelize } from 'sequelize-typescript';
import { sequelizeOptions } from "./configs/db.config";

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем модели

export async function dbConnect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
        console.log('Connection dbConnect successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
=======
import server from './app';
import {startApp} from './utils/startApp';

startApp({server});
>>>>>>> f58e4109e0e5393af5534f6b6d8054a68d3e8ad3
