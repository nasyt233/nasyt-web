//夜间
var Darkness=[
{name:'--color',
content:'white'
},
{name:'--Rcolor',
content:'#9E9E9E'
},
{name:'--TRcolor',
content:'#ddd'
},
{name:'--TbgRcolor',
content:'#000110'
},
{name:'--TbgQcolor',
content:'#0f1421'
}
];
//日间
var Liang=[
{name:'--color',
content:'black'
},
{name:'--Rcolor',
content:'#757575'
},
{name:'--TRcolor',
content:'#888'
},
{name:'--TbgRcolor',
content:'#eee'
},
{name:'--TbgQcolor',
content:'white'
}
];
//更改头像
var Txarr=[
[{
  name:'默认',
  function(){
  setPrp('appIcon.png');
  Txfile(false,false);
  PoenPopTip('提示','修改成功');
  }},{
  name:'随机',
  function(){
  setTimeout(()=>{
  var resource;
  var SwitchTx=()=>{
  fetch(`https://www.wudada.online/Api/SjTx`) .then(response => response.json()) .then(data=>{
  getdata(`${data.data}`,function (data){
  resource=data;
  Dimg_presentation.src=data;
  });});}
  SwitchTx();
  wc.alertDialog(`<img id="Dimg_presentation"/>`,'随机头像',{
  name:'确认',
  function(){
  setPrp(resource);
  Txfile(resource,true);
  }},{
  name:'切换',
  function(){
  SwitchTx();
  }
  });
  },0);
  }
  },{
  name:'从相册选取',
  function(){
  PDUfile.click();
  PDUfile.onchange=function (e){
  const file=this.files[0];
  const reader =new FileReader();
  reader.readAsDataURL(file);
  reader.onload=e=>{
  let call=file.type.split(/[/]/)[0];
  if(call=="image"){
  const  base=e.target.result;
  wc.alertDialog(`<img id="Dimg_presentation" src='${base}'/>`,'选取图片',{
  name:'确认',
  function(){
  setPrp(base);
  Txfile(base,true);
  }});}else{
  PoenTip('只能选取图片!!!');
  }}};}},{
  name:'关联QQ头像',
  function(){
  setTimeout(()=>{
  wc.alertDialog(`<div class="Dink">
  <input type="text" id="Dinput" placeholder="点击输入"/>
  <small style="color:#00a6ff;">提示:请输入你的QQ,以便程序获取头像</small></div>`,'请输入QQ号',{
  name:'确认',
  function(){
  getdata(`https://q1.qlogo.cn/g?b=qq&nk=${Dinput.value}&s=640`,function (data){
  setPrp(data);
  Txfile(data,true);
  });}});
  },0);
  }},{
  name:'自定义链接',
  function(){
  setTimeout(()=>{
  wc.alertDialog(`
  <div class="Dink"><input type="text" id="Dinput" placeholder="点击输入"/>
  </div>`,'请输入图片链接地址',{
  name:'确认',
  function(){
  getdata(`${Dinput.value}`,function (data){
  setPrp(data);
  Txfile(data,true);
  });}});
  Dinput.oninput=function (){
  var url=this.value;
  Dlogtx.style.backgroundImage=`url{url})`;
  }
  },0);
  }}],
  [],[{
  name:'默认',
  function(){
  setPbw('img/To/downloadfile.png');
  PBWfile(false,false);
  PoenPopTip('提示','修改成功');
  }},{
  name:'网络随机更新',
  function(){
  setTimeout(()=>{
  var resource;
  var SwitchTx=()=>{
  getdata('https://www.loliapi.com/acg/pc/',function (data){
  Dimg_presentation.src=data;
  resource=data;
  });}
  SwitchTx();
  wc.alertDialog(`<img id="Dimg_presentation"/>`,'网络随机更新',{
  name:'确认',
  function(){
  setPbw(resource);
  PBWfile(resource,true);
  }},{
  name:'切换',
  function(){
  SwitchTx();
  }
  });
  },0);
  }},{
  name:'从相册选取',
  function(){
  PDUfile.click();
  PDUfile.onchange=function (e){
  const file=this.files[0];
  const reader =new FileReader();
  reader.readAsDataURL(file);
  reader.onload=e=>{
  let call=file.type.split(/[/]/)[0];
  if(call=="image"){
  const  base=e.target.result;
  wc.alertDialog(`<img id="Dimg_presentation" src='${base}'/>`,'选取图片',{
  name:'确认',
  function(){
  setPbw(base);
  PBWfile(base,true);
  }});}else{
  PoenTip('只能选取图片!!!');
  }}}}},{
  name:'自定义链接',
  function(){
  setTimeout(()=>{
  wc.alertDialog(`
  <div class="Dink"><input type="text" id="Dinput" placeholder="点击输入"/>
  </div>`,'请输入图片链接地址',{
  name:'确认',
  function(){
  getdata(`${Dinput.value}`,function (data){
  setPbw(data);
  PBWfile(data,true);
  });
 }});
 },0);
 }
 }
]
];
//左侧边栏菜单
var smenuArr=[
  {
  name:'复制配文',
  function(){
  copyText(Famous.innerText);
  shutsmenu();
  PoenPopTip('提示','已复制到粘贴板');
    }
  },
{
  name:'切换配文',
  function(){
  Caption();
  shutsmenu();
  PoenPopTip('提示','切换成功');
    }
  },
{
  name:'切换配图',
  function(){
  RandomMG();
  shutsmenu();
    }
  },
   {
  name:'切换头像',
  function(){
  shutsmenu();
  fetch(`https://www.wudada.online/Api/SjTx`) .then(response => response.json()) .then(data=>{
  getdata(`${data.data}`,function (data){
  setPrp(data);
  Txfile(data,true);
   });
   });
    }
  },
 {
  name:'自定义配图',
  function(){
  shutsmenu();
  setTx.style.display='block';
  setTx.style.opacity=1;
  wc.optionDialog(this.textContent,Txarr[2]);
  //缩回页面
  setTx_Return.onclick=()=>{
  setTx.style.opacity=0;
  setTimeout(()=>{
  setTx.style.display='none';
  },500);
  }
  }
  }];
//Home更多选项
var homeArr=[
 {
  name:'切换封面',
  function(){
  shutsmenu();
  RandomTR();
    }
  },
{
  name:'自定义封面',
  function(){
  shutsmenu();
  wc.optionDialog(this.textContent,ChomeArr);
    }
  },
{
  name:'已添加的音乐列表',
  function(){
  shutsmenu();
  Musicadded_Eject();
    }
  },
];
var ChomeArr=[{
  name:'默认',
  function(){
  setTbr('img/To/topbg.jpeg');
  Tbrfile(false,false);
  PoenPopTip('提示','修改成功');
    }
  },{
  name:'随机配图',
  function(){
  setTimeout(()=>{
  var resource;
  var SwitchTx=()=>{
  getdata('https://www.dmoe.cc/random.php',function (data){
  Dimg_presentation.src=data;
  resource=data;
  });
  }
  SwitchTx();
  wc.alertDialog(`<img id="Dimg_presentation"/>`,'网络随机更新',{
  name:'确认',
  function(){
  setTbr(resource);
  Tbrfile(resource,true);
  }
  },{
  name:'切换',
  function(){
  SwitchTx();
  }
  });
  },0);
  }
  },{
  name:'从相册选取',
  function(){
  PDUfile.click();
  PDUfile.onchange=function (e){
  const file=this.files[0];
  const reader =new FileReader();
  reader.readAsDataURL(file);
  reader.onload=e=>{
  let call=file.type.split(/[/]/)[0];
  if(call=="image"){
  const  base=e.target.result;
  wc.alertDialog(`<img id="Dimg_presentation" src='${base}'/>`,'选取图片',{
  name:'确认',
  function(){
  setTbr(base);
  Tbrfile(base,true);
  }
  });
  }else{
  PoenPopTip('提示','只能选取图片!!!');
  }
 }
 }
  }
  },{
  name:'自定义链接',
  function(){
  setTimeout(()=>{
  wc.alertDialog(`
  <div class="Dink"><input type="text" id="Dinput" placeholder="点击输入"/>
  </div>`,'请输入图片链接地址',{
  name:'确认',
  function(){
  getdata(`${Dinput.value}`,function (data){
  setTbr(data);
  Tbrfile(data,true);
  });
  }
  });
  },0);
  }
  }
];
//保存顶栏封面文件
function Tbrfile(base,whth){
 PDUdata=arrNumber('PDU-data');
 PDUdata.LCstyle.Tbr=whth;
 autBonly('PDU-data',PDUdata);
 if(base && whth && webcat){
 PoenPopTip('提示','修改成功');
 webcat.delFile('酷我音乐/Tbrfile.txt');
 webcat.write('酷我音乐/Tbrfile.txt',base);
 }else{
 PoenPopTip('提示','修改失败');
 }
}
//保存头像文件
function Txfile(base,whth){
 PDUdata=arrNumber('PDU-data');
 PDUdata.LCstyle.tx=whth;
 autBonly('PDU-data',PDUdata);
 if(whth && webcat){
 PoenPopTip('提示','修改成功');
 webcat.delFile('酷我音乐/Txfile.txt');
 webcat.write('酷我音乐/Txfile.txt',base);
 }else{
 PoenPopTip('提示','修改失败');
 }
}
//保存个人背景墙文件
function PBWfile(base,whth){
 PDUdata=arrNumber('PDU-data');
 PDUdata.LCstyle.Pbw=whth;
 autBonly('PDU-data',PDUdata);
 if(whth && webcat){
 PoenPopTip('提示','修改成功');
 webcat.delFile('酷我音乐/PBWfile.txt');
 webcat.write('酷我音乐/PBWfile.txt',base);
 }else{
 PoenPopTip('提示','修改失败');
 }
}
//随机切换配图
function RandomTR(){
getdata(`https://www.dmoe.cc/random.php`,function (data){
  setTbr(data);
  Tbrfile(data,true);
 });
}
//随机切换配图
function RandomMG(){
getdata(`https://www.loliapi.com/acg/pc/`,function (data){
  setPbw(data);
  PBWfile(data,true);
 });
}
//配文
function Caption(){
if(navigator.onLine){
fetch('https://v1.hitokoto.cn/').then(response => response.json()).then(data => {
Famous.innerHTML=`<span>${data.hitokoto}</span></br><b>— —${data.from}</b>`;
 });
}else{
Famous.innerHTML=`<span>生活很苦给自己添颗糖</span></br><b>— —网络</b>`;
PoenPopTip('提示','网络开小差了...');
}
}