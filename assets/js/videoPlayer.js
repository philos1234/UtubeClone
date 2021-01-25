
const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video"); //first video element 가져옴
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML = '<i class ="fas fa-pause"></i>';
    }else{
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}
function handleVolumeClick(){
    if(videoPlayer.muted){
        videoPlayer.muted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        volumeRange.value = videoPlayer.volume;
    }else{
        volumeRange.value = 0;
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function exitFullScreen(){
    fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScrnBtn.addEventListener("click",goFullScreen);
    document.exitFullscreen();
}

function goFullScreen(){
    videoContainer.requestFullscreen();
    fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScrnBtn.removeEventListener("click", goFullScreen);
    fullScrnBtn.addEventListener("click", exitFullScreen);

}

const formatDate = seconds =>{
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) /60);
    let totalSeconds =  secondsNumber - (hours * 3600) - (minutes * 60);

    if (hours < 10){
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(totalSeconds < 10){
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
}


function getCurrentTime(){
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime(){
    const totalTimeString = formatDate(videoPlayer.duration); // .duration = video의 길이를 초단위로 반환
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime,1000);
}

function handleEnded(){ //끝나면 자동으로 비디오 시작으로 돌아감
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event){
    const{
        target: {value}
    } = event;
    videoPlayer.volume = value; //갱신된 볼륨 값을 저장해줌
    if (value >= 0.6){
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }else if (value >= 0.2){
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    }else{
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
}

function init(){
    videoPlayer.volume = 0.5;
    playBtn.addEventListener("click",handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScrnBtn.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
    videoPlayer.addEventListener("ended",handleEnded);
    volumeRange.addEventListener("input", handleDrag);

}

if(videoContainer){
    init();
}