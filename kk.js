// Vamos a requerir del modulo que provee Node.js 
// llamado child_process
var exec = require('child_process').exec, child;
// Creamos la función y pasamos el string pwd 
// que será nuestro comando a ejecutar
child = exec('pwd',
// Pasamos los parámetros error, stdout la salida 
// que mostrara el comando
  function (error, stdout, stderr) {
    // Imprimimos en pantalla con console.log
    console.log(stdout);
    // controlamos el error
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});