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

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
   //깃허브로 부터 받아온 것들!
   const{
       _json: {id, avater_url: avaterUrl, name, email}
   } = profile;
   try{
       const user = await User.findOne({email}); //깃허브 이메일과 일치하는 것이 디비에 있는지 확인
       if(user){
           user.githubId = id;
           user.save();
           return cb(null,user);
       }
       const newUser = await User.create({
           email,
           name,
           githubId: id,
           avatarUrl
       });
       return cb(null, newUser);
   }catch(err){
       return cb(err);
   }
}

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};
export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (
    accessToken,
    refreshToken,
    profile,
    cb
) => {
    console.log(accessToken,refreshToken, profile, cb);
};
export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req,res)=>{
    req.logout();
    res.redirect(routes.home);
}

export const getMe = (req, res)=> {
    res.render("userDetail", {pageTitle: "User Detail", user: req.user});
};

export const login = (req,res) => res.render("login",{pageTitle : "Login"})


export const users = (req,res) => res.render("Users",{pageTitle : "User"});
export const userDetail = async (req,res) =>{
    const{
        params: {id}
    } = req;
    try{
        const user = await User.findById(id).populated("videos");
        res.render("userDetail", {pageTitle: "User Detail", user});
    }catch (error){
        res.redirect(routes.home);
    }
};
export const getEditProfile = (req, res) => res.render("editProfile", {pageTitle: "Edit Profile"});

export const postEditProfile = async (req, res) => {
    const{
        body: {name, email},
        file
    } = req;
    try{
        await User.findByIdAndUpdate(req,user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        res.redirect(routes.me)
    }catch(error){
        res.render(routes.editProfile);
    }
};

export const getChangePassword = (req,res) => res.render("changePassword", {pageTitle:"Change Password"});

export const postChangePassword = async (req, res) => {
    const {
      body: { oldPassword, newPassword, newPassword1 }
    } = req;
    try {
      if (newPassword !== newPassword1) {
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
        return;
      
      }
     
      await req.user.changePassword(oldPassword, newPassword);
      res.redirect(routes.me);
    } catch (error) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
    }
  };