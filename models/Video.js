import mongoose from "mongoose";

//비디오 URL을 저장
const VideoSchema = new mongoose.Schema({// 몽구스의 스키마 객체
    fileUrl : {
    type : String,
    required : "File URL is required"
    },
    title :{
        type : String,
        required : "Title is required"
    },
    description : String,
    views: {
        type : Number,
        default : 0
    },
    createAt: {
        type : Date,
        default: Date.now
    }

});

const model = mongoose.model("Video",VideoSchema);
export default model;
