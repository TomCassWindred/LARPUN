const hostname = "127.0.0.1";
const port = 3000;

app = require("./app");
app.listen(port);
console.log("SERVER RUNNING AT: "+hostname+":"+port);