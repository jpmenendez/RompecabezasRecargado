var expect = chai.expect;

describe('Creación', function() {
    'use strict';

describe('Juego', function() {
    it('El Objeto Juego está definido', function(done) {
      if (!window.Juego){
        done(err);
      }
      else{
        done();
      }
    });
});

describe('Tamaño de la grilla', function() {
    it('La grilla tiene el tamaño correcto', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadDePiezasPorLado = 5;
      Juego.crearGrilla();
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Juego.grilla.length).to.equal(Juego.cantidadDePiezasPorLado);
      expect(Juego.grilla[0].length).to.equal(Juego.cantidadDePiezasPorLado);
    });
  });
});


describe('Posición Válida', function(){
  it('Chequea si la posición está dentro de la grilla', function(){
    expect(Juego.posicionValida(Juego.cantidadDePiezasPorLado - 1,0)).to.be.true;
    expect(Juego.posicionValida(0,Juego.cantidadDePiezasPorLado - 1)).to.be.true;
    expect(Juego.posicionValida(0,0)).to.be.true;
    expect(Juego.posicionValida(Juego.cantidadDePiezasPorLado,0)).to.be.false;
    expect(Juego.posicionValida(0,Juego.cantidadDePiezasPorLado)).to.be.false;
    expect(Juego.posicionValida(-1,0)).to.be.false;
    expect(Juego.posicionValida(0,-1)).to.be.false;

  })
})


describe('Chequear si ganó', function(){
  it('Chequea si el rompecabezas está en la posición ganadora sin haber mezclado las piezas', function(){
    expect(Juego.chequearSiGano()).to.be.true;

  })
})
