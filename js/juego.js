var Juego = {
  cantidadDePiezasPorLado: 3,
  // Acá vamos a ir guardando la posición vacía
  posicionVacia: {
    fila: 2,
    columna: 2
  },

}



// Crea la grilla según la cantidadDePiezasPorLado que tenga el rompecabezas
Juego.grilla = new Array(Juego.cantidadDePiezasPorLado); // Crea un array de longitud Juego.cantidadDePiezasPorLado

Juego.crearGrilla = function(){
  var contador = 0;
  for (var i = 0; i < this.cantidadDePiezasPorLado; i++) {
    this.grilla[i] = new Array(this.cantidadDePiezasPorLado); // Define cada elemento como una array de longitud Juego.cantidadDePiezasPorLado
    for (var j = 0; j < this.cantidadDePiezasPorLado; j++) {
      this.grilla[i][j] = contador + 1;
      contador += 1;
    }
  }
}


// Esta función va a chequear si el Rompecabezas está en la posición ganadora
Juego.chequearSiGano = function(){
  var contador = 1;
  for(var i = 0; i < this.grilla.length; i++) {
    for(var j = 0; j < this.grilla.length; j++) {
        if (this.grilla[i][j] == contador) {
          contador++;
        }
    }
  }
  return contador === (this.grilla.length * this.grilla.length) + 1;
}


// Muestra el cartel ganador
Juego.mostrarCartelGanador = function(){
  alert("Ganaste!");
}


// Intercambia posiciones grilla y en el DOM
Juego.intercambiarPosiciones = function(fila1, columna1, fila2, columna2){
  var aux = this.grilla[fila1][columna1];
  this.grilla[fila1][columna1] = this.grilla[fila2][columna2];
  this.grilla[fila2][columna2] = aux;

  var elementoChildPrimero  = document.getElementById(Juego.grilla[fila1][columna1]);
  var elementoChildSegundo  = document.getElementById(Juego.grilla[fila2][columna2]);

  var cloneChildPrimero = elementoChildPrimero.cloneNode();
  var cloneChildSegundo = elementoChildSegundo.cloneNode();

  var padre = elementoChildPrimero.parentNode;

  padre.replaceChild(cloneChildSegundo, elementoChildPrimero);
  padre.replaceChild(cloneChildPrimero, elementoChildSegundo);

}

// Actualiza la posición de la pieza vacía
Juego.actualizarPosicionVacia = function(nuevaFila,nuevaColumna){
  this.posicionVacia.fila = nuevaFila;
  this.posicionVacia.columna = nuevaColumna;
}


// Chequear si la posición está dentro de la grilla.
Juego.posicionValida = function(fila, columna){
   return (((fila >= 0) && (fila <=this.cantidadDePiezasPorLado - 1)) && ((columna >= 0) && (columna <= this.cantidadDePiezasPorLado - 1)))
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
Juego.moverEnDireccion = function (direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = this.posicionVacia.fila - 1;
    nuevaColumnaPiezaVacia = this.posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = this.posicionVacia.fila + 1;
    nuevaColumnaPiezaVacia = this.posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izquierda
  else if (direccion == 39) {
    nuevaColumnaPiezaVacia = this.posicionVacia.columna - 1;
    nuevaFilaPiezaVacia = this.posicionVacia.fila;

  }
  // Intercambia pieza blanca con la pieza que está a su derecha
  else if (direccion == 37) {
  nuevaColumnaPiezaVacia = this.posicionVacia.columna + 1;
  nuevaFilaPiezaVacia = this.posicionVacia.fila;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (this.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    this.intercambiarPosiciones(this.posicionVacia.fila, this.posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    this.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}


//Obtiene la tecla presionada y muestra el cartel si el rompecabezas está armado
Juego.capturarTeclas = function(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      Juego.moverEnDireccion(evento.which);

      var gano = Juego.chequearSiGano();
      if(gano){
        setTimeout(function(){
          Juego.mostrarCartelGanador();
        },500);
      }
      evento.preventDefault();
    }
  })
}

// Mezcla las piezas
Juego.mezclarPiezas = function(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  this.moverEnDireccion(direccion);

  setTimeout(function(){
    Juego.mezclarPiezas(veces-1);
  },100);
}

// Inicia el juego mezclando las piezas
Juego.iniciar = function(){
  this.crearGrilla();
  this.mezclarPiezas(60);
  this.capturarTeclas();
}


Juego.iniciar();
