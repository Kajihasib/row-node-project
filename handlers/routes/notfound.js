const handlers = {};
handlers.notFoundHandler = (dataHandlerObj, callback) => {
  console.log(dataHandlerObj);
  callback(200, {
    message: "Hello Notfound page",
  });
};
module.exports = handlers;
