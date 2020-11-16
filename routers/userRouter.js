import express from "express";
import routes from "../routes";
import {
    users,
    userDetail,
    editProfile,
    changePassword
}from "../controller/userController";



const userRouter = express.Router();


userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.users, users);
userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.changePassword, changePassword);


export default userRouter;




/*많은 router 들을 설정할 수 있음
userRouter.get("/",(req,res)=>res.send('user index'));
userRouter.get("/edit",(req,res)=>res.send('user index'));
userRouter.get("/password",(req,res)=>res.send('user index'));
*/
