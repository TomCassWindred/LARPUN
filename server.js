const hostname = "127.0.0.1";
const fallbackport = 3000;

const app = require("./app");
app.listen(process.env.PORT || fallbackport);
console.log("SERVER RUNNING");