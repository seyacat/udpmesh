const dotevn = require('dotenv');
const UDP = require('dgram');
const server = UDP.createSocket('udp4');
let ready = false;
dotevn.config();

const port = 4000;
const nodes = [
  { ip: '127.0.0.1', port },
  { ip: '127.0.0.1', port: port + 1 },
];

server.on('listening', () => {
  // Server address it’s using to listen
  const address = server.address();

  console.log(
    'Listening to ',
    'Address: ',
    address.address,
    'Port: ',
    address.port
  );
});

server.on('message', (message, info) => {
  console.log('Message:', message.toString(), info);
  const response = Buffer.from('Message Received');
  //sending back response to client
  /*server.send(response, info.port, info.address, (err) => {
    if (err) {
      console.error('Failed to send response !!');
    } else {
      console.log('Response send Successfully');
    }
  });*/
});

server.on('error', (err) => {
  console.log('Error: ', err);
  if(err.code == 'EADDRINUSE') {
    start(port + 1);
  }
});

setInterval(() => {
  if (!ready) return;
  for (node of nodes) {
    server.send('alive', node.port, node.ip, (err) => {});
  }
}, 5000);

const start = (port) => {
  //try {
    console.log({ port });
    server.bind(port, null, () => {
       ready = true;
      console.log(`listening on ${port}`);
    });
  /*} catch (e) {
    console.log(e);
    start(port + 1);
  }*/
};

console.log({ port });
start(port);
