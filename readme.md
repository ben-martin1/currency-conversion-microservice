to run, install express and cors:
npm install express
npm install cors (possible to skip if just opening index.html)
then run index.js:
npm run index.js
then test it, you have two choices:
    run index.html on the specified host as defined by origin in app.use(cors)
    just open index.html

if you just want to test the sample call just by opening index.html, you likely don't need cors, but i was running into issues without it while making api calls from a react-hosted app