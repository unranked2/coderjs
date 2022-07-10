// Funciones

function ingresoDeMedidas(array, i) {
    let entrada = (prompt(array[i]))
    while (isNaN(entrada)) {
        entrada = prompt(`El valor ingresado no es válido o no es numérico. ${array[i]}`)
    }
    return entrada
}

function conversorEscala(metros) {
    let resultado = metros * 40
    console.log(resultado);
    return resultado
}

function opciones(objeto, array) {
    const arrayOpciones = []
    for (objeto of array) {
        arrayOpciones.push(objeto.id + ". " + objeto.nombre)
    }
    console.log(arrayOpciones)
    return (arrayOpciones.join(`\n`))
}

function mostrar(objeto, array, lego) {
    let info = ""
    for (objeto of array) {
        if (lego == objeto.id) {
            info = (`Elegiste ${objeto.nombre}:\nEste bloque mide ${objeto.ancho}mm x ${objeto.largo}mm, y tiene una altura de 10mm. (ID: ${objeto.id})`)
        }
    }
    return info
}

function medida(objeto, array, opcion) {
    for (objeto of array) {
        if (opcion == objeto.id) {
            return (objeto.ancho)
        }
    }
}

function divisionFloor(dividendo, divisor) {
    let cociente = (dividendo / divisor)
    console.log(Math.floor(cociente));
    return (Math.floor(cociente))
}

function medida2(objeto, array, lego, ancho, divisionFloor) {
    let divisor
    for (objeto of array) {
        if (lego == objeto.id) {
            divisor = objeto.largo
        }
    }
    let cantidadLargo = divisionFloor(ancho, divisor)
    let cantidadLargoTotal

    for (let i = 0; i <= cantidadLargo; i++) {
        cantidadLargoTotal = cantidadLargo + (cantidadLargo - 1)
    }

    console.log("cantidadLargo: ", cantidadLargo)
    console.log("cantidadLargoTotal: ", cantidadLargoTotal)

    return cantidadLargoTotal
}

// Construcción de objetos y arrays
class Lego {
    constructor(id, nombre, ancho, largo) {
        this.id = id,
            this.nombre = nombre,
            this.ancho = ancho,
            this.largo = largo
    }
}

const legoBasic1 = new Lego(1, "Lego 2x1", 16, 8)
const legoBasic2 = new Lego(2, "Lego 2x2", 16, 16)
const legoBasic3 = new Lego(3, "Lego 3x2", 24, 16)
const legoBasic4 = new Lego(4, "Lego 4x2", 32, 16)
const legoBasic5 = new Lego(5, "Lego 6x2", 48, 16)
const legoBasic6 = new Lego(6, "Lego 8x2", 64, 16)

const legoBasics = [legoBasic1, legoBasic2, legoBasic3, legoBasic4, legoBasic5, legoBasic6]

// //Inicio y conversor de escalas
alert("Construí tu espacio deseado con legos. Calculá cuántos bloques necesitás para hacerlo.")

msg=["Ingresa el ancho real en metros. Para separar la parte decimal usa un punto.","Ingresa el alto real en metros. Para separar la parte decimal usa un punto.","Ingresa el largo real en metros. Para separar la parte decimal usa un punto."]  

const anchoReal = ingresoDeMedidas(msg,0)
const altoReal = ingresoDeMedidas(msg,1)
const largoReal = ingresoDeMedidas(msg,2)

const nuevoAncho = conversorEscala(anchoReal)
const nuevoAlto = conversorEscala(altoReal)
const nuevoLargo = conversorEscala(largoReal)

alert(`Su modelo será escalado a una medida de ${nuevoAncho} mm de ancho x ${nuevoAlto} mm de alto x ${nuevoLargo} mm de largo`)

// //Selección y calculadora de legos
let legoElegido = parseInt(prompt(`¿Cuál lego querés usar? (Ingresá el número correspondiente)\n${opciones(Lego, legoBasics)}`))

while ((legoElegido > 6) || isNaN(legoElegido)){
    legoElegido = parseInt(prompt(`La opción ingresada no es válida. Ingresá el número correspondiente a tu lego deseado\n${opciones(Lego, legoBasics)}`))
}

alert(mostrar(Lego, legoBasics, legoElegido))

let lego = medida(Lego, legoBasics, legoElegido)
console.log(legoElegido, lego)

const legoAncho = divisionFloor(nuevoAncho, lego)
const legoAlto = divisionFloor(nuevoAlto, 10)
const legoLargo = divisionFloor(nuevoLargo, lego)

let totalLaterales = (legoAncho * legoAlto * 2) + (legoLargo * legoAlto * 2)
console.log(totalLaterales)

let totalTecho = (medida2(Lego, legoBasics, legoElegido, nuevoLargo, divisionFloor) * legoAncho)
console.log(totalTecho, legoAncho)

alert(`Para construir tu modelo vas a necesitar:\n· Aproximadamente ${totalLaterales} legos para los laterales.\n· Aproximadamente ${totalTecho} legos azulejos para el techo.\n\nTené en cuenta que para el suelo es necesario una base lego y que si hay aberturas la cantidad de bloques será menor`)
