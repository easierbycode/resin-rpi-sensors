var Q             = require( 'q' );
var sensorLib     = require( 'node-dht-sensor' );
var toFahrenheit  = require( './to-fahrenheit' );


var GPIO_PIN      = 17;

var sensorInit = Q.defer();
if ( sensorLib.initialize( 22, GPIO_PIN ) )  sensorInit.resolve();

module.exports = () => {
  var deferred = Q.defer();
  
  sensorInit.promise.then(() => {

    var readout = sensorLib.read();

    var reading = {
      temperature : toFahrenheit( readout.temperature ),
      humidity    : readout.humidity.toFixed( 2 )
    };

    deferred.resolve( reading );
  });

  return deferred.promise;
}