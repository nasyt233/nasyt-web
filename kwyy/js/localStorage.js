var webcat;
//保存数据
function autBonly(name,data){
localStorage.setItem(name,JSON.stringify(data));
}
//获取数据
function arrNumber(name){
return JSON.parse(localStorage.getItem(name));
}
//获取文件数据
async function getdata(url,conFun){
let xhr = new XMLHttpRequest();
 xhr.open('GET',url, true);
 xhr.responseType = 'blob';
 xhr.onload = function () {
 if (this.status == 200) {
 let blob = this.response;
 let oFileReader = new FileReader()
 oFileReader.onloadend = function (e) {
 const base=e.target.result;
 if(conFun && typeof conFun=="function"){
   conFun(base);
  }
 }
 oFileReader.readAsDataURL(blob);
 }else{
  wc.alertDialog('获取失败');
 }
}
xhr.send();
}
//获取保存的文件
async function getfile(url,conFun){
const rawFile = new XMLHttpRequest();
rawFile.open("GET",url, true);
rawFile.onreadystatechange = function () {
if (rawFile.readyState === 4) {
if (rawFile.status === 200 || rawFile.status == 0) {
var data=rawFile.responseText;
if(conFun && typeof conFun=="function"){
  conFun(data);
  }
}else {
return {};
  }
 }
};
rawFile.send(null);
}
//复制文本到粘贴板
var copyText=(text)=>{
 const textarea = document.createElement('textarea');
 textarea.value = text;
 document.body.appendChild(textarea);
 textarea.select();
 document.execCommand('copy');
 document.body.removeChild(textarea);
};
//base64解码
function getDecode(base64String){
  const padding = base64String.length % 4 === 0 ? 0 : 4 - (base64String.length % 4);
  base64String += '='.repeat(padding);
  const binaryString = window.atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
}
