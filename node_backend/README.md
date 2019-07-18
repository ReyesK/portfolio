### Node Backend w/ Express

- runs on port 4000 by default
- create a .env file within the project root and set the following variables

```
NODE_BACKEND_ALLOWED_ORIGINS=http://dev.reykes.com:3000
```


### This project requires a database

Make sure [postgres](https://www.postgresql.org/) is installed

##### This project uses sequelize to manage the database

install [sequelize cli](https://github.com/sequelize/cli) globally and create the database

```
npm install -g sequelize-cli
```

The database config relies on the following ENV vars. set them in your .env file

```
NODE_BACKEND_DB_USER=reykes
NODE_BACKEND_DB_PASS=password
NODE_BACKEND_DB_NAME=reykes_dev
NODE_BACKEND_DB_HOST=127.0.0.1
```

##### Ensure your db user exists and has proper permissions

```
> psql

> CREATE ROLE reykes LOGIN CREATEDB PASSWORD 'password';
```
