clear
while true
do
clear
echo "更新日期2025年4月18日"
echo "请选择要安装的脚本。"
echo -e "\e[1;34m------------------\e[0m"
echo "1) Termux_Linux工具箱(旧)"
echo -e "\e[1;34m-------节点1--------\e[0m"
echo "2) Linux工具箱(本地运行)"
echo "3) Linux工具箱(在线运行)"
echo
echo -e "\e[1;34m-----节点2(推荐)-----\e[0m"
echo "4) Linux工具箱(本地运行)"
echo "5) Linux工具箱(在线运行)"
echo "提供者QQ:2738136724"
echo -e "\e[1;34m----------------\e[0m"
echo
echo "6) 本地运行(适合Termux)"
echo "0) 退出"
echo -e "\e[1;34m------------------\e[0m"
read -p "请选择:" menu
case $menu in
1) git clone https://gitee.com/nasyt/nasyt-linux-tool.git;bash nasyt-linux-tool/nasyt-linux-tool.sh;;
2) curl -o /bin/nasyt nasyt.class2.icu/shell/nasyt.sh;chmod 777 /usr/bin/nasyt;nasyt;;
3) bash -c "$(curl -L nasyt.class2.icu/shell/nasyt.sh)";;
4) curl -o /bin/nasyt linux.class2.icu/shell/nasyt.sh;chmod 777 /usr/bin/nasyt;nasyt;;
5) bash -c "$(curl -L linux.class2.icu/shell/nasyt.sh)";;
6) curl -o nasyt_linux_tool_v2.0.sh http://a2.loveiu.cn:5244/p/server/root/shell/nasyt_linux_tool_v2.0.sh?sign=yhSJlGRKagKzgtvsWinrnrwuxbjz4-OYcPbfc94oqLw=:0;bash nasyt_linux_tool_v2.0.sh;;
0) break;;
*) echo "";echo "无效的输入。";read -p "回车键返回。";;
esac
done