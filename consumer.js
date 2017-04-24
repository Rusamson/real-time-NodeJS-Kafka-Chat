 var app = require('express')();
 var http = require('http').Server(app);
 var io = require('socket.io')(http);
 
 app.get('/', function(req, res) {
 	res.sendFile('E:/nodejs/app' + '/index.html');
 });
 
 io.on('connection', function(socket) {
 	console.log('a user connected');
 	socket.on('chat message', function(msg) {
 		io.emit('chat message', msg);
 		console.log('message: ' + msg);
 	});
 	socket.on('disconnect', function() {
 		console.log('user disconnected');
 	});
 });
 
 var kafka = require('kafka-node'),
 	Consumer = kafka.Consumer,
 	client = new kafka.Client(),
 	consumer = new Consumer(client, [{
 		topic: 'yesy',
 		partition: 0
 	}], {
 		autoCommit: false
 	});
 consumer.setOffset('test', 0, 0);
 consumer.on('message', function(message) {
 	io.emit('chat message', message.value);
 	console.log(message);
 });
 
 http.listen(3000, function() {
 	console.log('listening on *:3000');
 });