import express from "express";
import routes from "../routes";
import {
    userDetail,
    getEditProfile,
    postEditProfile,
    getChangePassword,
    postChangePassword
}from "../controller/userController";
import {onlyPrivate, uploadAvatar} from "../middlewares";



const userRouter = express.Router();


userRouter.get(routes.editProfile,onlyPrivate ,getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;




/*많은 router 들을 설정할 수 있음
userRouter.get("/",(req,res)=>res.send('user index'));
userRouter.get("/edit",(req,res)=>res.send('user index'));
userRouter.get("/password",(req,res)=>res.send('user index'));
*/
