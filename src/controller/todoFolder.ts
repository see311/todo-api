import { Context } from "koa";
import { Todo } from "../models/Todo";
import { TodoFolder } from "../models/TodoFolder";

export default {
    async createFolder(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;
        try {
            const { userId, title } = ctx.request.fields;

            const folder = await TodoFolder.create({
                userId,
                title
            });
            resBody = folder;
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

    async editFolder(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;
        try {
            const id = ctx.params.id;
            const { title } = ctx.request.fields;

            let folder = await TodoFolder.findOne({
                where: {
                    id
                }
            });
            if (folder) {
                if (title) folder.title = title;
                await folder.save();
            }
            resBody = folder;
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
    async getFolder(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;
        try {
            const id = ctx.params.id;
            const folder = await TodoFolder.findOne({
                where: {
                    id
                }
            });
            resBody = folder;
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
    async deleteFolder(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;
        try {
            const id = ctx.params.id;

            await Todo.destroy({
                where: {
                    todoFolderId: id
                }
            });

            await TodoFolder.destroy({
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
    },
    async getAllTodos(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;
        try {
            const id = ctx.params.id;
            const folder = await TodoFolder.findOne({
                where: {
                    id
                }
            });
            if (folder) {
                const todos = await folder.$get("todos");
                if (todos) {
                    resBody = todos;
                } else {
                    resStatus = 400;
                }
            } else {
                resStatus = 400;
            }
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
