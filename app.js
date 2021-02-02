import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { ContentSecurity, localsMiddleware } from "./middlewares";
import userRouter  from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import apiRouter from "./routers/apiRouter";
import "./passport";


//use메서드는 모든 HTTP 메서드에 대해 요청 주소만 일치하면 실행되지만 
//get, post, put, patch, delete 같은 메서드는 주소뿐만 아니라 HTTP 메서드까지 일치 하는 요청일 때만 실행된다. 



dotenv.config();

const app = express();
const CokieStore = MongoStore(session);

app.use(helmet({
    contentSecurityPolicy:false,
}));
app.set("view engine","pug");
//app.use(function..) -> 앱이 요청을 수신할 때마다 실행
app.use("/uploads",express.static("uploads")); //video를 찾기위함
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({mongooseConnection: mongoose.connection})
})
);
app.use(passport.initialize());
app.use(passport.session());

//local 변수를 global하게 사용할 수 있도록 하기 위한 미들웨어
app.use(localsMiddleware);


//영상 임의로 받아오게 하는 미들웨어 실행
app.use(ContentSecurity);


app.use(routes.home,globalRouter); //join, search, home... 등을 연결
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);
app.use(routes.api, apiRouter);



export default app;