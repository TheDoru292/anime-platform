const http = require("http");
const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();

const port = 5000;
app.set("port", port);

const indexRouter = require("./routes/index.js");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    success: false,
    error: err.status || 500,
  });
});

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

module.exports = app;
