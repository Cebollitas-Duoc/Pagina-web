echo building
sudo docker build -t andresgroselj/turismoreal-webpage .

echo creating
sudo docker stop turismoreal-webpage
sudo docker container rm turismoreal-webpage
sudo docker create -it -p 8080:8080 --add-host host.docker.internal:host-gateway --name turismoreal-webpage andresgroselj/turismoreal-webpage