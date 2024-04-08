var fps = 10;
var xEscenario = (escenario = 0);

function atacar() {
  console.log("Atacando");
}

function mueveEscenario() {
  xEscenario++;
  console.log(xEscenario);
}

function principal() {
  mueveEscenario();
}

setInterval(principal, 1000 / fps);
