import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

//await is only vaild in async
export const home = async (req,res) =>{ 
   try{ const videos = await Video.find({}).sort({_id:-1});
    res.render("home",{pageTitle : "Home", videos});
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos: []});
    }
}; ///views/home.pug를 찾아 렌더링해 보여줌  default dir = views

export const search = async (req,res) => {
    const {query: {term: searchingBy} } = req;
    //const searchingBy = req.query.term 과 같음 

    let videos = [];
    try{
        videos = await Video.find({
            title : { $regex: searchingBy, $options : "i"} //regex 는 mongoose opiont i 는 대소문자 구분 하지 않는 옵션임
        });

    }catch(error){
        console.log(error);
    }
    res.render("search", {pageTitle: "Search", searchingBy, videos});
};

export const getUpload = (req,res) => res.render("upload",{pageTitle : "Upload"});

export const postUpload = async (req,res) => {
    const {
        body :{title, description},
        file : { path }
    } = req;
    //by posted info, create Video obj
    const newVideo = await Video.create({ //Video 는 mongoose 객체임
        fileUrl:path,
        title,
        description,
        creator:req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(newVideo.fileUrl);// get newVideo's id


};
export const videoDetail = async (req,res) =>{ 

    const {
        params:{id}
        
    } = req;
    try{
    const video = await Video.findById(id)
    .populate("creator") //id 안의 creator 정보를 파싱해서 가져올 수 있다.
    .populate("comment"); //id 안의 comment 정보를 파싱해서 가져올 수 있다.
    console.log(video)
    res.render("videoDetail",{pageTitle : video.title, video}); //pug view로 변수들을 보낸다. 
    }catch(error){
        res.redirect(routes.home);
    }
}

export const getEditVideo = async (req,res) =>{ 
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id);
        if(video.creator !== req.user.id){
            throw Error();
        }else{
            res.render("editVideo",{pageTitle:`Edit ${video.title}`,video});
        }
    }catch(error){
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req,res) => {
    const {
        params: {id},
        body : {title,description}
    }= req;
    try{
        await Video.findOneAndUpdate({_id:id},{title,description});
        res.redirect(routes.videoDetail(id));
    }catch(error){
        res.redirect(routes.home);
    }
}
export const deleteVideo =  async (req,res) =>{
    const {
        params:{id}
    } = req;

    try{
        const video = await Video.findOneAndRemove(id);
        if(video.creator !== req.user.id){
            throw Error();
        }else{
            await Video.findOneAndRemove({_id: id});
        }
        
    }catch(error){
        console.log(error);
    }
    res.redirect(routes.home);

};

// video view 증가

export const postRegisterView = async (req, res) =>{
    const{
        params:{id}
    } = req;
    try{
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    }catch(error){
        res.status(400);
    }finally{
        res.end();
    }
};

//Add comment

export const postAddComment = async (req, res) => {
    const {
        params : { id },
        body : { comment },
        user
    } = req;
    try{
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id
        });
        video.comments.push(newComment.id);
        video.save();

    }catch (error){
        res.status(400);
    }finally{
        res.end();
    }
}