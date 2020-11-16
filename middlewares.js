import multer from "multer";
import routes from "./routes"

const multerVideo = multer({dest:"videos/"});

//변수 설정 미들웨어 pug에 해당하는 변수설정 가능
export const localsMiddleware = (req,res,next) =>{
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user ={
        isAuthenticated: true,
        id:1
    };
    next(); //다음으로 컨트롤 넘기는 것과 같이..
};

export const uploadVideo = multerVideo.single("videoFile");

export const ContentSecurity = (req,res,next) => {
    res.setHeader("Content-Security-Policy","script-src 'self' https://archive.org");
    return next();
}
