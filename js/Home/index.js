//页面加载完成事件
window.onload=function (){
TcMp(false);
var time=new Date();
var ri = time.getDate();
var shi= time.getHours();
if(ri<10) ri = '0' + ri;
var ww = time.getDay();
if (ww==0) ww="周日";
if (ww==1) ww="周一";
if (ww==2) ww="周二";
if (ww==3) ww="周三";
if (ww==4) ww="周四";
if (ww==5) ww="周五";
if (ww==6) ww="周六";
let zzw;
if(shi>=0 && shi<6)zzw="凌晨";
if(shi>=6 && shi<9)zzw="早上";
if(shi>=9 && shi<11)zzw="上午";
if(shi>=11 && shi<13)zzw="中午";
if(shi>=13 && shi<17)zzw="下午";
if(shi>=17 && shi<19)zzw="傍晚";
if(shi>=19 && shi<24)zzw="晚上";
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
fetch('https://v1.hitokoto.cn/').then(response => response.json()).then(data => {
Famous.innerHTML=`<span>${data.hitokoto}</span></br><small>— —${data.from}</small>`;
 });
//屏幕高度
var Height= window.screen.height;
Reader.style.height=Height+'px';
}
//顶部封面
function topbg(){
convertImgToBase64('https://www.loliapi.com/acg/pc/', function(base64Img){
wc.write('酷我音乐/TopBGI',base64Img);
});
}
//获取图片base64
function convertImgToBase64(url, callback){
var canvas = document.createElement('CANVAS'),
ctx = canvas.getContext('2d'),
img = new Image;
img.crossOrigin = 'Anonymous';
img.onload = function(){
canvas.height = img.height;
canvas.width = img.width;
ctx.drawImage(img,0,0);
var dataURL = canvas.toDataURL('image/png');
callback.call(this, dataURL);
canvas = null; 
};
img.src = url;
}
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
Poenwindow(`今天已经打卡过了,明天再来打卡吧</br>今天打卡的第${ago.npc}天!继续保持`);
}else{
autBonly('clockin',time(ago.npc+1));
Poenwindow('打卡成功!');
}
}else{
autBonly('clockin',time(1));
Poenwindow('今天第一次打卡成功!');
 }
}