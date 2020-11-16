import contentSecurityPolicy from "helmet/dist/middlewares/content-security-policy";
import routes from "../routes";

export const getJoin = (req,res) =>{
    res.render("join",{pageTitle : "Join"})
};

export const postJoin = (req,res) =>{
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
        res.redirect(routes.home);
    }

};
export const getLogin = (req,res) => res.render("login",{pageTitle: "Log In"});
export const postLogin = (req,res) => {
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

