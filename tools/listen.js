const fs = require('fs');
const wsjtx = require('./wsjt-x-parser');
const out = fs.createWriteStream('decoded.log');

const dgram = require('node:dgram');
const server = dgram.createSocket({type:"udp4",reuseAddr:true});

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

BigInt.prototype.toJSON = function() {
  return this.toString(10);
}

server.on('message', (msg, rinfo) => {
  // console.log(`MSG: ${rinfo.address}:${rinfo.port}`);
  // console.log(`>> ${decoded.id}/${decoded.type}`);
  
  const decoded = wsjtx.decode(msg);
  const row = JSON.stringify(decoded);
  out.write(`${row}\n`);
  // switch (decoded.type) {
  //   case 'decode': {
  //     const row = JSON.stringify(decoded);
  //     out.write(`${row}\n`);
  //   }
  //   break;

  //   case 'heartbeat': {
  //     console.log('heart', JSON.stringify(decoded));
  //   }
  //   break;

  //   default:
  //     console.log('def', JSON.stringify(decoded));
  // }

  // console.log(decoded);

});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});


server.bind(2237, '0.0.0.0');
// server.bind(2240, '127.0.0.1');
