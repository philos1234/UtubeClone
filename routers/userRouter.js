import express from "express";
import routes from "../routes";
import {
    users,
    userDetail,
    editProfile,
    changePassword
}from "../controller/userController";
import {onlyPrivate} from "../middlewares";



const userRouter = express.Router();


userRouter.get(routes.editProfile,onlyPrivate ,editProfile);
userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);


export default userRouter;




/*많은 router 들을 설정할 수 있음
userRouter.get("/",(req,res)=>res.send('user index'));
userRouter.get("/edit",(req,res)=>res.send('user index'));
userRouter.get("/password",(req,res)=>res.send('user index'));
*/
