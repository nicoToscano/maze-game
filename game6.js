var canvas;
var ctx;
var fps = 60;

var imgMega;

function inicializar() {
  //seleccionamos el canvas
  canvas = document.querySelector("#canvas");
  //lo siquiguiente hace que el canvas se adapte al tamaño de la ventana
  ctx = canvas.getContext("2d");

  //Cargar imagen
  imgMega = new Image();
  imgMega.src = "img/mega.jpg";
  imgMega.width = 100;
  imgMega.height = 100;

  setInterval(function () {
    principal();
  }, 1000) / fps;
}

var jugador = function (x, y) {
  this.x = x;
  this.y = y;
  this.velocidad = 10;

  this.dibuja = function () {
    ctx.drawImage(imgMega, this.x, this.y);
  };

  this.izquierda = function () {
    this.x -= this.velocidad;
  };
  this.arriba = function () {
    this.y -= this.velocidad;
  };
  this.derecha = function () {
    this.x += this.velocidad;
  };
  this.abajo = function () {
    this.y += this.velocidad;
  };
};

//creamos la clase personaje
var personaje = function (x, y) {
  //propiedades del personaje
  this.x = x;
  this.y = y;
  this.derecha = true;
  this.dibuja = function () {
    ctx.fillStyle = "lightblue";
    //dibujamos un rectangulo donde x e y son las coordenadas y 50, 50 son el tamaño del rectangulo
    ctx.fillRect(this.x, this.y, 50, 50);
  };
  this.mueve = function (velocidad) {
    if (this.derecha) {
      if (this.x < 400) {
        this.x += velocidad;
      } else {
        this.derecha = false;
      }
    } else {
      //el siguiente codigo hace que el personaje se mueva a la izquierda y cuando llega al limite de la pantalla cambia de direccion
      if (this.x > 50) {
        this.x -= velocidad;
      } else {
        this.derecha = true;
      }
    }
  };
};

//instanciamos los personajes
var personaje1 = new personaje(10, 50);
var personaje2 = new personaje(10, 125);
var personaje3 = new personaje(0, 200);

var jugador = new jugador(200, 200);

document.addEventListener("keydown", function (tecla) {
  //console.log(tecla.keyCode);
  //izquierda
  if (tecla.keyCode == 37) {
    jugador.izquierda();
  }
  //arriba
  if (tecla.keyCode == 38) {
    jugador.arriba();
  }
  //derecha
  if (tecla.keyCode == 39) {
    jugador.derecha();
  }
  //abajo
  if (tecla.keyCode == 40) {
    jugador.abajo();
  }
});

function borrarCanvas() {
  canvas.width = 500;
  canvas.height = 300;
}

function principal() {
  //borramos el canvas
  borrarCanvas();
  //dibujamos los personajes
  personaje1.dibuja();
  personaje2.dibuja();
  personaje3.dibuja();

  personaje1.mueve(1);
  personaje2.mueve(3);
  personaje3.mueve(7);

  jugador.dibuja();

  console.log("function");
}
