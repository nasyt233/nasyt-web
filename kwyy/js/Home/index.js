//页面加载完成事件
window.onload=()=>{
McM.style.opacity=0;
setTimeout(()=>{
McM.style.display='none';
},800);
//时间
var time=new Date();
var ri = time.getDate();
var shi= time.getHours();
if(ri<10) ri = '0' + ri;
var ww = time.getDay();
if(ww==0){
ww="周日";
}else if(ww==1){
ww="周一";
}else if(ww==2){
ww="周二"
}else if(ww==3){ 
ww="周三";
}else if(ww==4){ 
ww="周四";
}else if(ww==5){ 
ww="周五";
}else if(ww==6){ 
ww="周六";
}else{

}
let zzw;
if(shi>=0 && shi<6){
zzw="凌晨";
PoenTip('深夜，现在的夜，熬的只是还未改变的习惯');
}else if(shi>=6 && shi<9){
zzw="早上";
}else if(shi>=9 && shi<11){
zzw="上午";
}else if(shi>=11 && shi<13){
zzw="中午";
}else if(shi>=13 && shi<17){
zzw="下午";
}else if(shi>=17 && shi<19){
zzw="傍晚";
}else if(shi>=19 && shi<24){
zzw="晚上";
}else{
  
}
var fen=time.getMinutes();
if(fen<10) fen = '0' + fen;
if(shi>=8 && shi<19){
Root(Liang,"夜间");
god=false;
}else{
Root(Darkness,'日间');
god=true;
}
rian.innerText=ri;
rich.innerHTML=ww+'</br>'+zzw;
Caption();
//屏幕高度
var Height=document.body.clientHeight;
index.style.height=Height+'px';
Fixed.style.height=Height+'px';
SearchBar.style.height=Height+'px';
LeftSidebar.style.height=Height+'px';

var ago=arrNumber('clockin');
if(ago){
tim.innerText=ago.npc;
}else{
tim.innerText=0;
}
}//页面加载完成事件(end)

//获取日期
function time(num){
var time=new Date();
var nian=time.getYear();
if(nian<1900) nian=nian+1900;
var yue = time.getMonth()+1;
var ri = time.getDate();
if(ri<10) ri = '0' + ri;
return{
  year:nian,
  month:yue,
  day:ri,
  npc:num
  };
}
//打卡
function clockin(){
var ago=arrNumber('clockin');
if(ago){
if(ago.year==time().year && ago.month==time().month && ago.day==time().day){
PoenPopTip('提示',`今天已经打卡过了,明天再来打卡吧!</br>今天是打卡的第<b>${ago.npc}</b>天!`);
}else{
autBonly('clockin',time(ago.npc+1));
tim.innerText=ago.npc+1;
PoenTip('打卡成功!');
}
}else{
autBonly('clockin',time(1));
tim.innerText=1;
PoenTip('打卡成功!');
 }
}
//搜索音乐
function SearchSong(){
var ssr=Inmiss.value;
Search(ssr);
}
function Search(ssr){
var ssr=ssr.replace(/\s*/g,"");
if(!ssr){
ssr=souTi.innerText;
}
if(navigator.onLine){
container.innerHTML='';
Inmiss.blur();
//搜索记录
var SRd=arrNumber('SearchRecord-data');
if(SRd){
SRd.push(ssr);
autBonly('SearchRecord-data',Array.from(new Set(SRd)));
}else{
autBonly('SearchRecord-data',[ssr]);
}
for(s=0;s<5;s++){
fetch(`http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${ssr}&page=${s}&pagesize=30&showtype=1`) .then(response => response.json()) .then(data=>{
var info=data.data.info;
for(i=0;i<info.length;i++){
fetch(`http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${info[i].hash}`) .then(response => response.json()) .then(data=>{
if(data.url){
const size = new RegExp("{size}","g");
var cover=data.album_img.replace(size,"240");
var Ztime=data.timeLength;
var zm=Math.floor(Ztime%3600/60);
var zs=Math.floor(Ztime%60);
zm=zm>=10?zm:'0'+zm;
zs=zs>=10?zs:"0"+zs;
const Ii=document.createElement('div');
Ii.className='Ii';
Ii.setAttribute('data-lyric',`http://lyrics.kugou.com/search?ver=1&man=yes&client=pc&keyword=${data.songName}&duration=${data.time}&hash=${data.hash}`);
Ii.setAttribute('data-pss',false);
Ii.setAttribute('data-src',data.url); 
Ii.setAttribute('data-cover',cover); 
Ii.setAttribute('data-name',data.songName);
//封面
const Sig=document.createElement('div');
Sig.style.backgroundImage="url("+cover+")";
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
Si.textContent=data.songName;
Sir.appendChild(Si);
//歌手
var Singer;
const Sr=document.createElement('div');
Sr.classList.add('singer');
if(data.singerName==""){
Sr.textContent='未知歌手';
Singer='未知歌手';
}else{
Sr.textContent=data.singerName;
Singer=data.singerName;
}
Ii.setAttribute('data-singer',Singer);
Sir.appendChild(Sr);
Ii.appendChild(Sir);
//时长
const Sc=document.createElement('time');
Sc.textContent=zm+":"+zs;
Sr.appendChild(Sc);
//更多
const Smo=document.createElement('div');
Smo.classList.add('more');
Ii.appendChild(Smo);
container.appendChild(Ii);
//(Ii)点击事件
Ii.onclick=()=>{
Musicplay(Ii,Sig,Si,Sr);
 }
//(更多)点击事件
Smo.onclick=(e)=>{
 MusicMore(Ii);
 e.stopPropagation();
 }
 }
 });
}
});
}
}else{
Inmiss.blur();
setTimeout(()=>{
PoenPopTip('网络错误','请检查网络后重试!');
},300);
}
}
//音乐更多
function MusicMore(Ii){
const src=Ii.getAttribute("data-src");
const name=Ii.getAttribute("data-name");
const cover=Ii.getAttribute("data-cover");
const singer=Ii.getAttribute("data-singer");
//歌名
MusicMore_nss_name.innerText=name;
MusicMore_nss_name.onclick=function (){
Search(name);
Retract();
SearchBar.style.display='block';
SearchBar.style.opacity=1;
Inmiss.value=name;
Inmiss.focus();
}
//歌手
MusicMore_nss_singer.innerText=singer;
MusicMore_nss_singer.onclick=function (){
Search(singer);
Retract();
SearchBar.style.display='block';
SearchBar.style.opacity=1;
Inmiss.value=singer;
Inmiss.focus();
}
//复制
MusicMore_nss_copy.onclick=function (){
copyText(name);
PoenTip('歌曲名复制成功!');
}
//下一首歌曲
MusicMore_kuang_NextSong.onclick=function (){
setmeky(false);
}
//复制链接
MusicMore_kuang_CopyLink.onclick=function (){
copyText(src);
PoenTip('歌曲链接复制成功!');
}
//弹出
MusicMore_mcm.style.display='block';
MusicMore_page.style.display='block';
setTimeout(()=>{
MusicMore_mcm.style.opacity=1;
},0);
setTimeout(()=>{
MusicMore_page.style.transform='translateY(-100%)';
},100);
//缩回
var Retract=()=>{
MusicMore_page.style.transform='translateY(0)';
MusicMore_mcm.style.opacity=0;
setTimeout(()=>{
MusicMore_mcm.style.display='none';
MusicMore_page.style.display='none';
},400);
}
MusicMore_mcm.onclick=Retract;
}
//添加音乐
function Addmusic(it,Ii){
  const plus_size=50;
  const div=document.createElement('div');
  div.className='plus';
  const Mcon=document.createElement('div');
  Mcon.className='musicfm';
  const sigRect=it.getBoundingClientRect();
  const left=sigRect.left+sigRect.width/2-plus_size/2;
  const top=sigRect.top-plus_size;
  const mconRect=MCollection.getBoundingClientRect();
  const x=mconRect.left+mconRect.width/2-plus_size/2-left;
  const y=mconRect.top-plus_size-top;
  div.style.setProperty('--left',`${left}px`);
  div.style.setProperty('--top',`${top}px`);
  div.style.setProperty('--x',`${x}px`);
  div.style.setProperty('--y',`${y}px`);
  const TaStyle = window.getComputedStyle(it, false);
  const bg = TaStyle.backgroundImage;
  Mcon.style.backgroundImage=bg;
  const src=Ii.getAttribute("data-src");
  const cover=Ii.getAttribute("data-cover");
  const name=Ii.getAttribute("data-name");
  const singer=Ii.getAttribute("data-singer");
  const lyric=Ii.getAttribute("data-lyric");
  Musicadded.push({src:src,cover:cover,name:name,singer:singer,lyric:lyric});
  AddMusic({src:src,cover:cover,name:name,singer:singer,lyric:lyric});
  div.addEventListener("animationend",()=>{
  div.remove();
   });
  div.appendChild(Mcon);
  Fixed.appendChild(div);
}

//添加的音乐
function AddMusic(zi){
const Ii=document.createElement('div');
Ii.className='Ii';
Ii.setAttribute('data-lyric',zi.lyric);
Ii.setAttribute('data-pss',false);
Ii.setAttribute('data-src',zi.src); 
Ii.setAttribute('data-cover',zi.cover);
Ii.setAttribute('data-name',zi.name); 
Ii.setAttribute('data-singer',zi.singer);
//封面
const Sig=document.createElement('div');
Sig.style.backgroundImage="url("+zi.cover+")";
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
Si.textContent=zi.name;
Sir.appendChild(Si);
//歌手
const Sr=document.createElement('div');
Sr.classList.add('singer');
Sr.textContent=zi.singer;
Sir.appendChild(Sr);
Ii.appendChild(Sir);
//更多
const Smo=document.createElement('div');
Smo.classList.add('more');
Ii.appendChild(Smo);
Musicadded_kuang.appendChild(Ii);
//(Ii)点击事件
Ii.onclick=()=>{
Musicplay(Ii,Sig,Si,Sr);
 }
//(更多)点击事件
Smo.onclick=(e)=>{
 MusicMore(Ii);
 e.stopPropagation();
 }
}
//弹出添加的音乐列表
var Musicadded=[];
function Musicadded_Eject(){
if(Musicadded.length==0){
Kui.style.display='flex';
}else{
Kui.style.display='none';
}
Musicadded_mcm.style.display='block';
Musicadded_page.style.display='block';
setTimeout(()=>{
Musicadded_mcm.style.opacity=1;
},0);
setTimeout(()=>{
Musicadded_page.style.transform='translateY(-100%)';
},100);
//缩回
Musicadded_mcm.onclick=()=>{
Musicadded_page.style.transform='translateY(0)';
Musicadded_mcm.style.opacity=0;
setTimeout(()=>{
Musicadded_mcm.style.display='none';
Musicadded_page.style.display='none';
},400);
}
}

//左侧边栏
var LeftS=true;
function Lif(){
if(LeftS){
LeftS=false;
LeftSidebar.style.display='block';
setTimeout(()=>{
LeftSidebar.style.backgroundColor='rgba(0,0,0,0.4)';
Lcontent.style.transform='translateX(100%)';
Lcontent.style.opacity=1;
}
,0);
}else{
LeftS=true;
Lcontent.style.transform='translateX(0)';
LeftSidebar.style.backgroundColor='rgba(0,0,0,0)';
Lcontent.style.opacity=0;
setTimeout(()=>{
LeftSidebar.style.display='none';
},300);
 }
}

//弹出选项菜单
function Poensmenu(Fu,content){
Doption_smenu.innerHTML="";
Doption_smenu.style.transform='scale(0.3)';
const FuRect=Fu.getBoundingClientRect();
const top=FuRect.top+(FuRect.height*1.2);
if(content){
content.forEach((it)=>{
const li=document.createElement('button');
li.className='bod';
li.style.width='100%';
li.style.height='40px';
li.style.border='none';
li.style.outline='none';
li.style.display='flex';
li.style.alignItems='center';
li.style.transition='0.2s ease-in-out';
li.style.backgroundColor='Transparent';
li.onclick=it.function;
const li_text=document.createElement('span');
li_text.style.color='#666';
li_text.style.fontSize='15px';
li_text.style.marginLeft='2%';
li_text.textContent=it.name;
li.appendChild(li_text);
Doption_smenu.appendChild(li);
 });
}
Doption_smenu_mcm.style.display='flex';
Doption_smenu.style.display='block';
Doption_smenu.style.setProperty('--top',top);
Doption_smenu_mcm.style.backgroundColor='rgba(0,0,0,0.4)';
Doption_smenu.style.opacity=1;
setTimeout(()=>{
Doption_smenu.style.transform='scale(1)';
},0);
Doption_smenu.onclick=function (e){
e.stopPropagation();
}
Doption_smenu_mcm.onclick=shutsmenu;
}
//关闭选项菜单
function shutsmenu(){
Doption_smenu_mcm.style.backgroundColor='rgba(0,0,0,0)';
Doption_smenu.style.opacity=0;
setTimeout(()=>{
Doption_smenu_mcm.style.display='none';
Doption_smenu.style.display='none';
},300);
}
//弹出提示
var tip_time;
function PoenTip(content){
tip.innerText=content;
tip.style.display='flex';
setTimeout(()=>{
tip.style.opacity=1;
},0);
var Width=document.body.clientWidth;
var width=tip.getBoundingClientRect().width;
tip.style.left=(Width-width)/Width/2*100+'%';
//关闭提示
clearTimeout(tip_time);
tip_time=setTimeout(()=>{
setTimeout(()=>{
tip.style.opacity=0;
setTimeout(()=>{
tip.style.display='none';
},510);
},100);
},1700);
}
//提示2
function PoenPopTip(title,content){
PopTip_title.innerText=title;
PopTip_content.innerHTML=content;
PopTip.style.transform='translateY(0%)';
setTimeout(()=>{
PopTip.style.transform='translateY(-100%)';
 },3500);
}