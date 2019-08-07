import { Sequelize } from "sequelize-typescript";

const sq = new Sequelize({
    dialect: "sqlite",
    database: "todo",
    storage: "db/todo.db",
    modelPaths: [__dirname + "/models"],
    define: {
        freezeTableName: true
    }
});

export default sq;
