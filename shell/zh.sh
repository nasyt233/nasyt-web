#!/bin/bash

# 检查是否以root权限运行
if [ "$EUID" -ne 0 ]; then
  echo "请以root权限运行此脚本（例如使用sudo）。"
  exit 1
fi

# 更新软件包列表
echo "更新软件包列表..."
apt update

# 安装中文语言包（以简体中文为例）
echo "安装简体中文语言包..."
apt install -y language-pack-zh-hans

# 生成并配置区域设置
echo "生成并配置区域设置..."

# 设置系统区域为简体中文
locale-gen zh_CN.UTF-8
update-locale LANG=zh_CN.UTF-8

# 设置默认语言环境
echo "设置默认语言环境..."
echo "LANG=zh_CN.UTF-8" > /etc/default/locale

# 更新系统语言环境
echo "更新系统语言环境..."
source /etc/default/locale

# 重启相关服务以应用更改
echo "重启相关服务以应用更改..."
systemctl restart systemd-logind.service

echo "系统语言已更改为中文（简体）。请重新登录以使更改生效。"