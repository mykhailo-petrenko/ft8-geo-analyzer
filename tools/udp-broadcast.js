const IN = 2237;
const OUT = [2238, 2239, 2240];

const HOST = '127.0.0.1';

const dgram = require('node:dgram');

const inServer = dgram.createSocket({type:"udp4", reuseAddr: true});
const client = dgram.createSocket('udp4');

inServer.on('message', (msg, rinfo) => {
  for (const port of OUT) {
    client.send(msg, port, HOST);
  }
});


inServer.bind(IN, HOST);