var miCanvas;

function inicializar() {
  // Recuperamos el canvas
  miCanvas = document.querySelector("#canvas");
  // Establecemos el ancho y el alto del canvas
  miCanvas.width = 500;
  miCanvas.height = 300;
  // Establecemos el color de borde del canvas
  miCanvas.style.border = "2px solid black";
}

var personaje = function (x, y, nombre) {
  this.x = 0;
  this.y = 0;
  this.nombre = nombre;

  //metodo abajo
  this.abajo = function () {
    this.y += 10;
  };

  //metodo subir
  this.subir = function () {
    this.y -= 10;
  };

  //metodo derecha
  this.derecha = function () {
    this.x += 10;
  };

  //metodo izquierda
  this.izquierda = function () {
    this.x -= 10;
  };

  //metodo hablar
  this.hablar = function () {
    console.log("Hola, soy " + this.nombre);
  };
};

var personaje1 = new personaje(10, 100, "luis");
