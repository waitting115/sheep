# 基础镜像为node，版本为v9.2.0
FROM node:18

# 创建容器内的项目存放目录
RUN mkdir -p /app
WORKDIR /app

#  将Dockerfile当前目录下所有文件拷贝至容器内项目目录并安装项目依赖
COPY . /app
RUN npm install -g pnpm
RUN pnpm install

# 容器对外暴露的端口号，要和node项目配置的端口号一致
EXPOSE 7003

# 容器启动时执行的命令
CMD ["pnpm", "dev"]
