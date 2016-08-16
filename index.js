var extend          = require( 'util' )._extend;
var getLux          = require( './lux' );

// defaults to 10 minutes (600)
var sensorInterval  = process.env.SENSOR_INTERVAL || 10*60;


var readSensors = () => {
  var reading = {};

  Q.all([
    getLux()
  ]).then( ( results ) => {
    results.forEach( ( result ) => extend( reading, result ) );

    console.log( reading );
  });

  setTimeout( readSensors, sensorInterval * 1000 )
}


readSensors();