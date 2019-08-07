import {
    Table,
    Model,
    Column,
    BeforeCreate,
    BeforeUpdate,
    Unique,
    AllowNull,
    HasMany
} from "sequelize-typescript";
import { generate } from "password-hash";
import { TodoFolder } from "./TodoFolder";

@Table
export class User extends Model<User> {
    @Unique
    @AllowNull(false)
    @Column
    username!: string;

    @Unique
    @AllowNull(false)
    @Column
    email!: string;

    @AllowNull(false)
    @Column
    password!: string;

    @HasMany(() => TodoFolder)
    todoFolders!: TodoFolder[];

    @BeforeCreate
    @BeforeUpdate
    static hashed(instance: User) {
        instance.password = generate(instance.password);
    }
}
