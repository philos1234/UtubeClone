import contentSecurityPolicy from "helmet/dist/middlewares/content-security-policy";
import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req,res) =>{
    res.render("join",{pageTitle : "Join"})
};

export const postJoin = async (req,res,next) =>{
        //const name = req.body 
        //const email = req.body... 
    const {
     body: {name, email,password,password2} 
 
    } = req;

    if (password !== password2){
        //비밀번호 오류시에..
        res.status(400);
        res.render("join",{pageTitle:"Join"});
        
    }else {
        //user 등록
        //user id로 login
        try{
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        }catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
        

    }

};
export const getLogin = (req,res) => res.render("login",{pageTitle: "Log In"});
export const postLogin = passport.authenticate("local",{
    failureRedirect : routes.login,
    successRedirect: routes.home
});

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile,cb);// 깃허브로 부터 받아온 것들!
}

export const logout = (req,res)=>{
    req.logout();
    res.redirect(routes.home);
}
export const login = (req,res) => res.render("login",{pageTitle : "Login"})
export const logout = (req,res) =>{ 
    
    res.render("logout",{pageTitle : "Logout"});

}

export const users = (req,res) => res.render("Users",{pageTitle : "User"});
export const userDetail = (req,res) => res.render("userDetail",{pageTitle : "User Detail"});
export const editProfile = (req,res) => res.render("editProfile",{pageTitle : "Edit Profile"});
export const changePassword = (req,res) => res.render("changePassword",{pageTitle : "Change Password"});

