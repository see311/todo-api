import Koa, { Context } from "koa";
import OtherParser from "koa-better-body";
import Convert from "koa-convert";
import kJwt from "koa-jwt";
import { api, router } from "./router/router";
import sq from "./db";

const app = new Koa();

const jwtSecret = "mytodoapi";

(async () => {
    await sq.sync();
    app.use(async (ctx: Context, next: () => Promise<any>) => {
        ctx.state.secret = jwtSecret;
        await next();
    })
        .use(Convert(OtherParser()))
        .use(
            kJwt({ secret: jwtSecret }).unless({
                path: [/^\/api\/(login|register)/]
            })
        )
        .use(router.middleware())
        .use(api.middleware())
        .listen(3000, () => {
            console.log("Server started on :3000");
            api.getRoutes().forEach(route => {
                console.log(
                    `${route.method} http://localhost:3000${route.path}`
                );
            });
            console.log(
                "-----------------------------------------------------------"
            );
        });
})();
