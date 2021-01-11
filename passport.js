import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controller/userController";
import User from "./models/User";

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL:"http://localhost:4000/auth/github/callback"
    }),
    //callback function
    githubLoginCallback
)

// passport가 인식하는 부분
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passport 는 서버의 request에 유저 세션 정보를 담는다.