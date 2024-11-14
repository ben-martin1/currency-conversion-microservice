To run, install express and cors:

npm install express

npm install cors (possible to skip if just opening index.html)

Then run index.js:

npm run index.js

Then to test it, run index.html on the specified host as defined by origin in app.use(cors)
    
The request will print in the terminal running index.js, and the output will log in the web browser making the call. It will also be returned by the script calling the API.
