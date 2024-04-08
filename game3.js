var configTeclado = { hola: true };

var eventoTeclado = new window.keypress.Listener(this, configTeclado);

function pulsaA() {
  console.log("pulsaste la tecla A");
}

function pulsaB() {
  console.log("pulsaste la tecla B");
}

function pulsaAB() {
  console.log("pulsaste la tecla A y B");
}

function comoboEspecial() {
  console.log("pulsaste la tecla A, B y C");
}

eventoTeclado.simple_combo("a", pulsaA);
eventoTeclado.simple_combo("b", pulsaB);

eventoTeclado.simple_combo("a b", pulsaAB);
eventoTeclado.sequence_combo("a b c", comoboEspecial);
