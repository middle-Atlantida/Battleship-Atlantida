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
