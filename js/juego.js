
// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Acá vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas está; en la posición ganadora
function chequearSiGano(){
  var contador = 1;
  for(var i = 0; i < grilla.length; i++) {
    for(var j = 0; j < grilla.length; j++) {
        if (grilla[i][j] == contador) {
          contador++;
        }
    }
  }
  if (contador === 10) {
    return true;
  }
}


// Muestra el cartel ganador
function mostrarCartelGanador(){
  alert("Ganaste!");
}


// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var aux = grilla[fila1][columna1];
  grilla[fila1][columna1] = grilla[fila2][columna2];
  grilla[fila2][columna2] = aux;

  var elementoChildPrimero  = document.getElementById(grilla[fila1][columna1]);
  var elementoChildSegundo  = document.getElementById(grilla[fila2][columna2]);
  var cloneChildPrimero = elementoChildPrimero.cloneNode();
  var cloneChildSegundo = elementoChildSegundo.cloneNode();

  var padre = elementoChildPrimero.parentNode;

  padre.replaceChild(cloneChildSegundo, elementoChildPrimero);
  padre.replaceChild(cloneChildPrimero, elementoChildSegundo);

}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}


// Para chequear si la posición está dentro de la grilla.
function posicionValida(fila, columna){
   if ( ((fila >= 0) && (fila <=2)) && ((columna >= 0) && (columna <= 2)) ) {
     return true;
   }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila - 1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila + 1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izquierda
  else if (direccion == 39) {
    nuevaColumnaPiezaVacia = posicionVacia.columna - 1;
    nuevaFilaPiezaVacia = posicionVacia.fila;

  }
  // Intercambia pieza blanca con la pieza que está a su derecha
  else if (direccion == 37) {
  //Completar
    nuevaColumnaPiezaVacia = posicionVacia.columna + 1;
    nuevaFilaPiezaVacia = posicionVacia.fila;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}

// Mezcla las piezas
function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

//Obtiene la tecla presionada y muestra el cartel si el rompecabezas está armado
function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();
        },500);
      }
      evento.preventDefault();
    }
  })
}

// Inicia el juego mezclando las piezas
function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}


iniciar();
