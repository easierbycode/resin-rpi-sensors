require( 'dotenv' ).config();

var firebase      = require( 'firebase' );
var moment        = require( 'moment' );


var firebaseUid   = process.env.FIREBASE_UID;

var mainApp = firebase.initializeApp({
  serviceAccount: "./service-account-credentials.json",
  databaseURL: "https://scorching-heat-5557.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: firebaseUid
  }
});

exports.historical = function() {
  var m             = moment.utc();
  var utcDate       = m.format( 'YYYY/MM/DD/HH/mm' );
  return mainApp.database().ref( '/historicalSensorData/' + firebaseUid + '/' + utcDate );
}

exports.latest = function() {
  return mainApp.database().ref( '/members/' + firebaseUid + '/latestSensorData' );
}

exports.rootRef = function() {
  return mainApp.database().ref( '/members/' + firebaseUid );
}