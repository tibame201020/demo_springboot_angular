sudo apt update -y
sudo apt-get update -y
sudo apt install curl -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo apt-get update && sudo apt-get install docker-compose-plugin -y
