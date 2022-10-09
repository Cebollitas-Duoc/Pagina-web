echo building
docker build -t andresgroselj/turismoreal-webpage .

echo creating
docker stop turismoreal-webpage
docker container rm turismoreal-webpage
docker create -it -p 8080:8080 --add-host host.docker.internal:host-gateway --name turismoreal-webpage andresgroselj/turismoreal-webpage