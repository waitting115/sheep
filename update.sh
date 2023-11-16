git pull

docker build -t hello .
docker stop sheep01
docker rm sheep01
docker run -d --name sheep01 -p 443:8080 hello

