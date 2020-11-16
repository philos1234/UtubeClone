import routes from "../routes";

export const home = (req,res) =>{ 
    res.render("home",{pageTitle : "Home", videos});

}; ///views/home.pug를 찾아 렌더링해 보여줌  default dir = views

export const search = (req,res) => {
    const {query: {term: searchingBy} } = req;
    //const searchingBy = req.query.term 과 같음 

    res.render("Search",{pageTitle : "Search", searchingBy,videos});
    
};

export const getUpload = (req,res) => res.render("upload",{pageTitle : "Upload"});
export const postUpload = (req,res) => {
    const {
        body :{file,title, description}
    } = req;
    
    res.redirect(routes.videoDetail(324393));
};
export const videoDetail = (req,res) => res.render("videoDetail",{pageTitle : "Video Detail"});
export const editVideo = (req,res) => res.render("editVideo",{pageTitle : "Edit Video"});
export const deleteVideo =(req,res) => res.render("deleteVideo",{pageTitle : "Delete Video"});
