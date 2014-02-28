//podemos evitar el module, ya que es nuestro global
exports.enviarMensaje = function(mensaje) {
    console.log('Mensaje recibido en módulo foo: ' + mensaje);
};
