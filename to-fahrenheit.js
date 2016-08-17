module.exports = function toFahrenheit( c ) {
  var c = parseFloat( c );
  return (c * 9 / 5 + 32).toFixed( 2 );
}