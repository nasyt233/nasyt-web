var root=document.querySelector(":root");
//更改css变量
function Root(are,any){
var sas;
if(any=="夜间"){
sas='moon.png';
}else{
sas='sun.png';
}
Period.style.webkitMask=`url(img/Home/icon/${sas})100% 100%/cover`;
tts.innerText=any;
are.forEach((ar,i)=>{
root.style.setProperty(ar.name,ar.content);
});
}
var PDUdata=arrNumber('PDU-data');
var god=true;
//菜单点击事件
const Cons=document.querySelectorAll(".daohanglan button");
Cons[0].style.color='#0066ff';
Cons[0].style.fontWeight='700';
Cons[0].style.transform='scale(1)';
Cons.forEach((co,i)=>{
co.onclick=()=>{
Conclick(i);
}
  });
//菜单点击事件(结束)
const Xiangs=document.querySelectorAll(".Hxiang");
function Conclick(i){
//本地音乐
if(i==1){
setTimeout(()=>{
HomeMusic(Xiangs[i]);
 }
,700);
}else if(i==2){

}else if(i==3){
//本地视频
setTimeout(()=>{
HomeVideo(Xiangs[i]);
},1000);
  };
Hkuang.scrollTo({
left:Hkuang.getBoundingClientRect().width*i,
behavior:'smooth'
});
}
//“框“滑动事件
Hkuang.onscroll=function (e){
const W=parseInt(this.scrollWidth);
const w=parseInt(this.getBoundingClientRect().width);
const Left=parseInt(this.scrollLeft);
if(w>=Left){
coall(0);
}if(w<=Left&&(w*2)>=Left){
//本地音乐
coall(1);
setTimeout(()=>{
HomeMusic(Xiangs[1]);
 },100);
}if((w*2)<=Left&&(w*3)>=Left){
coall(2);
}if((w*3)==Left){
//本地视频
coall(3);
setTimeout(()=>{
HomeVideo(Xiangs[3]);
},100);
}
daohanglan_tiao.style.left=Left/W*w;
}
function coall(i){
const leng=Cons.length;
for(s=0;s<leng;s++){
if(i==s){
Cons[i].style.color='#0066ff';
Cons[i].style.fontWeight='700';
Cons[i].style.transform='scale(1)';
}else{
Cons[s].style.color='#333';
Cons[s].style.fontWeight='400';
Cons[s].style.transform='scale(0.75)';
}
}
}

//底部功能栏点击事件
const icons=document.querySelectorAll(".Cicon");
icons.forEach((icon,i)=>{
icon.onclick=()=>{
if(i==0){
//设置
 
}else if(i==1){
//更改模式
if(god){
 god=false;
 Root(Liang,"夜间");
 PoenTip('亮色模式');
 }else{
 god=true;
 Root(Darkness,'日间');
 PoenTip('暗色模式');
 }
}else if(i==2){
//弹出个性装扮侧边栏
PersonalizedDressUp.style.opacity=1;
PersonalizedDressUp.style.display='block';
//缩回个性装扮侧边栏
PersonalizedDressUp_Return.onclick=()=>{
PersonalizedDressUp.style.opacity=0;
setTimeout(()=>{
PersonalizedDressUp.style.display='none';
},500);
 }
}else if(i==3){

}
}
});
//滑动事件
PDU_kuang.onscroll=function (e){
const W=parseInt(this.scrollWidth);
const w=parseInt(this.getBoundingClientRect().width);
const Left=parseInt(this.scrollLeft);
if(Left<=0&&w>=Left){
coall(0);
}if(w<=Left&&(w*2)>=Left){
coall(1);
}if((w*2)<=Left&&(w*3)>=Left){
coall(2);
}if((w*3)==Left){
coall(3);
}
function coall(i){
const leng=Pers.length;
for(s=0;s<leng;s++){
if(i==s){
Pers[i].style.color='var(--Tcolor)';
}else{
Pers[s].style.color='var(--color)';
}
}
}
 }
//个性装扮(菜单点击事件)
var Pers=document.querySelectorAll(".PersonalizedDressUp_daohanglan button");
Pers[0].style.color='var(--Tcolor)';
Pers.forEach((per,i)=>{
per.onclick=()=>{
PDU_kuang.scrollTo({
left:PDU_kuang.getBoundingClientRect().width*i,
behavior:'smooth'
});
}
});

//切换主题色
PDUcolor('undefined',true);
PDUsetcolor.oninput=function (){
root.style.setProperty('--Tcolor',this.value);
PDUcolor(this.value,false);
PoenPopTip('提示','修改成功');
    }
function PDUcolor(color,pd){
if(PDUdata){
if(color!='undefined'){
PDUdata.ThemeColor=color;
autBonly('PDU-data',PDUdata);
}
if(pd){
PDUsetcolor.value=PDUdata.ThemeColor;
root.style.setProperty('--Tcolor',PDUdata.ThemeColor);
}
}else{
root.style.setProperty('--Tcolor',PDUsetcolor.value);
autBonly('PDU-data',{
ThemeColor:PDUsetcolor.value
  });
 }
}
//头像|昵称
PDUdata=arrNumber('PDU-data');
if(PDUdata.LCstyle){
setLCstyle(PDUdata.LCstyle);
}else{
PDUdata.LCstyle={
  tx:false,
  name:'梦生缘'
  };
autBonly('PDU-data',PDUdata);
setLCstyle({
  tx:false,
  name:'梦生缘'
  });
}
//弹出设置信息页
Ctouxian.onclick=function (){
setTx.style.display='block';
setTx.style.opacity=1;
//缩回页面
setTx_Return.onclick=()=>{
setTx.style.opacity=0;
setTimeout(()=>{
setTx.style.display='none';
},500);
}
}

function Setnickname(){
var Mmax=10;
wc.alertDialog(`
<div class="Dink"><input type="text" id="Dinput" placeholder="输入你的昵称"/>
<small style="color:#00a6ff;">提示:昵称不得超过${Mmax}个字符</small></div>
`,'设置昵称',{
name:'保存',
function(){
 var nc=Dinput.value;
 if(nc.length<=Mmax){
  if(nc!=""){
  Cnicheng.innerText=nc;
  Tx_name.innerText=nc;
  PDUdata.LCstyle.name=nc;
  PoenPopTip('提示','修改成功');
  autBonly('PDU-data',PDUdata);
  }else{
  PoenPopTip('错误','输入框能空白!!!');
  }
 }else{
 PoenPopTip('错误','字数不得超过'+Mmax+'个!!!');
 }
}
});
Dinput.value=Cnicheng.innerText;
}
//设置顶栏封面
function setTbr(data){
TopBar.style.backgroundImage="url("+data+")";
}
//设置头像
function setPrp(data){
Ctouxian.style.backgroundImage="url("+data+")";
Tx_tx.style.backgroundImage="url("+data+")";
}
//设置个人背景墙
function setPbw(data){
CFkuang.style.backgroundImage="url("+data+")";
Tx_PBW.src=data;
}
function setLCstyle(data){
Cnicheng.innerText=data.name;
Tx_name.innerText=data.name;
//顶栏封面
if(data.Tbr){
getfile('/sdcard/酷我音乐/Tbrfile.txt',function (data){
setTbr(data);
  });
}else{
setTbr('img/To/topbg.jpeg');
}
//头像
if(data.tx){
getfile('/sdcard/酷我音乐/Txfile.txt',function (data){
setPrp(data);
  });
}else{
setPrp('appIcon.png');
 }
//个人背景墙
if(data.Pbw){
getfile('/sdcard/酷我音乐/PBWfile.txt',function (data){
setPbw(data);
  });
}else{
setPbw('img/To/downloadfile.png');
}
}
//启动页
function setmonkey(){
getfile('/sdcard/酷我音乐/SPfile.txt',function (data){
  monkey.src=data;
  });
}
var qdys=document.getElementsByName("qdy");
if(PDUdata.SPstyle){
ApplyPDUStartPage(PDUdata.SPstyle);
}else{
setPDUStartPage('Default');
}
function setPDUStartPage(radio){
PDUdata.SPstyle=radio;
autBonly('PDU-data',PDUdata);
ApplyPDUStartPage(radio);
}
function ApplyPDUStartPage(radio){
if(radio=="Default"){
qdys[0].checked="checked";
monkey.src="img/bg.jpeg";
}else if(radio=="Random"){
qdys[1].checked="checked";
setmonkey();
}else if(radio=="Customize"){
qdys[2].checked="checked";
setmonkey();
 }

}
qdys.forEach((radio)=>{
radio.onclick=function (){
setPDUStartPage(radio.value);
if(radio.value=="Default"){
//默认

}else if(radio.value=="Random"){
//随机
if(navigator.onLine){
  var resource;
  var SwitchTx=()=>{
getdata('https://www.loliapi.com/acg/',function (data){
  Dimg_presentation.src=data;
  resource=data;
});
  }
  SwitchTx();
  wc.alertDialog(`<img id="Dimg_presentation"/>`,'网络随机更新',{
  name:'确认',
  function(){
  if(webcat && resource){
  PoenTip('修改成功');
  monkey.src=resource;
  webcat.delFile('酷我音乐/SPfile.txt');
  webcat.write('酷我音乐/SPfile.txt',resource);
  }else{
  PoenPopTip('提示','修改失败');
  }
 }
},{
name:'切换',
function(){
SwitchTx();
  }
});
}else{
PoenPopTip('提示','网络异常!请检查网络后重试');
}
}else if(radio.value=="Customize"){
//自定义
PDUfile.click();
PDUfile.onchange=function (e){
const file=this.files[0];
const reader =new FileReader();
reader.readAsDataURL(file);
reader.onload=e=>{
let call=file.type.split(/[/]/)[0];
if(call=="image"){
const  base=e.target.result;
if(webcat){
wc.alertDialog(`<img id="Dimg_presentation" src='${base}'/>`,'选取图片',{
  name:'确认',
  function(){
  PoenPopTip('提示','修改成功');
  monkey.src=base;
  webcat.delFile('酷我音乐/SPfile.txt');
  webcat.write('酷我音乐/SPfile.txt',base);
 }
});
}else{
 PoenPopTip('提示','修改失败');
 }
  }else{
 PoenPopTip('错误','只能选取图片!!!');
  }
  }
 }
}
}});
//弹出搜索栏
Topsou.onclick=()=>{
SearchBar.style.display='block';
SearchBar.style.opacity=1;
Inmiss.focus();
//缩回搜索栏
SearchBar_Return.onclick=()=>{
Inmiss.blur();
SearchBar.style.opacity=0;
setTimeout(()=>{
SearchBar.style.display='none';
},300);
}
}
//搜索栏失焦事件
Inmiss.addEventListener('blur', function() {
shutANL();
});
//联想词
let controller;
Inmiss.oninput=async()=>{
if(Inmiss.value.replace(/\s*/g,"")){
controller && controller.abort();
controller=new AbortController();
const list= await fetch('http://msearchcdn.kugou.com/new/app/i/search.php?student=0&cmd=302&keyword='+Inmiss.value+'&with_res_tag=1',{
 signal:controller.signal
}).then((resp)=>resp.text());
openANL();
appNamelist.innerHTML="";
const data=JSON.parse(list.match(/\[(.+?)\]/g));
if(data){
for(i=0;i<data.length;i++){
const op=document.createElement('div');
op.className='AssW';
op.value=data[i].keyword;
const tb=document.createElement('div');
tb.className='tb';
op.appendChild(tb);
const text=document.createElement('div');
text.textContent=data[i].keyword;
op.appendChild(text);
appNamelist.appendChild(op);
op.onclick=function (){
Search(this.innerText);
  }
  }
  }
 }
}
let gtext='我在七年后等着你';
//显示联想词
function openANL(){
appNamelist.style.display='block';
setTimeout(()=>{
appNamelist.style.opacity=1;
},0);
}
//隐藏联想词
function shutANL(){
appNamelist.style.opacity=0;
setTimeout(()=>{
appNamelist.style.display='none';
},100);
}
//搜索记录
var SRd=arrNumber('SearchRecord-data');
if(SRd&&SRd!=""){
Inmiss.placeholder=SRd[SRd.length-1];
souTi.innerText=SRd[SRd.length-1];
}else{
Inmiss.placeholder=gtext;
souTi.innerText=gtext;
}
SearchRecord_button.onclick=function (){
SearchRecord_mcm.style.display='block';
SearchRecord_page.style.display='block';
setTimeout(()=>{
SearchRecord_mcm.style.opacity=1;
},0);
setTimeout(()=>{
SearchRecord_page.style.transform='translateY(-100%)';
SRd=arrNumber('SearchRecord-data');
if(SRd){
for(i=SRd.length-1;i>=0;i--){
const zi=document.createElement('button');
zi.textContent=SRd[i];
SearchRecord_kuang.appendChild(zi);
zi.onclick=function (){
Search(zi.innerText);
SearchRecord_Retract();
 }
 }
 }
},100);
}
//缩回搜索记录
SearchRecord_mcm.onclick=SearchRecord_Retract;
function SearchRecord_Retract(){
SearchRecord_page.style.transform='translateY(0)';
SearchRecord_mcm.style.opacity=0;
setTimeout(()=>{
SearchRecord_kuang.innerHTML="";
SearchRecord_mcm.style.display='none';
SearchRecord_page.style.display='none';
},400);
}
//删除搜索记录
Deleterecord.onclick=()=>{
wc.alertDialog(`
<div class="Dink">确认清空搜索记录吗？
<small style="color:#ff0036;">提示:清空之后不可恢复</small></div>`,'提示',{
 function(){
  autBonly('SearchRecord-data',[gtext]);
  SearchRecord_Retract();
 }
});
}
//弹出播放页
Hbm_Cover.onclick=()=>{
PlayPage.style.opacity=1;
PlayPage.style.display='block';
//缩回搜索栏
PlayPage_Return.onclick=()=>{
PlayPage.style.opacity=0;
setTimeout(()=>{
PlayPage.style.display='none';
},300);
}
}
//音量
var itvolume=Music.volume;
MusicMore_volume_button.onclick=function (){
itvolume=Music.volume;
if(Music.muted){
Music.muted=false;
MusicMore_volume.value=itvolume*100;
MusicMore_volume.style.backgroundSize=`${itvolume*100}% 100%`;
this.style.webkitMask=`url(img/To/gtb.png)100% 100%/cover`;
}else{
Music.muted=true;
MusicMore_volume.value=0;
MusicMore_volume.style.backgroundSize=`0% 100%`;
this.style.webkitMask=`url(img/To/gta.png)100% 100%/cover`;
}
}
//控制音量
MusicMore_volume.oninput=function (){
Music.volume=this.value/100;
MusicMore_volume.style.backgroundSize=`${this.value}% 100%`;
if(this.value==0){
MusicMore_volume_button.style.webkitMask=`url(img/To/gta.png)100% 100%/cover`;
}else{
MusicMore_volume_button.style.webkitMask=`url(img/To/gtb.png)100% 100%/cover`;
}
}
//播放速度
MusicMore_DoubleSpeed.oninput=function (){
const value=this.value/100;
Music.playbackRate = value;
MusicMore_DoubleSpeed_text.innerText=value.toFixed(1)+'倍速';
}
//音乐播放器
var itSig,itSi,itSr,itSrc,itPss,itIi;
function Musicplay(Ii,sig,si,sr){
const src=Ii.getAttribute("data-src");
const pss=Ii.getAttribute("data-pss");
const name=Ii.getAttribute("data-name");
const cover=Ii.getAttribute("data-cover");
const singer=Ii.getAttribute("data-singer");
if(itSrc==src){
}else{
Music.src=src;
}
if(itIi){
itIi.setAttribute('data-pss',itPss);
}else{
}
if(pss=="false"){
Music.currentTime=0;
}else{
if(!(itSrc==src)){
Music.currentTime=pss;
}
}
Music.play();
if(itSig && Music.play){
itSig.innerHTML="";
itSi.style.color="var(--color)";
itSr.style.color="var(--TRcolor)";
}
sig.innerHTML=`
<div class="Mpm">
<i></i>
<i></i>
<i></i>
</div> 
`;
si.style.color="var(--Tcolor)";
sr.style.color="var(--Tcolor)";
if(Iis && Ii){
for(i=0;i<Iis.length;i++){
if(Iis[i]==Ii)site=i;
 }//循环结束
}
//音乐播放页(更多)
PlayPage_more.onclick=()=>{
 MusicMore(Ii);
}
itIi=Ii;
itSrc=src;
itSig=sig;
itSi=si;
itSr=sr;
//主题色
new ThemeColor(cover,(color)=>{
Hbottom.style.backgroundColor=color;
PlayPage_Cover_kong.style.backgroundColor=color;
})
//封面
PlayPage.style.backgroundImage="url("+cover+")";
Hbm_Cover.style.backgroundImage="url("+cover+")";
PlayPage_Cover.style.backgroundImage="url("+cover+")";
PlayPage_Record_Cover.style.backgroundImage="url("+cover+")";
//歌名
Hbm_Nsk_name.innerText=name;
PlayPage_Songmessage_name.innerText=name;
//歌手
Hbm_Nsk_singer.innerText=singer;
//歌词
const lyric=Ii.getAttribute("data-lyric");
PlayPage_Lyric.innerHTML="";
if(lyric=="false"){
}else{
fetch(lyric).then(response => response.json()) .then(data=>{
const candidates=data.candidates[0];
fetch(`http://lyrics.kugou.com/download?ver=1&client=pc&id=${candidates.id}&accesskey=${candidates.accesskey}&fmt=lrc&charset=utf8`).then(response => response.json()) .then(data=>{
setLyric(getDecode(data.content));
});
});
}
PlayPage_Songmessage_singer.innerText=singer;
}//Musicplay(结束)
var lyric_height=PlayPage_Lyric.getBoundingClientRect().height;
Music.addEventListener("loadedmetadata",()=>{
var time=Music.duration;
//总时长
var zm=Math.floor(time%3600/60);
var zs=Math.floor(time%60);
zm=zm>=10?zm:'0'+zm;
zs=zs>=10?zs:"0"+zs;
Hbm_Times_don.innerText=zm+":"+zs;
PlayPage_Times_don.innerText=zm+":"+zs;
//控制进度条
let pps_ST=function (){
clearTimeout(timeid);
Music.pause();
timeid=setTimeout(()=>{
Music.play();
},500);
try {
Music.currentTime=this.value*0.01*time;
}catch (e) {
PoenTip("发生异常:" + e);
 }
}
let timeid;
var itlyric;
HbmPss.oninput=pps_ST;
PlayPagePss.oninput=pps_ST;
Music.ontimeupdate=()=>{
var currentTime=Music.currentTime;
itPss=currentTime;
var m=Math.floor(currentTime%3600/60);
var s=Math.floor(currentTime%60);
m=m>=10?m:'0'+m;
s=s>=10?s:"0"+s;
Hbm_Times_pss.innerText=m+":"+s;
PlayPage_Times_pss.innerText=m+":"+s;
var value=currentTime/time*100;
HbmPss.value=value;
PlayPagePss.value=value;
HbmPss.style.backgroundSize=value+'% 100%';
PlayPagePss.style.backgroundSize=value+'% 100%';
if(lrcData && lrcData.length>=1){
// 分钟
  var min = parseInt(currentTime / 60);
// 秒钟
  var sec = parseInt(currentTime % 60);
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
// 毫秒
  var ms = "000";
  if (currentTime % 1) ms = /0\.(\d{3})(.+)/.exec(currentTime % 1)[1];
  currentTime = min + ":" + sec + "." + ms;
  lrcData.forEach((v, i) => {
  if (currentTime >= v.time) {
  PlayPage_Lyric.style.top = (lyric_height/2+40) - i *  40+ "px";
  if(itlyric)itlyric.className = "lyric";
  if(lyrics[i]){
  lyrics[i].className = "lyric active";
  itlyric=lyrics[i];
  }
  }});
  }
}
});
//歌词
var lrcData;
function setLyric(lyricStr){
lrcData=[];
PlayPage_Lyric.style.top = (lyric_height/2) - 0 *  40+ "px";
var lyricStr=lyricStr.split("\n");
lyricStr.forEach(v => {
  const item = v.split(']');
  if(item[1]!=0&&item[1]!=null){
  const time = item[0].substring(1);
  const words = item[1];
  const obj = {
  time: time,
  text:words
  }
  lrcData.push(obj);
  const li = document.createElement("li")
  li.innerText = words;
  li.className='lyric';
  PlayPage_Lyric.appendChild(li);
 }
});
}
var ssd=0;
//切换浏览模式
PlayPage_Controls_Pattern.onclick=function (){
ssd++;
if(ssd>2)ssd=0;
if(ssd==0){
PoenTip('单曲循环');
PlayPage_Controls_Pattern.style.backgroundImage = "url(img/To/Rj.png)";
}else if(ssd==1){
PoenTip('顺序播放');
PlayPage_Controls_Pattern.style.backgroundImage = "url(img/To/Ni.png)";
} else if(ssd==2){
PoenTip('随机播放');
PlayPage_Controls_Pattern.style.backgroundImage = "url(img/To/Ml.png)";
}
}
//播放结束事件
Music.addEventListener("ended", function() {
if(ssd==0){
Music.play();
}else if(ssd==1){
site++;
RESULT();
}else if(ssd==2){
site=Math.round(Math.random()*Iis.length);
RESULT();
}
});
//音乐播放/暂停
Music.addEventListener("play",()=>{
Music_status(true);
});
Music.addEventListener("pause",()=>{
Music_status(false);
});
Hbm_Controls_ppd.onclick=()=>{
if(Music.paused){
Music.play();
}else{
Music.pause();
}
}
PlayPage_Controls_PPDX.onclick=()=>{
if(Music.paused){
Music.play();
}else{
Music.pause();
}
}
var lyrics=document.getElementsByClassName('lyric');
var Iis=document.getElementsByClassName('Ii');
var Sigs=document.getElementsByClassName('MCover');
var Sis=document.getElementsByClassName('songname');
var Srs=document.getElementsByClassName('singer');
var site=0;
//上一首
Hbm_Controls_Previous.onclick=function (){
setmeky(true);
}
PlayPage_Controls_Previous.onclick=function (){
setmeky(true);
}
//下一首
Hbm_Controls_NextSong.onclick=function (){
setmeky(false);
}
PlayPage_Controls_NextSong.onclick=function (){
setmeky(false);
}
function setmeky(sfs){
if(Iis && itIi){
if(sfs){
site--;
if(site<0)site=Iis.length-1;
}else{
site++;
if(site>Iis.length-1)site=0;
 }
RESULT();
 }
}
function RESULT(){
Musicplay(Iis[site],Sigs[site],Sis[site],Srs[site]);
}
//音乐播放状态
function Music_status(whether){
if(whether){
Hbm_Controls_ppd.style.backgroundImage="url('img/To/play.png')";
PlayPage_Controls_ppd.style.backgroundImage="url('img/To/play.png')";
PlayPage_Record.style.animationPlayState="running";
}else{
Hbm_Controls_ppd.style.backgroundImage="url('img/To/pause.png')";
PlayPage_Controls_ppd.style.backgroundImage="url('img/To/pause.png')";
PlayPage_Record.style.animationPlayState="paused";
 }
}
//弹出添加的音乐列表
MCollection.onclick=Musicadded_Eject;
PlayPage_MCollection.onclick=Musicadded_Eject;
//头像栏点击事件
const Txs=document.querySelectorAll(".Tx_tiao");
Txs.forEach((tx,i)=>{
  tx.onclick=function (){
   if(i==0){
   wc.optionDialog(tx.getAttribute("data-title"),Txarr[i]);
   }else if(i==1){
   Setnickname();
   }else if(i==2){
   wc.optionDialog(tx.getAttribute("data-title"),Txarr[i]);
   }
  }
});
//左侧边栏便捷菜单
Persmenu.onclick=function (){
Poensmenu(this,smenuArr);
}
//Home更多选项
Topmenu.onclick=function (){
Poensmenu(this,homeArr);
}
//视频播放器
let Vp_time;
let VK_xy;
VideoplayerK.onclick=function (){
if(V_control.style.display=="none"){
VK_xy=false;
clearTimeout(Vp_time);
V_control.style.display='block';
DisplayControl();
}else{
HideControl();
clearTimeout(Vp_time);
Vp_time=setTimeout(()=>{
if(VK_xy){

}else{
V_control.style.display='none';
}
},150);
 }
}

VideoplayerK.ondblclick=function (){
if(Videoplayer_video.paused){
Videoplayer_video.play();
}else{
Videoplayer_video.pause();
 }
}
let Vc_TBxy=false;
Vc_lock.onclick=function (e){
if(Vc_TBxy){
Vc_top.style.display='flex';
Vc_bottom.style.display='block';
Vc_lock.style.backgroundImage="url('img/To/Locking.webp')";
Vc_TBxy=false;
}else{
Vc_top.style.display='none';
Vc_bottom.style.display='none';
Vc_lock.style.backgroundImage="url('img/To/Unlock.webp')";
Vc_TBxy=true;
}
e.stopPropagation();
}
var video_it;
async function Displayvideoplayer(data,box){
video_it=box;
Music.pause();
VideoplayerK.style.display='flex';
V_control.style.display='block';
video_name.innerText=data.name;
Videoplayer_video.src=data.src;
Videoplayer_video.currentTime=data.time;
Videoplayer_video.play();
}

Videoplayer_video.addEventListener("loadedmetadata",()=>{
var Dtime=Videoplayer_video.duration;
 //控制进度条
let timeid;
video_Pb.oninput=()=>{
clearTimeout(timeid);
Videoplayer_video.pause();
timeid=setTimeout(()=>{
Videoplayer_video.play();
},500);
try {
Videoplayer_video.currentTime=video_Pb.value*0.01*Dtime;
}catch (e) {
PoenTip("发生异常:" + e);
 }
}
var zm=Math.floor(Dtime%3600/60);
var zs=Math.floor(Dtime%60);
zm=zm>=10?zm:'0'+zm;
zs=zs>=10?zs:"0"+zs;
video_Dt.innerText=zm+":"+zs;
Videoplayer_video.ontimeupdate=()=>{
var CTime=Videoplayer_video.currentTime;
var m=Math.floor(CTime%3600/60);
var s=Math.floor(CTime%60);
m=m>=10?m:'0'+m;
s=s>=10?s:"0"+s;
video_Ct.innerText=m+":"+s;
var value=CTime/Dtime*100;
video_Pb.value=value;
video_Pb.style.backgroundSize=value+'% 100%';
   }
});
function Hidevideoplayer(){
if(Vc_spinsf){
VideoplayerK.style.display='none';
unlock.style.display='flex';
video_it.setAttribute('data-time',Videoplayer_video.currentTime);
}else{
exitFullscreen();
unlock.style.display='none';
setTimeout(()=>{
VideoplayerK.style.display='none';
unlock.style.display='flex';
},500);
 }
Videoplayer_video.pause();
}
function DisplayControl(){
V_control.style.display='block';
HideControl();
}
var HideControl_time;
function HideControl(){
clearTimeout(HideControl_time);
HideControl_time=setTimeout(()=>{
V_control.style.display='none';
},3000);
}
var Vc_spinsf=true;
Vc_spin.onclick=function (){
if(Vc_spinsf){
unlock.style.display='none';
setTimeout(()=>{
unlock.style.display='none';
},50);
unlock.requestFullscreen();
setTimeout(()=>{
unlock.style.display='flex';
},500);
Vc_spinsf=false;
}else{
unlock.style.display='none';
exitFullscreen();
setTimeout(()=>{
unlock.style.display='flex';
},500);
Vc_spinsf=true;
}
}
//退出全屏
function exitFullscreen(){
if(document.exitFullScreen) {
document.exitFullScreen();
} else if(document.mozCancelFullScreen) {
document.mozCancelFullScreen();
} else if(document.webkitExitFullscreen) {
document.webkitExitFullscreen();
} else if(document.msExitFullscreen) {
document.msExitFullscreen();
}
}