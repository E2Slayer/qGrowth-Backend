# qGrowth-Backend
The back-end of qGrowth project for Hoohacks2020, written in Javascript

## Prerequirements
* Node.js
* MongoDB or MongoDB Altas
* Express

## Install
### Clone the git repository
```
git clone https://github.com/E2Slayer/qGrowth-Backend.git
```

### Open a terminal, type
```
npm install -y
```

### Edit a port in ./common/config/env.config.js
```
"port": WRITE_YOUR_PORT
```
Originally, it would be "process.env.PORT" because this back-end will run in Heroku, 

so I have to let Herouku server decide the port instead of my custom port

### Edit the URI variable for the MongoDB connection

```
const uri =  EDIT_HERE
```
If you are using MongoDB, the connection uri looks like 
```
mongodb://localhost/
```
For MongoDB Atlas, it looks like 
```
mongodb+srv://<username>:<passowrd>@<server>.gcp.mongodb.net/test?retryWrites=true&w=majority'
```

### Now, start the server

```
npm start dev
```

If your server starts successfully, the log display like below

```
MongoDB connection with retry
app listening at port 3600
MongoDB is connected
```


