import { Request } from "koa";

declare module "koa" {
    interface Request {
        fields?: any;
    }
}
