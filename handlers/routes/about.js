const handlers = {};

handlers.aboutHandler = (dataHandlerObj, callback) => {
  console.log(dataHandlerObj);
  callback(200, {
    message: "Hello about page",
  });
};

module.exports = handlers;
