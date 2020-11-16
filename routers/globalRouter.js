import express from "express";
import {
    getJoin,
    getLogin,
    logout,
    postJoin,
    postLogin
    } from "../controller/userController";
import routes from "../routes";
import {home,search} from "../controller/videoController";

const globalRouter = express.Router();

globalRouter.get(routes.join,getJoin);
globalRouter.post(routes.join,postJoin);
globalRouter.get(routes.login,postLogin);

globalRouter.get(routes.home,home);
globalRouter.get(routes.search,search);
globalRouter.get(routes.logout,logout);







export default globalRouter;
