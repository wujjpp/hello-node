const express = require('express')
const os = require('os')
const app = express()
const PORT = 9000

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


app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`server listening on ${PORT}`)
  }
})
