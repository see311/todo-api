# todo-api

待办事项 Koa RESTful API

## 介绍

算是 [Koa RESTful API 实战](https://github.com/MiYogurt/todo-api "github") 这个教程的代码重构

## 使用

可能需要全局安装一下 typescript 和 pm2

```bash
$ yarn global add typescript pm2
```

先打开一个 shell 监控日志

```bash
$ pm2 log
```

然后再打开一个shell编译一下 typescript

```bash
$ yarn
$ yarn tsc
```

最后启动项目

```bash
$ yarn start
```

日志输出当前已有接口

```bash
0|index    | Server started on :3000
0|index    | POST http://localhost:3000/api/register
0|index    | POST http://localhost:3000/api/login
0|index    | GET http://localhost:3000/api/todo/:id
0|index    | POST http://localhost:3000/api/todo
0|index    | PUT http://localhost:3000/api/todo/:id
0|index    | DELETE http://localhost:3000/api/todo/:id
0|index    | GET http://localhost:3000/api/folder/:id
0|index    | POST http://localhost:3000/api/folder
0|index    | PUT http://localhost:3000/api/folder/:id
0|index    | DELETE http://localhost:3000/api/folder/:id
0|index    | GET http://localhost:3000/api/folder/:id/getAllTodos
0|index    | -----------------------------------------------------------
```

参考

-   [Koa RESTful API 实战](https://github.com/MiYogurt/nodelover-books/tree/master/docs/koa-todo-api "github")
