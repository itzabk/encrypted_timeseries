# encrypted_timeseries

#Problem Statement
Make a small backend application which can generate and emit an encrypted data stream over a socket, listens to incoming data stream on a socket, decrypts and decodes it, save to a time series db and then emit the saved data to a small frontend app. Backend services can be in any language (Node JS is preferred, but use Go or any other that you are comfortable with).

##Modules

1. Emitter Service
2. Listener Service
3. Frontend App

##git clone [repo_name]

##Listener Service Execution Steps:
1. cd config > mkdir https //create https folder inside config if not present
2. cd config > https //move to https folder
3. Run command : openssl req -nodes -new -x509 -keyout server.key -out server.cert //generate certificate and key
4. cd to root //move back to root
5. npm install //install deps
6. npm start or npm run dev //start project

##Emitter Service Execution Steps:

1. npm install //install deps
2. npm start or npm run dev //start project once listner is running

##Frontend Service

1. npm start //start react project

###Listner .ENV Configuration

1. NODE_ENV = "dev"
2. MONGO_URI = 'your mongo_uri'
3. PORT = 3001
4. HASH_ALGO = 'sha256'
5. PASSPHRASE = 'yourpassphrase_key'

###Emitter .ENV Configuration

1. SERVER_URL = 'https://127.0.0.1:3001/er'
2. HASH_ALGO = 'sha256'
3. PASSPHRASE = 'yourpassphrase_key'
4. MIN = 49
5. MAX = 499
6. TIME_IN_SEC = 10
