# My actionhero Project

_visit [Actionhero](https://www.actionherojs.com) for more information_\
<br />
Departmental store management app.

## Setup:
### Installation
(assuming you have [node](http://nodejs.org/), [TypeScript](https://www.typescriptlang.org/), and NPM installed)

`npm install`

As actionhero uses redis server as common store and internal caching, follow this [guide](https://redis.io/topics/quickstart) to install redis in your machine.

### MongoDB
If you have not installed mongoDB in your system, please [install](https://docs.mongodb.com/v3.6/installation/) it. (Recommended version of mongoDB for this app is **3.6**).\
After installing mongoDB in your machine, you can use mongo-shell to setup the db and user:
```
$ mongo
mongo-shell> use your_db_name  //your command
mongo-shell> switched to your_db_name  // shell log
mongo-shell> db.createUser({user: "user_name",	pwd: "password", roles: ["dbAdmin"]})  // your command
mongo-shell> Successfully added user: { "user" : "user_name", "roles" : [ "dbAdmin" ] }  // shell log
```
### Environment
First copy the content of file `.env.format` to new file `.env`:
```
$ cp .env.format .env
```
Now in the env file replace the variable values according to your local setup\
e.g. In `.env` file apply the db setup info.
```
DB_USER="db_user_name"
DB_NAME="your_db_name"
DB_PASSWORD="db_password"
```

## To Run:
### Run Build (from ./dist)
`npm start`

### Dev
`npm run dev`

## To Test:

`npm test`
