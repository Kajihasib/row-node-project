// main app file
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const app = {};
app.config = {
  port: 3000,
};
app.requestHandler = app.createServer = () => {
  const server = http.createServer(handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`listening to server ${app.config.port} port`);
  });
};

app.createServer();
