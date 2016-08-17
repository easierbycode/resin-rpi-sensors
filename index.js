var extend          = require( 'util' )._extend;
var getHumidity     = require( './humidity' );
var getLux          = require( './lux' );
var getTemperature  = require( './temperature' );
var Q               = require( 'q' );

// defaults to 10 minutes (600)
var sensorInterval  = process.env.SENSOR_INTERVAL || 10*60;


var readSensors = () => {
  var reading = {};

  Q.all([
    getHumidity(),
    getLux(),
    getTemperature()
  ]).then( ( results ) => {
    results.forEach( ( result ) => extend( reading, result ) );

    console.log( reading );
  });

  setTimeout( readSensors, sensorInterval * 1000 )
}


readSensors();