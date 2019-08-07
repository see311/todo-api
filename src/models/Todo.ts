import {
    Table,
    Model,
    Column,
    ForeignKey,
    AllowNull,
    Default,
    DataType
} from "sequelize-typescript";
import { TodoFolder } from "./TodoFolder";

@Table
export class Todo extends Model<Todo> {
    @ForeignKey(() => TodoFolder)
    @AllowNull(false)
    @Column
    todoFolderId!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    text!: string;

    @Default(false)
    @Column
    completed!: boolean;
}
