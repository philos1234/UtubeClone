import multer from "multer";
import routes from "./routes"

const multerVideo = multer({dest:"uploads/videos/"}); //dest : location where file gonna be stored

//변수 설정 미들웨어 pug에 해당하는 변수설정 가능
export const localsMiddleware = (req,res,next) =>{
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = req.user || null; // user 없으면 빈 객체 넘김
    //user에 파싱된 세션 유저 정보 있음

    next(); //다음으로 컨트롤 넘기는 것..
};

//Public한 화면
export const onlyPublic = (req, res, next) =>{ 
    if(req.user){
        res.redirect(routes.home); //로그인 성공시 홈 화면으로 리다이렉트
    }else{
        next();
    }
};
//private한 화면
export const onlyPrivate = (req, res, next) => {
    if(req.user){
        next();
    }else{
        res.redirect(routes.home);
    }
};
export const uploadVideo = multerVideo.single("videoFile");//videoFile is tag name
    //single := could upload a single video
    //"string" := string is html type file name parameter
export const ContentSecurity = (req,res,next) => {
    res.setHeader("Content-Security-Policy","script-src 'self' https://archive.org");
    return next();
};
