import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { ContentSecurity, localsMiddleware } from "./middlewares";
import userRouter  from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";


const app = express();

app.use(helmet());
app.set("view engine","pug");
app.use("/uploads",express.static("uploads")); //video를 찾기위함
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));


app.use(localsMiddleware);

//영상 임의로 받아오게 하는 미들웨어 실행
app.use(ContentSecurity);


app.use(routes.home,globalRouter); //join, search, home... 등을 연결
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);




export default app;