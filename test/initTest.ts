import test from "ava";
import { User } from "../src/models/User";
import { TodoFolder } from "../src/models/TodoFolder";
import { Todo } from "../src/models/Todo";
import sq from "../src/db";

import { verify } from "password-hash";

async function fackerData() {
    const user1 = await User.build({
        username: "ttt1",
        email: "ttt1@163.com",
        password: "123456"
    });
    const user2 = await User.build({
        username: "ttt2",
        email: "ttt2@163.com",
        password: "123456"
    });
    await user1.save();
    await user2.save();

    const todoFolder = await TodoFolder.create({
        userId: user1.id,
        title: "生活"
    });

    const todo_1 = Todo.build({
        text: "吃大餐！",
        completed: true,
        todoFolderId: todoFolder.id
    });

    const todo_2 = Todo.build({
        text: "睡大觉！",
        completed: false,
        todoFolderId: todoFolder.id
    });

    await todo_1.save();
    await todo_2.save();
}

test("test initial create", async t => {
    await sq.sync({ force: true });
    await fackerData();

    const user = (await User.findAll({
        where: {
            email: "ttt1@163.com"
        }
    }))[0];

    let folders = await user.$get('todoFolders');

    let todos = await folders[0].$get('todos');

    t.is(folders[0].title, "生活");

    t.is(todos[0].completed, true);
    t.is(todos[0].text, "吃大餐！");
    t.is(verify('123456', user.password), true)
});
