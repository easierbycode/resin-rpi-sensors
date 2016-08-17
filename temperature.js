var exec          = require('child_process').exec;
var Q             = require( 'q' );
var toFahrenheit  = require( './to-fahrenheit' );


var ONE_WIRE_ID = '28-0115b2316cff';

module.exports = () => {
  var deferred = Q.defer();

  exec( "cat /sys/bus/w1/devices/" + ONE_WIRE_ID + "/w1_slave | grep t= | cut -f2 -d= | awk '{print $1/1000}'", ( error, stdout, stderr ) => {
    var temp = toFahrenheit( stdout );

    deferred.resolve( { temperatureOneWire:temp } );
  });

  return deferred.promise;
}