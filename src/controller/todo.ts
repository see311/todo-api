import { Context } from "koa";
import { Todo } from "../models/Todo";

export default {
    async createTodo(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;
        try {
            const { todo_folder_id, text, completed } = ctx.request.fields;
            let todo = await Todo.create({
                todo_folder_id,
                text,
                completed
            });
            resBody = todo;
        } catch (error) {
            console.error(error);
            resStatus = resStatus === 200 ? 422 : resStatus;
            resBody = `${error.message}, ${error.name}`;
        } finally {
            ctx.status = resStatus;
            ctx.body = resBody;
            await next();
        }
    },
    async editTodo(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;
        try {
            const {
                text = null,
                completed = null,
                todoFolderId = null
            } = ctx.request.fields;
            const id = ctx.params.id;
            const todo = await Todo.findOne({
                where: {
                    id
                }
            });
            if (todo) {
                if (text) todo.text = text;
                if (completed) todo.completed = completed;
                if (todoFolderId) todo.todoFolderId = todoFolderId;
                await todo.save();
            }

            resBody = todo;
        } catch (error) {
            console.error(error);
            resStatus = resStatus === 200 ? 422 : resStatus;
            resBody = `${error.message}, ${error.name}`;
        } finally {
            ctx.status = resStatus;
            ctx.body = resBody;
            await next();
        }
    },
    async getTodo(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;
        try {
            const id = ctx.params.id;
            const todo = await Todo.findOne({
                where: {
                    id
                }
            });
            resBody = todo;
        } catch (error) {
            console.error(error);
            resStatus = resStatus === 200 ? 422 : resStatus;
            resBody = `${error.message}, ${error.name}`;
        } finally {
            ctx.status = resStatus;
            ctx.body = resBody;
            await next();
        }
    },
    async deleteTodo(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;
        try {
            const id = ctx.params.id;
            await Todo.destroy({
                where: {
                   id
                }
            });
            resBody = "删除成功";
        } catch (error) {
            console.error(error);
            resStatus = resStatus === 200 ? 422 : resStatus;
            resBody = `${error.message}, ${error.name}`;
        } finally {
            ctx.status = resStatus;
            ctx.body = resBody;
            await next();
        }
    }
};
