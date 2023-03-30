# demo_springboot_angular

in branch localDockerCompomseVersion

## Clone

```bash
sudo apt install git -y
```
```bash
git clone -b localDockerCompomseVersion https://github.com/tibame201020/demo_springboot_angular.git
```

## Installation

on the root path demo_springboot_angular/

run this command

#### if u don't have docker / docker compose
```bash
sh installDockerAndDockerCompose.sh
```
#### if u don't have maven / nodejs
```bash
sh installMavenAndNodeJs.sh
```

#### package and build image for docker compose use
```bash
sh script.sh
```

script.sh content

```shell
#generate back_end server img
cd back_end_springboot/
sudo mvn -DskipTests=true  clean package
sudo docker build -t backendspringboot .
cd ../

#generate front_end server img
cd front_end_angular/
sudo npm install
sudo npm run build -e=prod
sudo docker build -t front-img .

# run docker containers
cd ../
sudo docker compose up
```

## Web
 Oepen Browser to `http://localhost:4200/`

# external
#### use docker in wsl without docker desktop
https://github.com/tibame201020/wsl_dev_env
#### dockerImages
https://github.com/tibame201020/dockerImages
