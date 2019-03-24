const express = require('express')
const os = require('os')
const app = express()
const PORT = 9000
const consoleLogger = require('./console-logger')

app.get('/', (req, res, next) => {
  res.send(JSON.stringify(os.networkInterfaces(), null, 2))
})

app.get('/ipv4', (req, res, next) => {
  var IPv4, hostName;
  hostName = os.hostname();
  for (var i = 0; i < os.networkInterfaces().eth0.length; i++) {
    if (os.networkInterfaces().eth0[i].family == 'IPv4') {
      IPv4 = os.networkInterfaces().eth0[i].address;
    }
  }
  res.send(`${IPv4}, ${hostName}`)
});

app.get('/delay', (req, res, next) => {
  let timeout = ((+req.query.timeout) || 10);
  let start = new Date()
  setTimeout(() => {
    res.json({
      start,
      end: new Date()
    })
  }, timeout * 1000)
})

const server = app.listen(PORT, err => {
  if (err) {
    consoleLogger.error(err)
  } else {
    consoleLogger.log(`Listening at http://localhost:${PORT}/`)
  }
})

process.on("SIGTERM", () => {
  consoleLogger.log("Process received 'SIGTERM'")
  server.close(() => {
    consoleLogger.log("Server graceful shutdown")
    process.exit(0)
  });
});
