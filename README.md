# p2p-json
Simple to use library the allows you to create layer-4 p2p network which supports json format.

## Usages
```
// Create new node
let node = new Node()

// Start server to listen to connections
node.start(PORT)

// Connect to another node
node.connect(IP_ADDRESS, PORT)

// Broadcast message on JSON format to nodes in the network
node.broadcast(JSON_DATA)

// Send a direction message to a specific node
node.direct(NODE_ID, JSON_DATA)

// Listen to when other node connect to the node
node.on('connect', ({ nodeId }) => {
  console.log(`${nodeId} has connected`);
});

// Listen to when peer nodes disconnected
node.on('disconnect', ({ nodeId }) => {
  console.log(`${nodeId} has disconnected`);
});

// Listen to messages that has been broadcast on the network and reach the node
node.on('broadcast', ({ origin, message }) => {
  console.log(`${origin} broadcasted ${message}`);
});

// Listen to messages that has been directly sent to the node
node.on('broadcast', ({ origin, message }) => {
  console.log(`${origin} sent ${messsage}`);
});

// Gracefully stop the node
node.stop()

```
