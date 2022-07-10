

function conversorEscala(metros) {
    let resultado = metros * 40
    console.log(resultado);
    return resultado
}

function calcularLegos(medida, lego) {
    let cantLego = ~~(medida / lego)
    return cantLego
}

function calcularMedida(opcion) {
    while (opcion == 5 || opcion == 6) {
        if (opcion == 6) { opcion = opcion + 2; break }
        if (opcion == 5) { opcion = opcion + 1; break }
    }
    return (opcion * 8)
}

function techo(){
    let divisor
    if (legoElegido==1){
        divisor=8
    }
    else {
        divisor=16
    }

    let legosALoLargo=(nuevoLargo/divisor)
    let azulejosALoLargo

    for (let i=0; i<=legosALoLargo; i++){
        azulejosALoLargo=legosALoLargo+(legosALoLargo-1)
    }

    console.log("legosAloLargo: ", legosALoLargo)
    console.log("azulejosAloLargo: ", azulejosALoLargo)

    let totalTecho=azulejosALoLargo*legoAncho

    return totalTecho
}

//Inicio y conversor de escalas
alert("Costruí tu espacio deseado con legos. Calculá cuántos bloques necesitás para hacerlo.")

const anchoReal = parseFloat(prompt("Ingresa el ancho real en metros. Para separar la parte decimal usa un punto."))
const altoReal = parseFloat(prompt("Ingresa el alto real en metros. Para separar la parte decimal usa un punto."))
const largoReal = parseFloat(prompt("Ingresa el largo real en metros. Para separar la parte decimal usa un punto."))

const nuevoAncho = conversorEscala(anchoReal)
const nuevoAlto = conversorEscala(altoReal)
const nuevoLargo = conversorEscala(largoReal)

alert(`Su modelo será escalado a una medida de ${nuevoAncho} mm de ancho x ${nuevoAlto} mm de alto x ${nuevoLargo} mm de largo`)

//Selección y calculadora de legos
let legoElegido = parseInt(prompt("Escribe el número que corresponda al lego deseado para construir tu modelo a escala:\n 1) Lego 2x1 \n 2) Lego 2x2\n 3) Lego 2x3\n 4) Lego 2x4\n 5) Lego 2x6\n 6) Lego 2x8")
)

while (legoElegido > 6) {legoElegido = parseInt(prompt("La opción ingresada no es válida. Escribe el número que corresponda al lego deseado para construir tu modelo a escala:\n 1) Lego 2x1 \n 2) Lego 2x2\n 3) Lego 2x3\n 4) Lego 2x4\n 5) Lego 2x6\n 6) Lego 2x8"))
}

let lego = calcularMedida(legoElegido)
console.log(legoElegido, lego)

const legoAncho = calcularLegos(nuevoAncho, lego)
const legoAlto = calcularLegos(nuevoAlto, 10)
const legoLargo = calcularLegos(nuevoLargo, lego)

let totalLaterales = (legoAncho * legoAlto * 2) + (legoLargo * legoAlto * 2)
let totalTecho = techo()

alert(`Para construir los laterales de tu modelo necesitás un aproximado de ${totalLaterales} legos. Para el techo vas a necesitar ${totalTecho} bloques de azulejos aprox.\n(Tené en cuenta que para el suelo es necesario una base lego y que si hay aberturas la cantidad de bloques será menor)`)
