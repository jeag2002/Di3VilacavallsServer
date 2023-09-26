const Influx = require('influx');


const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'telegraf',
    username: 'test',
    password: 'Gur161ka',
    schema: [
        {
            measurement: 'telegraf_2',
            fields: {
                abricard: Influx.FieldType.FLOAT,
                carda3lg: Influx.FieldType.FLOAT,
                carda3m: Influx.FieldType.FLOAT,
                feltradora: Influx.FieldType.FLOAT,
                estricadora: Influx.FieldType.FLOAT,
                rameta: Influx.FieldType.FLOAT
            },
            tags: [
                'host'
            ]
        }
    ]
})

function queryData(res) {

    influx.query(`select * from telegraf_2 order by time asc limit 10`).then(result => {
        console.log("influxdb = " + JSON.stringify(result[2]));
        res.send(JSON.stringify(result[2]));
    }).catch(err => {
        console.log("data " + err);
    })
}

function queryDataSocket(io) {

    influx.query(`select * from telegraf_2 order by time asc limit 10`).then(result => {
        console.log("influxdb = " + JSON.stringify(result[2]));
        io.sockets.emit('influx', JSON.stringify(result[2]));

    }).catch(err => {
        console.log("data " + err);
    })
}



module.exports = {
    queryData,
    queryDataSocket
};









