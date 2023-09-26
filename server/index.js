const app = require('express')();
const http = require('http').Server(app);
const influx_data = require('./influx_data');
const io = require('socket.io')(http);
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/data', (req, res) => {
    influx_data.queryData(res);
});


setInterval(function () {
    influx_data.queryDataSocket(io)
}, 5000);

io.on('connection', function (socket) {
    console.log('a user connected');
});

http.listen(port, () => {
    console.log(`Listening on *:${port}`);
})