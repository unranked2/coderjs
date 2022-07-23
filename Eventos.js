// Funciones
function conversorEscala(metros) {
    let resultado = metros * 40
    return resultado
}

function opciones(objeto, array) {
    const arrayOpciones = []
    for (objeto of array) {
        arrayOpciones.push(objeto.nombre)
    }
    console.log("arrayOpciones", arrayOpciones)
    return (arrayOpciones.join(" / "))
}

function mostrar(objeto, array, lego) {
    let info = ""
    for (objeto of array) {
        if (lego == objeto.id) {
            info = (`El ${objeto.nombre} (ID: ${objeto.id}):\nEste bloque mide ${objeto.ancho}mm x ${objeto.largo}mm, y tiene una altura de 10mm.`)
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

function crearNodo(padre,hijo,texto,clase){
    let element = document.getElementById(padre)
    let newNodo = document.createElement(hijo)
    newNodo.innerHTML=texto
    newNodo.className=clase
    element.append(newNodo)
}

// Funciones de eventos


// Construcción de objetos y arrays
class Lego {
    constructor(id, nombre, ancho, largo, alto) {
        this.id = id
        this.nombre = nombre
        this.ancho = ancho
        this.largo = largo
        this.alto = 10
    }
}

const legoBasics = [new Lego (1, "Lego 2x1", 16, 8), new Lego (2, "Lego 2x2", 16, 16), new Lego (3, "Lego 3x2", 24, 16), new Lego(4, "Lego 4x2", 32, 16), new Lego(5, "Lego 6x2", 48, 16),new Lego(6, "Lego 8x2", 64, 16)] 

class Colores {
    constructor(categoria, nombre) {
        this.categoria = categoria
        this.nombre = nombre
    }
}

const todosLosColores = [new Colores("Negro", "negro"), new Colores("Blanco", "blanco"), new Colores("Blanco", "transparente"), new Colores("Gris", "gris oscuro"), new Colores("Gris", "gris medio"), new Colores("Metal", "oro"), new Colores("Metal", "plata"), new Colores("Metal", "bronce"), new Colores("Azul", "azul marino"), new Colores("Azul", "azul oscuro"), new Colores("Azul", "petróleo"), new Colores("Azul", "celeste"), new Colores("Azul", "aqua"), new Colores("Rojo", "rojo"), new Colores("Rojo", "rojo oscuro"), new Colores("Rojo", "caoba"), new Colores("Rojo", "carmesí"), new Colores("Rojo", "rosa"), new Colores("Amarillo", "amarillo vibrante"), new Colores("Amarillo", "ocre"), new Colores("Amarillo", "narciso"), new Colores("Amarillo", "mostaza"), new Colores("Violeta", "violeta"), new Colores("Violeta", "lila"), new Colores("Violeta", "púrpura"), new Colores("Violeta", "magenta"), new Colores("Violeta", "lavanda"), new Colores("Verde", "verde"), new Colores("Verde", "verde claro"), new Colores("Verde", "verde oscuro"), new Colores("Verde", "lima"), new Colores("Verde", "oliva"), new Colores("Naranja", "naranja vibrante"), new Colores("Naranja", "coral"), new Colores("Marrón", "marrón"), new Colores("Marrón", "marrón oscuro"), new Colores("Marrón", "marrón claro"), new Colores("Marrón", "chocolate")]


// Variables globales

let nuevoAncho = 0
let nuevoAlto = 0
let nuevoLargo = 0
let legoElegido = 0
let confirmacion =`<id="confirmar">Quiero este LEGO!`

//Conversor de escalas
function eCalcular(e) {

    e.target.removeEventListener('click', eCalcular);

    const anchoReal = document.getElementById("ancho").value
    const altoReal = document.getElementById("alto").value
    const largoReal = document.getElementById("largo").value

    nuevoAncho = conversorEscala(anchoReal)
    nuevoAlto = conversorEscala(altoReal)
    nuevoLargo = conversorEscala(largoReal)

    let texto1=`Tu modelo será escalado a una medida de ${nuevoAncho} mm de ancho x ${nuevoAlto} mm de alto x ${nuevoLargo} mm de largo`
    crearNodo("div3","p",texto1,"subtexto")

    console.log("El evento eCalcular fue ejecutado")
}

document.getElementById("calcular").addEventListener('click', eCalcular);

//Selección y calculadora de legos
function eSelect(e){
    legoElegido = e.target.value;

    let texto2=`${(mostrar(Lego, legoBasics, legoElegido))}`
    crearNodo("div4","div",`<p id="info"></p>`)
    let nodoinfo=document.getElementById("info")
    nodoinfo.innerHTML=texto2
    nodoinfo.className="subtexto"

    setTimeout(()=>{
        let nodoConf = document.getElementById("confirmar")
        nodoConf.innerHTML=confirmacion
        nodoConf.className="btn btn-primary"
    },500)

    console.log("El evento eSelect fue ejecutado")

    document.getElementById("confirmar").addEventListener('click', eConfirmar);

}

function eOpciones(e){

    e.target.removeEventListener('click', eOpciones);

    let textoOpciones = `<select id="opcLego">\n<option>Elegí un LEGO®</option>\n<option value=1>Lego 2x1</option>\n<option value=2>Lego 2x2</option>\n<option value=3>Lego 3x2</option>\n<option value=4>Lego 4x2</option>\n<option value=5>Lego 6x2</option>\n<option value=6>Lego 8x2</option>\n</select>`
    crearNodo("div4","p",textoOpciones,"subtextoOpc")

    console.log("El evento eOpciones fue ejecutado")

    document.getElementById("opcLego").addEventListener('change', eSelect)
}

document.getElementById("elegirLego").addEventListener('click', eOpciones);

function eConfirmar (e){

    e.target.removeEventListener('click', eConfirmar)

    let lego = medida(Lego, legoBasics, legoElegido)
    const legoAncho = divisionFloor(nuevoAncho, lego)
    const legoAlto = divisionFloor(nuevoAlto, 10)
    const legoLargo = divisionFloor(nuevoLargo, lego)

    let totalLaterales = (legoAncho * legoAlto * 2) + (legoLargo * legoAlto * 2)
    let totalTecho = (medida2(Lego, legoBasics, legoElegido, nuevoLargo, divisionFloor) * legoAncho)
    
    let texto3=`Para construir tu modelo vas a necesitar:\n Aproximadamente ${totalLaterales} LEGO® para los laterales.\n Aproximadamente ${totalTecho} AZULEJOS LEGO® para el techo.\n\nTené en cuenta que para el suelo es necesario una BASE LEGO® y que si hay aberturas la cantidad de bloques será menor`

    if (document.getElementById("cantidadLegos") == null){
        crearNodo("div5","div",`<p id="cantidadLegos">${texto3}</p>`)
        document.getElementById("cantidadLegos").className="subtexto"
    }
    else {
        let nodoinfo=document.getElementById("cantidadLegos")
        nodoinfo.innerHTML=texto3
        nodoinfo.className="subtexto"
    }

    console.log("El evento eConfirmar fue ejecutado")
}

//Selección de colores
// setTimeout(()=>{

//     let miColor = prompt(`Elegí los colores de tu modelo LEGO®. Indicá el nombre de tu color deseado`)
//     miColor = miColor.toLowerCase()

//     let searchResults = todosLosColores.filter ((color) => ((color.nombre).toLowerCase() == miColor || (color.categoria).toLowerCase() == miColor))

//     while (searchResults.length == 0) {
//         miColor = prompt(`Color no encontrado :( Probá con otro color`)
//         miColor = miColor.toLowerCase()
//         searchResults = todosLosColores.filter ((color) => ((color.nombre).toLowerCase() == miColor || (color.categoria).toLowerCase() == miColor))
//     }

//     auxColores = []
//     for (let i = 0; i < searchResults.length; i++) { auxColores.push(searchResults[i].nombre) }

//     if (auxColores.length>1){
//         miColor = prompt(`¿Cuál de estos?\n ${auxColores.join(" | ")}`)
//         miColor = miColor.toLowerCase()
//         console.log("miColor",miColor)
//         while (!(auxColores.includes(miColor))){
//             miColor = prompt(`Color inválido. Elegí uno de los siguientes colores\n ${auxColores.join(" | ")}`)
//             miColor = miColor.toLowerCase()
//         }
//     }

//     let texto4=`Listo. Añadimos el ${miColor.toUpperCase()} a tu lista de colores deseados`
//     crearNodo("div3","p",texto4,"subtexto")


// }, 11200)