#!/bin/bash

# 准备要添加的全局变量
new_variables=(
  "DATABASE_HOST=3306"
  "DATABASE_USER=root"
  "DATABASE_PASSWORD=sheepcygg"
)

# 读取当前环境变量
current_variables=$(cat /etc/environment)

# 检查和更新环境变量
for variable in "${new_variables[@]}"; do
  key=$(echo "$variable" | cut -d '=' -f1)
  
  # 检查当前环境变量是否包含相同名称的变量
  if grep -q "^$key=" <<< "$current_variables"; then
    # 如果存在，则更新该变量
    sed -i "s/^$key=.*/$variable/" /etc/environment
  else
    # 如果不存在，则追加到文件末尾
    echo "$variable" | sudo tee -a /etc/environment
  fi
done

# 使新的环境变量立即生效
source /etc/environment

# 输出成功消息
echo '全局变量已添加或更新到服务器环境中。'
