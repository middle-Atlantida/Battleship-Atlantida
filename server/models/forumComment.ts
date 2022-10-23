import {ModelAttributes} from "sequelize";
import {DataType, Model} from "sequelize-typescript";

export interface IForumCommentModel {
    avatar: string;
    nickname: string;
    commentText: string;
}

export const forumCommentModel: ModelAttributes<Model, IForumCommentModel>= {
    avatar: {
        type: DataType.STRING,
        allowNull: true
    },
    nickname: {
        type: DataType.STRING,
        allowNull: false
    },
    commentText: {
        type: DataType.STRING,
        allowNull: false
    }
};
