import {
    Table,
    Model,
    Column,
    ForeignKey,
    AllowNull,
    DataType,
    HasMany
} from "sequelize-typescript";
import { User } from "./User";
import { Todo } from "./Todo";

@Table({
    timestamps: false
})
export class TodoFolder extends Model<TodoFolder> {
    @AllowNull(false)
    @Column(DataType.TEXT)
    title!: string;

    @HasMany(() => Todo)
    todos!: Todo[];

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId!: number;
}
