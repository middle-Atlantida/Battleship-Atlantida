import {ModelAttributes} from "sequelize";
import {DataType, Model} from "sequelize-typescript";

export interface IForumModel {
    title: string;
    answers: number;
}

export const forumModel: ModelAttributes<Model, IForumModel>= {
    title: {
        type: DataType.STRING,
        allowNull: false
    },
    answers: {
        type: DataType.NUMBER,
    }
};
