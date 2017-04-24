var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.Client(),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message'),
    payloads = [
        { topic: 'yesy', messages: 'hism', partition: 0 } 
    ];
producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});
 
producer.on('error', function (err) {})