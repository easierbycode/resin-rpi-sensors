var Q       = require( 'q' );
var TSL2561 = require( 'sensor_tsl2561' );


var sense = new TSL2561();

var initSensor = Q.nfcall( sense.init );

module.exports = () => {
  var deferred = Q.defer();

  initSensor.then( ( err, val ) => {
    sense.getLux( ( err, luxVal ) => {
      if ( !err )  deferred.resolve( { lux:luxVal } )
    })
  });

  return deferred.promise;
}