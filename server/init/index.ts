import {Sequelize} from "sequelize-typescript";
import {sequelizeOptions} from "../configs/db.config";
import {forumModel} from "../models/forum";
import {forumCommentModel} from "../models/forumComment";

export const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем здесь модели
export const forumName = sequelize.define('ForumName', forumModel, {});
export const forumComment = sequelize.define('ForumComment', forumCommentModel, {});

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
