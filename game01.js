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

var tileMap;

var enemigos = [];

var escenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0],
  [0, 2, 2, 3, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function dibujaEscenario() {
  // var color;

  for (y = 0; y < 10; y++) {
    for (x = 0; x < 15; x++) {
      // if (escenario[y][x] == 0) color = muro;
      // if (escenario[y][x] == 1) color = puerta;
      // if (escenario[y][x] == 2) color = tierra;
      // if (escenario[y][x] == 3) color = llave;

      // ctx.fillStyle = color;
      // ctx.fillRect(x * anchoF, y * altoF, anchoF, altoF);

      var tile = escenario[y][x];
      ctx.drawImage(
        tileMap,
        tile * 32,
        0,
        32,
        32,
        anchoF * x,
        altoF * y,
        anchoF,
        altoF
      );
    }
  }
}

var enemigo = function (x, y) {
  this.x = x;
  this.y = y;

  this.direccion = Math.floor(Math.random() * 4);

  this.retraso = 50;
  this.fotograma = 0;

  this.dibujar = function () {
    ctx.drawImage(
      tileMap,
      0 * 32,
      1 * 32,
      32,
      32,
      this.x * anchoF,
      this.y * altoF,
      anchoF,
      altoF
    );
  };

  this.compruebaColision = function (x, y) {
    var colision = false;

    if (escenario[x][y] == 0) {
      colision = true;
    }
    return colision;
  };

  this.mueve = function () {
    protagonista.colisionEnemigo(this.x, this.y);

    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.contador = 0;

      //arriba
      if (this.direccion == 0) {
        if (this.compruebaColision(this.x, this.y - 1) == false) {
          this.y--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
      //abajo
      if (this.direccion == 1) {
        if (this.compruebaColision(this.x, this.y + 1) == false) {
          this.y++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
      //izquierda
      if (this.direccion == 2) {
        if (this.compruebaColision(this.x - 1, this.y) == false) {
          this.x--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
      //derecha
      if (this.direccion == 3) {
        if (this.compruebaColision(this.x + 1, this.y) == false) {
          this.x++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
    }
  };
};

var jugador = function () {
  this.x = 1;
  this.y = 1;
  this.color = "darkblue";
  this.llave = false;

  this.dibuja = function () {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF);

    // ctx.drawImage
    ctx.drawImage(
      tileMap,
      1 * 32,
      1 * 32,
      32,
      32,
      this.x * anchoF,
      this.y * altoF,
      anchoF,
      altoF
    );
  };

  this.colisionEnemigo = function (x, y) {
    if (this.x == x && this.y == y) {
      this.muerte();
    }
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
      this.logicaObjetos();
    }
  };
  this.abajo = function () {
    if (this.margenes(this.x, this.y + 1) == false) {
      this.y++;
      this.logicaObjetos();
    }
  };
  this.izquierda = function () {
    if (this.margenes(this.x - 1, this.y) == false) {
      this.x--;
      this.logicaObjetos();
    }
  };
  this.derecha = function () {
    if (this.margenes(this.x + 1, this.y) == false) {
      this.x++;
      this.logicaObjetos();
    }
  };

  this.victoria = function () {
    console.log("Has pasado al siguiente nivel");
    //reiniciar el juego
    this.x = 1;
    this.y = 1;
    this.llave = false;
    escenario[8][3] = 3;
  };

  this.muerte = function () {
    console.log("Has muerto");
    this.x = 1;
    this.y = 1;
    this.llave = false;
    escenario[8][3] = 3;
  };

  this.logicaObjetos = function () {
    //lo siguiente es para saber si el jugador tiene la llave
    var objeto = escenario[this.y][this.x];

    //si el objeto es una llave
    if (objeto == 3) {
      this.llave = true;
      escenario[this.y][this.x] = 2;
      console.log("Has obtenido la llave");
    }

    //si el objeto es una puerta
    if (objeto == 1) {
      if (this.llave == true) {
        this.victoria();
      } else {
        console.log("Te falta la llave, no puedes pasar");
      }
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

  tileMap = new Image();
  tileMap.src = "img/tilemap.png";

  //crear al jugador
  protagonista = new jugador();

  //crear enemigos
  enemigos.push(new enemigo(3, 7));
  enemigos.push(new enemigo(5, 7));
  enemigos.push(new enemigo(7, 7));

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

  for (i = 0; i < enemigos.length; i++) {
    enemigos[i].mueve();
    enemigos[i].dibujar();
  }
}
