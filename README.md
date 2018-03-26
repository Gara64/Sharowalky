# Sharowalky


Share your pictures, steps and agenda with your friends, easily and securely.


### Install and run in dev mode


You can clone the app repository and install dependencies:

```sh
$ git clone https://github.com/cozy/Sharowalky.git
$ cd Sharowalky
$ yarn install
```

### Run it inside the VM

You can easily view your current running app, you can use the [cozy-stack docker image][cozy-stack-docker]:

```sh
# in a terminal, run your app in watch mode
yarn watch:browser
```

```sh
# in another terminal, run the docker container
# the db and storage folders are used to persist data in the app
# the --rm flag triggers the destruction of the docker container at the end of the execution, as it created each time this command is run.
# Add -p 5984:5984 to expose couchDB
docker run -it --rm \
    -p 8080:8080 \
    -p 8025:8025 \
    -v "$(pwd)/build":/data/cozy-app \
    -v "$(pwd)/db":/usr/local/couchdb/data \
    -v "$(pwd)/storage":/data/cozy-storage \
    cozy/cozy-app-dev

```
Your app is available at http://sharowalky.cozy.tools:8080.


If you need to go inside the docker container:
```sh
docker ps
docker exec -ti <container-id> /bin/bash
```

### Scripts

The script to download the google fit data:
```sh
python scripts/getfit.py
```

