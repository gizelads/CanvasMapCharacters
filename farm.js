var vp = document.getElementById("countryside");
var papel = vp.getContext("2d");

document.addEventListener("keyup", moverCerdito);

var cantidad = aleatorio(1, 5);

var teclas = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};
var fondo = {url: "assets/tile.png", cargaOk: false};
var vaca = {url: "assets/vaca.png", cargaOk: false, x: new Array(), y: new Array()};
var pollo = {url: "assets/pollo.png", cargaOk: false, x: new Array(), y: new Array()};
var lobo = {url: "assets/lobo.png", cargaOk: false, x: aleatorio(0, 420), y: aleatorio(0, 420)};
var cerdo = {url: "assets/cerdo.png", cargaOk: false, x: aleatorio(0, 420), y: aleatorio(0, 420)};

fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener("load", cargarFondo);

vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener("load", cargarVacas);

pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener("load", cargarPollos);

lobo.imagen = new Image();
lobo.imagen.src = lobo.url;
lobo.imagen.addEventListener("load", cargarLobo);

cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener("load", cargarCerdito);

function cargarFondo() {
    fondo.cargaOk = true;
    dibujar();
}

function cargarVacas() {
    vaca.cargaOk = true;
    for(var v = 0; v < cantidad; v++) {
        var x = aleatorio(0, 5);    //500/80 = 6, se puede jugar con estos numeros para que las vacas no esten una encina de otra
        var y = aleatorio(0, 5);
        x = x * 80;
        y = y * 80;
        vaca.x[v] = x;
        vaca.y[v] = y;
    }
    dibujar();
}

function cargarPollos() {
    pollo.cargaOk = true;
    for(var p = 0; p < cantidad; p++) {
        var x = aleatorio(0, 420);    //0 - (500-80 = 420) para que el pollo no se salga del borde
        var y = aleatorio(0, 420);
        pollo.x[p] = x;
        pollo.y[p] = y;
    }
    dibujar();
}

function cargarLobo() {
    lobo.cargaOk = true;
    dibujar();
}

function cargarCerdito() {
    cerdo.cargaOk = true;
    dibujar();
}

function dibujar() {
    if (fondo.cargaOk /*== true*/) {
        dibujarFondo();
    }
    if (vaca.cargaOk) {
        dibujarVacas();
    }
    if (pollo.cargaOk) {
        dibujarPollos();
    }
    if (lobo.cargaOk) {
        dibujarLobo();
    }
    if (cerdo.cargaOk) {
        dibujarCerdito(cerdo.x, cerdo.y);     //dibujar una primera vez en los puntos iniciales aleatorios
    }
}

function dibujarFondo() {
    papel.drawImage(fondo.imagen, 0, 0);
}

function dibujarVacas() {
    for (var v = 0; v < cantidad; v++) {
        papel.drawImage(vaca.imagen, vaca.x[v], vaca.y[v]); 
    }
}

function dibujarPollos() {
    for (var p = 0; p < cantidad; p++) {
        papel.drawImage(pollo.imagen, pollo.x[p], pollo.y[p]);
    }
}

function dibujarLobo() {
    papel.drawImage(lobo.imagen, lobo.x, lobo.y);
}

function dibujarCerdito(xc, yc) {
    papel.drawImage(cerdo.imagen, xc, yc);
}

function moverCerdito(evento) {
    var movimiento = 40;
    switch (evento.keyCode) {
        case teclas.DOWN:
            dibujarFondo();
            dibujarVacas();
            dibujarPollos();
            dibujarLobo();
            dibujarCerdito(cerdo.x, cerdo.y + movimiento);
            cerdo.y = cerdo.y + movimiento;     //para guardar el punto anterior
        break;
        case teclas.UP:
            dibujarFondo();
            dibujarVacas();
            dibujarPollos();
            dibujarLobo();
            dibujarCerdito(cerdo.x, cerdo.y - movimiento);
            cerdo.y = cerdo.y - movimiento;
        break;
        case teclas.LEFT:
            dibujarFondo();
            dibujarVacas();
            dibujarPollos();
            dibujarLobo();
            dibujarCerdito(cerdo.x - movimiento, cerdo.y);
            cerdo.x = cerdo.x - movimiento;
        break;
        case teclas.RIGHT:
            dibujarFondo();
            dibujarVacas();
            dibujarPollos();
            dibujarLobo();
            dibujarCerdito(cerdo.x + movimiento, cerdo.y);
            cerdo.x = cerdo.x + movimiento;
        break;
        default:
            console.log("Otra tecla");
        break;
    }
}

function aleatorio(min, maxi) {
    var resultado;
    resultado = Math.floor(Math.random() * (maxi - min + 1)) + min;
    return resultado;
}