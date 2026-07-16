//保存数据
function autBonly(name,data){
localStorage.setItem(name,JSON.stringify(data));
}
//获取数据
function arrNumber(name){
return JSON.parse(localStorage.getItem(name));
}