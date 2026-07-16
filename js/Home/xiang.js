Xmusic=true;
//音乐
function Meworks(Ta){
if(Xmusic){
Xmusic=false;
var data=arrNumber('Data')[0];
var len=data.src.length;
for(i=0;i<len;i++){
const Ii=document.createElement('div');
Ii.classList.add('Ii');
Ii.classList.add('Local');
//歌名
const Si=document.createElement('b');
Si.textContent=data.name[i];
Ii.appendChild(Si);
//歌手
const Sr=document.createElement('div');
Sr.classList.add('singer');
Sr.textContent=data.singer[i];
Ii.appendChild(Sr);
//歌曲
const Sg=document.createElement('audio');
Sg.src='/sdcard/null';
Sg.loop='loop';
Ii.appendChild(Sg);
Ta.appendChild(Ii);
if(i==len-1){
const Ons=document.querySelectorAll(".Local");
const mus=document.querySelectorAll(".Ii audio");
Ons.forEach((on,i)=>{
on.onclick=function (){
//判断音乐有没有地址
var music=mus[i];
if(music.src=='file:///sdcard/null'){
music.src=data.src[i];
}
//播放音乐
music.play();
Mto(true);
music.addEventListener('play', function() {
setTimeout(function (){
Musicplay(music,"url('appIcon.png')",data.name[i],data.singer[i]);
moor=true;
TcMp(moor);
},500);
 });
// 将audios中其他的audio全部暂停
function pauseAll() {
var self = this;
[].forEach.call(mus, function (i) {
i !== self && i.pause();
 })
}
// 给play事件绑定暂停函数
[].forEach.call(mus, function (i) {
i.addEventListener("play", pauseAll.bind(i));
})

//点击事件(结束)
 }
 });
//判断音乐列表(结束)
}
//循环(结束)
  }
//判断(结束)
 }
}
//音乐播放器
function Musicplay(music,cover,name,singer){
//封面
MusicImg.style.backgroundImage=cover;
//歌名
Mname.innerText=name;
//歌手
Msinger.innerText=singer;
//总时长
ZTime=music.duration;
var zm=Math.floor(ZTime%3600/60);
var zs=Math.floor(ZTime%60);
zm=zm>=10?zm:'0'+zm;
zs=zs>=10?zs:"0"+zs;
Duration.innerText=zm+":"+zs;
//当前播放进度
music.ontimeupdate=function(){
var CTime=music.currentTime;
var m=Math.floor(CTime%3600/60);
var s=Math.floor(CTime%60);
m=m>=10?m:'0'+m;
s=s>=10?s:"0"+s;
Playtime.innerText=m+":"+s;
Pbar.value=CTime/ZTime*100;
 }
//播放与暂停
Mplpa.onclick=function (){
if(music.paused){
 music.play();
 Mto(true);
 }else {
 music.pause();
 Mto(false);
 }
 }
}
function Mto(to){
if(to){
Mplpa.style.backgroundImage="url('img/To/play.png')";
Mplpa.style.animationPlayState="running";
MusicImg.style.animationPlayState="running";
}else{
Mplpa.style.backgroundImage="url('img/To/pause.png')";
Mplpa.style.animationPlayState="paused";
MusicImg.style.animationPlayState="paused";
 }
}