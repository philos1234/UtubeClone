import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import { githubLoginCallback, facebookLoginCallback } from "./controller/userController";
import User from "./models/User";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy(
        {
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL:`http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback //콜백함수
    )
   
);
passport.use(
    new FacebookStrategy({
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: `http://localhost:4000${routes.facebookCallback}`
    },
    facebookLoginCallback
    )
);

// passport가 인식하는 부분
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passport 는 서버의 request에 유저 세션 정보를 담는다.