var itDialog;
var dialogs=document.getElementsByClassName('Dialogs');
var wc=new class {
constructor(){
this.icon_size="45px";
this.theme_color="#0088ff";
this.warning_color="#ff005b";
}
//弹窗
alertDialog(content,title,Confirm,Other,icon){
  this.Dialog();
  this.window();
//头部
  this.WindowTop=document.createElement('div');
  this.WindowTop.style.width='100%';
  this.WindowTop.style.display='flex';
  this.WindowTop.style.height=this.icon_size;
//图标
  const ICON=icon||'appIcon.png';
  this.WindowTop_icon=document.createElement('div');
  this.WindowTop_icon.style.width=this.icon_size;
  this.WindowTop_icon.style.height=this.icon_size;
  this.WindowTop_icon.style.backgroundSize='100%';
  this.WindowTop_icon.style.backgroundImage=`url(${ICON})`;
  this.WindowTop.appendChild(this.WindowTop_icon);
//标题
  const TITLE=title||'提示';
  this.WindowTop_title=document.createElement('div');
  this.WindowTop_title.style.width='85%';
  this.WindowTop_title.style.margin='12px 5px';
  this.WindowTop_title.style.fontWeight=700;
  this.WindowTop_title.style.fontSize='20px';
  this.WindowTop_title.style.lineHeight='20px';
  this.WindowTop_title.style.overflow='hidden';
  this.WindowTop_title.style.whiteSpace='nowrap';
  this.WindowTop_title.style.color=this.theme_color;
  this.WindowTop_title.style.textOverflow='ellipsis';
  this.WindowTop_title.textContent=TITLE;
  this.WindowTop.appendChild(this.WindowTop_title);
  this.Window.appendChild(this.WindowTop);
//内容
  this.Window_content=document.createElement('div');
  this.Window_content.style.whiteSpace='pre';
  this.Window_content.style.overflowY='auto';
  this.Window_content.style.minHeight='90px';
  this.Window_content.style.maxHeight='70vh';
  this.Window_content.style.fontSize='15px';
  this.Window_content.style.margin='5px 5px 0 5px';
  if(content)this.Window_content.innerHTML=content;
  this.Window.appendChild(this.Window_content);
//按钮
  this.Window_buttons=document.createElement('div');
  this.Window_buttons.style.height='25px';
  this.Window_buttons.style.padding="1%";
//Confirm
  const confirm=document.createElement('button');
  confirm.style.float='right';
  confirm.style.height='100%';
  confirm.style.border='none';
  confirm.style.color='white';
  confirm.style.outline='none';
  confirm.style.minWidth='12%';
  confirm.style.backgroundColor=this.theme_color;
  if(Confirm && Confirm instanceof Object){
  const CONFIRM_name=Confirm.name||'确定';
  confirm.textContent=CONFIRM_name;
  confirm.onclick=()=>{
  if(typeof Confirm.function=="function" && Confirm['function']){
  Confirm.function();
  this.end(this.dialog);
  }else{
  this.end(this.dialog);
  }
  }
  }else{
  confirm.textContent="确定";
  confirm.onclick=()=>{
  this.end(this.dialog);
  }
  }
  this.Window_buttons.appendChild(confirm);
//Other
  if(Other && Other instanceof Object){
  const other=document.createElement('button');
  other.style.color='white';
  other.style.float='right';
  other.style.height='100%';
  other.style.border='none';
  other.style.outline='none';
  other.style.minWidth='12%';
  other.style.margin='0 1% 0 0';
  other.style.backgroundColor=this.warning_color;
  this.Window_buttons.appendChild(other);
  const OTHER_name=Other.name||'其他';
  other.textContent=OTHER_name;
  other.onclick=()=>{
  if(typeof Other.function=="function" && Other['function']){
  Other.function();
  }
  }
  }else{
  }
//取消
  const cancel=document.createElement('button');
  cancel.onclick=()=>{
  this.end(this.dialog);
  }
  cancel.textContent="取消";
  cancel.style.color='#666';
  cancel.style.float='right';
  cancel.style.height='100%';
  cancel.style.border='none';
  cancel.style.margin='0 1%';
  cancel.style.outline='none';
  cancel.style.minWidth='12%';
  cancel.style.border='0.8px solid #666';
  cancel.style.backgroundColor='Transparent';
  this.Window_buttons.appendChild(cancel);
  this.Window.appendChild(this.Window_buttons);
  }
//选项弹窗
optionDialog(title,content){
  this.Dialog();
  this.window();
  //标题
  this.Window_title=document.createElement('div');
  this.Window_title.style.width='85%';
  this.Window_title.style.fontWeight=700;
  this.Window_title.style.fontSize='20px';
  this.Window_title.style.lineHeight='20px';
  this.Window_title.style.overflow='hidden';
  this.Window_title.style.whiteSpace='nowrap';
  this.Window_title.style.padding='5% 5% 0 5%';
  this.Window_title.style.color=this.theme_color;
  this.Window_title.style.textOverflow='ellipsis';
  const TITLE=title||'选项弹窗';
  this.Window_title.textContent=TITLE;
  this.Window.appendChild(this.Window_title);
//内容
  this.Window_content=document.createElement('div');
  this.Window_content.style.whiteSpace='pre';
  this.Window_content.style.overflowY='auto';
  this.Window_content.style.minHeight='90px';
  this.Window_content.style.maxHeight='70vh';
  this.Window_content.style.fontSize='15px';
  this.Window_content.style.margin='5px 5px 0 5px';
  if(content && content instanceof Object){
  content.forEach((con)=>{
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
  if(con['function']){
  li.onclick=()=>{
  con.function();
  this.end(this.dialog);
   }
  }
  const li_text=document.createElement('span');
  li_text.style.color='#666';
  li_text.style.fontSize='15px';
  li_text.style.marginLeft='2%';
  li_text.textContent=con.name;
  li.appendChild(li_text);
  this.Window_content.appendChild(li);
    });
  }
  this.Window.appendChild(this.Window_content);
  }
Dialog(){
  this.dialog=document.createElement('dialog');
  itDialog=this.dialog;
  this.dialog.className="Dialogs";
  this.dialog.style.padding=0;
  this.dialog.style.opacity=0;
  this.dialog.onclick=()=>{
  this.end(this.dialog);
  }
  this.dialog.style.border='none';
  this.dialog.style.margin='auto';
  this.dialog.style.outline='none';
  this.dialog.style.transition='0.2s ease-in-out';
  this.dialog.style.transform='scale(0.9)';
  this.dialog.style.backgroundColor='Transparent';
  document.body.appendChild(itDialog);
  setTimeout(()=>{
  this.dialog.style.opacity=1;
  this.dialog.style.transform='scale(1)';
  },0);
  this.dialog.showModal();
  const style=document.createElement('style');
  style.innerHTML="#Dialog::backdrop{background-color:rgba(0,0,0,0.4); transition:0.3s ease-in-out;}";
  document.head.appendChild(style);
  }
//窗口
window(){
  this.Window=document.createElement('div');
  this.Window.style.zindex=999;
  this.Window.style.width='320px';
  this.Window.style.position='relative';
  this.Window.style.backgroundColor='#fff';
  this.Window.onclick=(e)=>e.stopPropagation();
  this.Window.setAttribute('onselectstart','return false');
  itDialog.appendChild(this.Window);
   }
end(it){
  it.style.opacity=0;
  it.style.transform='scale(0)';
  const style=document.createElement('style');
  style.innerHTML="#Dialog::backdrop{background-color:rgba(0,0,0,0);transition:0.3s ease-in-out;}";
  document.head.appendChild(style);
  setTimeout(()=>{
  it.remove();
  },300);
  }
}