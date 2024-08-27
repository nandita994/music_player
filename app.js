let currentMusic=0;

const music=document.querySelector('#audio');
const bar=document.querySelector('.bar');
const musicName=document.querySelector('.musicName');
const artistName=document.querySelector('.artistName');
const disk=document.querySelector('.disk');
const currentTime=document.querySelector('.currentTime');
const songDurationTime=document.querySelector('.songDurationTime');
const playBtn=document.querySelector('.playBtn')
const forwardBtn=document.querySelector('.forwardBtn');
const backwardBtn=document.querySelector('.backwardBtn');

playBtn.addEventListener('click',()=>{
    if(playBtn.className.includes('pause')){
        music.play();
    }
    else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

//setup music

const setMusic= (i)=>{
    bar.value=0;//set range slide value to 0
    let song=songs[i];
    currentMusic=i;
    music.src=song.path;

    musicName.innerHTML=song.name;
    artistName.innerHTML=song.artist;
    disk.style.backgroundImage=`url('${song.cover}')`;

    currentTime.innerHTML='00:00';
    setTimeout(()=>{
        bar.max=music.duration;
        songDurationTime.innerHTML=formatTime(music.duration);

    },300);
    
}

setMusic(0);

//formatting time min, sec

const formatTime=(time)=>{
    let min=Math.floor(time/60);
    if(min<10){
        min=`0${min}`;
    }
    let sec=Math.floor(time%60);
    if(sec<10){
        sec=`0${sec}`;
    }
    return `${min} : ${sec}`;
}

//seek bar
setInterval(()=>{
    bar.value=music.currentTime;
    currentTime.innerHTML=formatTime(music.currentTime);
    if(Math.floor(music.currentTime)==Math.floor(bar.max)){
        forwardBtn.click();
    }
},500)
bar.addEventListener('change',()=>{
    music.currentTime=bar.value;
})

const playMusic=()=>{
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}



//forward and backward button

forwardBtn.addEventListener('click',()=>{
    if(currentMusic>=songs.length-1){
        currentMusic=0;
    }
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
    
})

backwardBtn.addEventListener('click',()=>{
    if(currentMusic<=0){
        currentMusic=0;
    }
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
    
})
