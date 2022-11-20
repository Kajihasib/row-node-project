// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const { notFoundHandler } = require("../handlers/routes/notfound");
const helpers = {};

helpers.handleReqRes = (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const trimedPath = parseUrl.pathname.replace(/^\/|\/$/g, "");
  const queryStringObj = parseUrl.query;
  const method = req.method.toLowerCase();
  const headersObj = req.headers;

  const handlersObj = {
    parseUrl,
    trimedPath,
    queryStringObj,
    method,
    headersObj,
  };

  const choosenHandler = routes[trimedPath]
    ? routes[trimedPath]
    : notFoundHandler;

  choosenHandler(handlersObj, (statusCode, payload) => {
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};

    const payloadString = JSON.stringify(payload);
    res.writeHead(statusCode);
    res.end(payloadString);
  });

  let readBodyData = "";
  const decoder = new StringDecoder();
  req.on("data", (buffer) => {
    readBodyData += decoder.write(buffer);
  });
  req.on("end", () => {
    readBodyData += decoder.end();
  });
};
module.exports = helpers;
