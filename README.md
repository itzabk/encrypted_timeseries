# encrypted_timeseries

#Problem Statement
Make a small backend application which can generate and emit an encrypted data stream over a socket, listens to incoming data stream on a socket, decrypts and decodes it, save to a time series db and then emit the saved data to a small frontend app. Backend services can be in any language (Node JS is preferred, but use Go or any other that you are comfortable with).

##Modules
1. Emitter Service
2. Listener Service
3. Frontend App

##git clone [repo_name]

##Listener Service Execution Steps:

1. cd config > https
2. Run command : openssl req -nodes -new -x509 -keyout server.key -out server.cert OR npm run gen-cred
3. cd to root
4. npm install
5. npm start or npm run dev

##Emitter Service Execution Steps:

1. npm install
2. npm start or npm run dev

##Frontend Service

1. npm start

###Listner .ENV Configuration
1. NODE_ENV = "dev"
2. MONGO_URI = 'your mongo_uri'
3. PORT = 3001
4. HASH_ALGO = 'sha256'
5. PASSPHRASE = 'yourpassphrase_key'

###Emitter .ENV Configuration
1. SERVER_URL = 'https://127.0.0.1:3001/er'
2. HASH_ALGO = 'sha256'
3. PASSPHRASE  = 'yourpassphrase_key'
4. MIN = 49
5. MAX = 499
6. TIME_IN_SEC = 10
