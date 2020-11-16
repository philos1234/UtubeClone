import mongoose from "mongoose";
import dotenv from "dotenv";
//.env 에있는 변수들을 가져옴
dotenv.config();

//mongo db hyun id로 접속 설정
mongoose.connect(process.env.MONGO_URL,{
  dbName:"we-tube",
  useNewUrlParser:true,
  useFindAndModify:false
});

const db = mongoose.connection;
const handleOpen = () => console.log("Connected to DB!");
const handleError = error => console.log(`cannot connect to DB : ${error}`);
db.once("open",handleOpen);
db.on("error",handleError);