#download what we needs
sudo apt install maven -y
sudo apt install npm -y
sudo apt install docker.io docker-compose -y
sudo apt update

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
sudo docker-compose up -d
sudo docker ps -a

