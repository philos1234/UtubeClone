import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

//댓글 카운트 증가
const increaseNumber = () =>{
    
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = comment =>{
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);// 리스트에 맨 첫 자식노드 앞에 삽입
    increaseNumber();

};

const sendComment = async comment => {
    const videoId = window.location.href.split("/videos/")[1];
    //axios request
    const response = await axios({ 
        url: `/api/${videoId}/comment`,
        method: "POST",
        data:{
            comment
        }
    });

    if(response.status === 200){
        addComment(comment);
    }
}

const handleSumbmit = event => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
};

function init(){
    addCommentForm.addEventListener("submit",handleSumbmit);
}

if(addCommentForm){
    init();
}