import { Context } from "koa";
import { verify } from "password-hash";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

// 用户注册登陆
export default {
    async register(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;
        try {
            const { username, email, password } = ctx.request.fields;

            const user = await User.create({
                username,
                email,
                password
            });
            resBody = jwt.sign(
                {
                    username: user.username,
                    email: user.email
                },
                ctx.state.secret
            );
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
    async login(ctx: Context, next: () => Promise<any>) {
        let resBody: any;
        let resStatus = 200;

        try {
            const { email, password } = ctx.request.fields;

            const dbUser = await User.findOne({
                where: {
                    email
                }
            });

            if (dbUser && verify(password, dbUser.password)) {
                resBody = jwt.sign(
                    {
                        username: dbUser.username,
                        email: dbUser.email
                    },
                    ctx.state.secret
                );
            } else {
                resStatus = 404;
                let error = new Error("用户名或密码错误");
                throw error;
            }
        } catch (error) {
            console.error(error);
            resStatus = resStatus === 200 ? 422 : resStatus;
            resBody = `${error.message}`;
        } finally {
            ctx.status = resStatus;
            ctx.body = { code: resStatus, message: resBody };
            await next();
        }
    }
};
