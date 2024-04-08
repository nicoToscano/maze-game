var canvas;
var ctx;
var fps = 50;

var anchoF = 50;
var altoF = 50;

var muro = "lightblue";
var puerta = "#3a1700";
var tierra = "white";
var llave = "#c6bc00";

var protagonista;

var escenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function dibujaEscenario() {
  var color;

  for (y = 0; y < 10; y++) {
    for (x = 0; x < 15; x++) {
      if (escenario[y][x] == 0) color = muro;
      if (escenario[y][x] == 1) color = puerta;
      if (escenario[y][x] == 2) color = tierra;
      if (escenario[y][x] == 3) color = llave;

      ctx.fillStyle = color;
      ctx.fillRect(x * anchoF, y * altoF, anchoF, altoF);
    }
  }
}

var jugador = function () {
  this.x = 1;
  this.y = 1;

  this.color = "darkblue";

  this.dibuja = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF);
  };

  this.margenes = function (x, y) {
    var colision = false;

    if (escenario[y][x] == 0) {
      colision = true;
    }
    return colision;
  };

  this.arriba = function () {
    if (this.margenes(this.x, this.y - 1) == false) {
      this.y--;
    }
  };
  this.abajo = function () {
    if (this.margenes(this.x, this.y + 1) == false) {
      this.y++;
    }
  };
  this.izquierda = function () {
    if (this.margenes(this.x - 1, this.y) == false) {
      this.x--;
    }
  };
  this.derecha = function () {
    if (this.margenes(this.x + 1, this.y) == false) {
      this.x++;
    }
  };

  //   this.arriba = function () {
  //     if (escenario[this.y - 1][this.x] != 0) {
  //       this.y--;
  //     }
  //   };
  //   this.abajo = function () {
  //     if (escenario[this.y + 1][this.x] != 0) {
  //       this.y++;
  //     }
  //   };
  //   this.izquierda = function () {
  //     if (escenario[this.y][this.x - 1] != 0) {
  //       this.x--;
  //     }
  //   };
  //   this.derecha = function () {
  //     if (escenario[this.y][this.x + 1] != 0) {
  //       this.x++;
  //     }
  //   };
};

function inicializar() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  //crear al jugador
  protagonista = new jugador();

  document.addEventListener("keydown", function (tecla) {
    //izquierda
    if (tecla.keyCode == 37) {
      protagonista.izquierda();
    }
    //arriba
    if (tecla.keyCode == 38) {
      protagonista.arriba();
    }
    //derecha
    if (tecla.keyCode == 39) {
      protagonista.derecha();
    }
    //abajo
    if (tecla.keyCode == 40) {
      protagonista.abajo();
    }
  });

  setInterval(function () {
    principal();
  }, 1000 / fps);
}

function borrarCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}

function principal() {
  borrarCanvas();

  dibujaEscenario();
  protagonista.dibuja();
}
