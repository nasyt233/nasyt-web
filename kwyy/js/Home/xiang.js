Xmusic=true;
//音乐
function HomeMusic(Ta){
if(Xmusic){
Xmusic=false;
var data=arrNumber('Data');
if(data){
data.data.forEach((it,i)=>{
const Ii=document.createElement('div');
Ii.className='Ii';
Ii.setAttribute('data-pss',false);
Ii.setAttribute('data-lyric',false);
Ii.setAttribute('data-cover','appIcon.png');
Ii.setAttribute('data-src',it.src);
Ii.setAttribute('data-name',it.name);
Ii.setAttribute('data-singer',it.singer);
//封面
const Sig=document.createElement('div');
Sig.style.backgroundImage="url('appIcon.png')";
Sig.classList.add('MCover');
Sig.onclick=function (e){
Addmusic(this,Ii);
e.stopPropagation();
}
Ii.appendChild(Sig);
const Sir=document.createElement('div');
Sir.classList.add('Sir');
//歌名
const Si=document.createElement('b');
Si.classList.add('songname');
Si.textContent=it.name;
Sir.appendChild(Si);
//歌手
const Sr=document.createElement('div');
Sr.classList.add('singer');
Sr.textContent=it.singer;
Sir.appendChild(Sr);
Ii.appendChild(Sir);
//更多
const Smo=document.createElement('div');
Smo.classList.add('more');
Ii.appendChild(Smo);
Ta.appendChild(Ii);
Ii.onclick=()=>{
Musicplay(Ii,Sig,Si,Sr);
 }
//(更多)点击事件
Smo.onclick=(e)=>{
 MusicMore(Ii);
 e.stopPropagation();
 }
  });//循环(结束)
}else{
PoenPopTip('提示','没有找到可以播放的音乐!!!');
}
 }//判断(结束)
}

//视频
Xvideo=true;
var UPDATE_COVER={};
function HomeVideo(Ta){
if(Xvideo){
Xvideo=false;
var DVD=arrNumber('Video-data');
if(DVD){
let i=0;
let length=DVD.file.length;
function run(){
if(i==length) return;
requestIdleCallback((idle)=>{
while (idle.timeRemaining() > 0 && length){
  var data=DVD.file[i];
  const value=(i+1)/length*100;
  video_loading_progress.value=value;
  video_loading_name.textContent='./'+data.name;
  video_loading_pss.textContent=value.toFixed(2)+'%';
  video_loading_than.textContent=i+1+'/'+length;
  if(data.name in video_cover)UPDATE_COVER[data.name]=video_cover[data.name];
  const  box=document.createElement('div');
  box.className='video_box';
  box.setAttribute('data-name',data.name);
  box.setAttribute('data-src',data.url);
  box.setAttribute('data-time',data.time);
  //封面
  const  cover=document.createElement('div');
  cover.classList.add('videoFm');
  const COVER=video_cover[data.name]||'img/To/VideoCover.jpeg';
  cover.style.backgroundImage=`url(${COVER})`;
  box.appendChild(cover);
  //盒子
  const cbox=document.createElement('div');
  cbox.classList.add('column_box');
  //视频名
  const Fauthor=document.createElement('p');
  Fauthor.classList.add('Titleofwork');
  Fauthor.textContent=data.name;
  cbox.appendChild(Fauthor);
  //大小
  const Atext=document.createElement('button');
  Atext.classList.add('Atext');
  let size=(data.size/1024/1024).toFixed(2);
  if(size>=1000){
    size=(size/1024).toFixed(2)+'GB';
    }else{
    size=size+'MB';
   }
  Atext.textContent=size;
  cbox.appendChild(Atext);
  box.appendChild(cbox);
  box.onclick=()=>{
  const name=box.getAttribute("data-name");
  const src=box.getAttribute("data-src");
  const time=box.getAttribute("data-time");
  Displayvideoplayer({name:name,src:src,time:time},box);
  toBlob(src).then(result=>{
  UPDATE_COVER[name]=result.url;
  cover.style.backgroundImage=`url(${result.src})`;
  webcat.delFile('酷我音乐/video_cover.js');
  webcat.write('酷我音乐/video_cover.js',`var video_cover=${JSON.stringify(UPDATE_COVER)};`);
   }).catch(error=>{
   PoenTip(error);
   });
   };//点击事件(结束)
  Ta.appendChild(box);
  if(i==length-1){
  Ta.style.overflowY='auto';
  video_loading.style.display='none';
  webcat.delFile('酷我音乐/video_cover.js');
  webcat.write('酷我音乐/video_cover.js',`var video_cover=${JSON.stringify(UPDATE_COVER)};`);
   }
 i++;
}
run();
});
}
run();
}else{
PoenPopTip('提示','没有找到可以播放的视频!!!');
}
}//判断(结束)
}
const toBlob = async function (file) {
  return new Promise((resolve, reject) => {
  // 选取视频的第x帧图片作为封面 start
  let videoss = document.createElement('video');
  var canvas = document.createElement('canvas');
  videoss.src = file;
  videoss.setAttribute('crossOrigin', 'anonymous'); //处理跨域
  videoss.currentTime = 1; // 第x帧
  videoss.oncanplay = async function () {
  var ctx = canvas.getContext('2d');
  let clientWidth = videoss.videoWidth; //canvas的尺寸和图片一样
  let clientHeight = videoss.videoHeight;
  canvas.width = clientWidth/3;
  canvas.height = clientHeight/3;
  canvas.style.width =clientWidth;
  canvas.style.height = clientHeight;
  canvas.getContext("2d").drawImage(videoss, 0,0, clientWidth/3,clientHeight/3); //绘制canvas
  canvas.toBlob((blob) => {
  const url = canvas.toDataURL('image/jpeg');
  const src =URL.createObjectURL(blob);
  resolve({
      url:url,
      src:src
      })
     }, "image/jpeg",);
   }
// 选取视频的第x帧图片作为封面 end
 })
}