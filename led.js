var rootRef   = require( './db' ).rootRef();
var Gpio      = require( 'pigpio' ).Gpio;


var HW_LEVEL  = 'hwLevel1';
  blue        = new Gpio(16, {mode: Gpio.OUTPUT}),
  red         = new Gpio(26, {mode: Gpio.OUTPUT}),
  green       = new Gpio(12, {mode: Gpio.OUTPUT}),
  ledOff      = 255,
  ledOn       = 0,
  led2  = {
    blue  : new Gpio(13, {mode: Gpio.OUTPUT}),
    red   : new Gpio(5, {mode: Gpio.OUTPUT}),
    green : new Gpio(6, {mode: Gpio.OUTPUT}),
    allLedOff : function() {
      [led2.blue, led2.red, led2.green].forEach(( gpio ) => gpio.pwmWrite( ledOff ));
    }
  };

function allLedOff() {
  [blue, red, green].forEach(( gpio ) => gpio.pwmWrite( ledOff ));
}

module.exports = function() {
  rootRef.child( '.info/connected' ).on( 'value', ( connectedSnap ) => {
    
    console.log( "[CONNECTIVITY]\t we're ", connectedSnap.val() === true ? 'connected!' : 'disconnected!' );
    
    allLedOff();
    
    if ( connectedSnap.val() === true ) {
      led2.green.pwmWrite( ledOn );
    } else {
      /* we're disconnected! */
      led2.red.pwmWrite( ledOn );
    }
  });
  
  rootRef.child( `activeplants/${HW_LEVEL}/status` ).on( 'value', ( snapshot ) => {
    
    var plantState = snapshot.val();

    console.log( '[LED]\tvalue changed:', plantState );
    
    allLedOff();
    
    switch ( plantState ) {
      case 'GROWING':
        green.pwmWrite( ledOn );
        break;
      case 'STOPPED':
        red.pwmWrite( ledOn );
        break;
      default:
        blue.pwmWrite( ledOn );
    }

  });
}