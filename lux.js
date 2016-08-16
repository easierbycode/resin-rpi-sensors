var Q       = require( 'q' );
var TSL2561 = require( 'sensor_tsl2561' );


var sensor = new TSL2561();

var initSensor = Q.defer();
sensor.init( ( err, val ) => { if ( !err ) initSensor.resolve() })

module.exports = () => {
  var deferred = Q.defer();

  initSensor.promise.then( ( err, val ) => {
    sensor.getLux( ( err, luxVal ) => {
      if ( !err )  deferred.resolve( { lux:luxVal } )
    })
  });

  return deferred.promise;
}