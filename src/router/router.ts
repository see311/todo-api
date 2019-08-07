import Router from "koa-better-router";
import UserController from "../controller/user";
import TodoController from "../controller/todo";
import FolderController from "../controller/todoFolder";

const router = Router().loadMethods();
const api = Router({ prefix: "/api" });

// 用户登陆注册
api.post("/register", UserController.register);
api.post("/login", UserController.login);

// todo操作
api.get("/todo/:id", TodoController.getTodo);
api.post("/todo", TodoController.createTodo);
api.put("/todo/:id", TodoController.editTodo);
api.del("/todo/:id", TodoController.deleteTodo);

// todoFolder操作
api.get('/folder/:id', FolderController.getFolder);
api.post('/folder', FolderController.createFolder);
api.put('/folder/:id', FolderController.editFolder);
api.del('/folder/:id', FolderController.deleteFolder);
api.get('/folder/:id/getAllTodos', FolderController.getAllTodos);

api.extend(router);
export { api, router };
