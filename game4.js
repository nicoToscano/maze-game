var miCanvas;

function inicializar() {
  // Recuperamos el canvas
  miCanvas = document.querySelector("#canvas");
  // Establecemos el ancho y el alto del canvas
  miCanvas.width = 500;
  miCanvas.height = 300;
  // Establecemos el color de borde del canvas
  miCanvas.style.border = "2px solid black";

  miCanvas.addEventListener("mousedown", presionarMouse, false);
  miCanvas.addEventListener("mouseup", soltarMouse, false);
  miCanvas.addEventListener("mousemove", posicionMouse, false);
}

function presionarMouse(e) {
  console.log("Presionando el mouse");
}

function soltarMouse(e) {
  console.log("Soltando el mouse");
}

function posicionMouse(e) {
  var x = e.pageX - miCanvas.offsetLeft;
  var y = e.pageY - miCanvas.offsetTop;

  console.log("Posición del mouse: " + x + ", " + y);
}
