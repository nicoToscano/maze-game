document.addEventListener("keydown", function (tecla) {
  //   console.log("You pressed a key!" + tecla.keyCode);

  if (tecla.keyCode == 32) {
    console.log("Espacio");
  }

  if (tecla.keyCode == 37) {
    console.log("Izquierda");
  }

  if (tecla.keyCode == 38) {
    console.log("Arriba");
  }

  if (tecla.keyCode == 39) {
    console.log("Derecha");
  }

  if (tecla.keyCode == 40) {
    console.log("Abajo");
  }
});
