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
import "./passport";


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




export default app;