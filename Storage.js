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
            info = (`Elegiste el ${objeto.nombre} (ID: ${objeto.id}):\nEste bloque mide ${objeto.ancho}x${objeto.largo}mm, y tiene una altura de 10mm.`)
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

function cargarColores() {
    for (let i in auxColores) {
        let textocolor = `<option value=${auxColores[i]}>${auxColores[i]}</option>`
        let color = document.getElementById('colorElegido')
        color.innerHTML += textocolor
    }
}

function crearNodo(padre, hijo, texto, clase) {
    let element = document.getElementById(padre)
    let newNodo = document.createElement(hijo)
    newNodo.innerHTML = texto
    newNodo.className = clase
    element.append(newNodo)
}

function actualizar() {
    location.reload();
    contador+=1
}

// Funciones de eventos
function eCalcular() {

    const anchoReal = document.getElementById("ancho").value
    const altoReal = document.getElementById("alto").value
    const largoReal = document.getElementById("largo").value

    while ((anchoReal <= 0) || (altoReal <= 0) || (largoReal <= 0) || ((anchoReal.length) == '') || ((altoReal.length) == '') || ((largoReal.length) == '')) {
        let texto1 = `El valor ingresado no es correcto. Ingresá un número.<br>Para separar la parte decimal usa un punto`
        document.getElementById("ingresa").innerHTML = texto1
        document.getElementById("ingresa").style.color = "orange";

        anchoReal = document.getElementById("ancho").value
        altoReal = document.getElementById("alto").value
        largoReal = document.getElementById("largo").value

    }

    localStorage.setItem('anchovalue',anchoReal);
    localStorage.setItem('altovalue', altoReal);
    localStorage.setItem('largovalue', largoReal);

    nuevoAncho = conversorEscala(anchoReal)
    nuevoAlto = conversorEscala(altoReal)
    nuevoLargo = conversorEscala(largoReal)

    document.getElementById("descubri").style.opacity = "40%";
    document.getElementById("paso1").style.display = "none";

    let texto1 = `Las medidas de tu modelo serán:<br>${nuevoAncho}mm de ancho, ${nuevoAlto}mm de alto y ${nuevoLargo}mm de largo`
    crearNodo("resultado1", "p", `<p id="resultCalcular"></p>`, "resultados")
    let nodoinfo = document.getElementById("resultCalcular")
    nodoinfo.innerHTML = texto1

    localStorage.setItem('medidasdelmodelo', texto1);

    document.getElementById("opcLego").removeAttribute('disabled')
    console.log("El evento eCalcular fue ejecutado")
}

function eSelect(e) {

    legoElegido = e.target.value;

    let texto2 = `${(mostrar(Lego, legoBasics, legoElegido))}`
    crearNodo("selector1", "div", `<p id="info"></p>`, "resultados")
    let nodoinfo = document.getElementById("info")
    nodoinfo.innerHTML = texto2

    console.log("El evento eSelect fue ejecutado")

    document.getElementById("confirmar").removeAttribute('disabled')
    document.getElementById("confirmar").addEventListener('click', eConfirmar);

    localStorage.setItem('datoslego', texto2);

}

function eConfirmar(e) {

    let lego = medida(Lego, legoBasics, legoElegido)
    const legoAncho = divisionFloor(nuevoAncho, lego)
    const legoAlto = divisionFloor(nuevoAlto, 10)
    const legoLargo = divisionFloor(nuevoLargo, lego)

    let totalLaterales = (legoAncho * legoAlto * 2) + (legoLargo * legoAlto * 2)
    let totalTecho = (medida2(Lego, legoBasics, legoElegido, nuevoLargo, divisionFloor) * legoAncho)

    document.getElementById("paso2").style.display = "none";
    document.getElementById("volver").style.visibility = "visible";

    let texto3 = `Vas a necesitar aproximadamente ${totalLaterales} piezas para los laterales y ${totalTecho} para el techo. Para el suelo es necesario una BASE LEGO®.`
    crearNodo("resultado2", "p", `<p id="resultElegir"></p>`, "resultados")
    let nodoinfo = document.getElementById("resultElegir")
    nodoinfo.innerHTML = texto3

    console.log("El evento eConfirmar fue ejecutado")

    document.getElementById("fin").style.visibility = "visible";

    localStorage.setItem('infototal', texto3);
}

function eVolver(e) {

    e.target.removeEventListener('click', eVolver)

    document.getElementById("volver").style.visibility = "hidden";

    document.getElementById("paso1").style.display = "block";
    document.getElementById("paso2").style.display = "block";
    
    document.getElementById("fin").style.visibility = "hidden";

    console.log("El evento eVolver fue ejecutado")

    localStorage.clear();
}

function eFinalizar(e) {

    e.target.removeEventListener('click', eFinalizar)


    document.getElementById("fin").remove()
    crearNodo("resultado2", "div", `<p id="fc"><hr>Felicitaciones, ya podés armar tu modelo</p>`, "textofin")

    document.getElementById("volver").style.visibility = "hidden";

    console.log("El evento eFinalizar fue ejecutado")

    setTimeout(() => {
        document.getElementById("guardarOno").style.visibility = "visible";
    }, 500)

}

function eRefresh() {
    let f5 = document.getElementById("refresh")
    f5.onclick = actualizar()
}

function eGuardar(e) {
    document.getElementById("caja1").style.display = "none";
    document.getElementById("caja2").style.display = "block";
}

function eRegistrarModelo() {

    const nombreProt = document.getElementById("coleccion").value
    const descripcionProt = document.getElementById("descripcion").value

    while (((nombreProt.length) == '') || ((descripcionProt.length) == '')) {
        let texto1 = `Por favor ingrese nombre y descripción`
        document.getElementById("error").innerHTML = texto1
        document.getElementById("error").style.color = "orange";

        nombreProt = document.getElementById("coleccion").value
        descripcionProt = document.getElementById("descripcion").value

    }
    document.getElementById("error").remove()

    localStorage.setItem('nombreprotvalue', nombreProt);
    localStorage.setItem('descripcionprotvalue', descripcionProt);

    // let miColor=""
    // const colorElegido = document.getElementById("colorElegido")
    // colorElegido.addEventListener('change', (e) => {
    //     miColor= e.target.value
    //     localStorage.setItem('color', miColor)
    // })

    document.getElementById("archiva").style.opacity = "40%";
    document.getElementById("inputs2").style.display = "none";

    document.getElementById("guardarProt").remove()
    crearNodo("boton3", "p", `<hr>Añadiste un nuevo modelo a tu colección!`, "textofin")

    crearNodo("boton3", "div", `<button class="btn btn-primary" id="vercoleccion3">Ver colección</button>`, "col")
    document.getElementById("vercoleccion3").addEventListener('click', eVerColec);

}

function eVerColec() {
    document.getElementById("caja1").style.display = "none";
    document.getElementById("caja2").style.display = "none";
    document.getElementById("caja3").style.display = "block";

    let textoModelo = `<em><br>${localStorage.getItem("descripcionprotvalue")}<br>Ancho: ${localStorage.getItem('anchovalue')}mts | Alto: ${localStorage.getItem('altovalue')}mts | Largo: ${localStorage.getItem('largovalue')}mts</em><br><br>${localStorage.getItem('medidasdelmodelo')}<br>${localStorage.getItem('datoslego')}<br>${localStorage.getItem('infototal')}`

    crearNodo("coleccionados", "details", `<summary>${(localStorage.getItem("nombreprotvalue"))}</summary><p class="resultados2">${textoModelo}</p>`, "tituloMod")

    //Resolver que no se sobreescriban los datos!

    document.getElementById("recargar").addEventListener('click',eRepetir)
}

function eRepetir() {
    location.reload(true);
}

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

const legoBasics = [new Lego(1, "Lego 2x1", 16, 8), new Lego(2, "Lego 2x2", 16, 16), new Lego(3, "Lego 3x2", 24, 16), new Lego(4, "Lego 4x2", 32, 16), new Lego(5, "Lego 6x2", 48, 16), new Lego(6, "Lego 8x2", 64, 16)]

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
let contador = 0

//Conversor de escalas
document.getElementById("calcular").addEventListener('click', eCalcular);

//Selección y calculadora de legos
document.getElementById("opcLego").addEventListener('change', eSelect)

//Retorno
document.getElementById("volver").addEventListener('click', eVolver);

//Fin
document.getElementById("fin").addEventListener('click', eFinalizar);

//Refresh
document.getElementById("refresh").addEventListener('click', eRefresh);

//Guardar
document.getElementById("guardar").addEventListener('click', eGuardar);

//Registro de modelo
document.getElementById("guardarProt").addEventListener('click', eRegistrarModelo);

//Retorno
document.getElementById("recargar").addEventListener('click',eRepetir)

//Colores
// let auxColores = []
// for (let i = 0; i < todosLosColores.length; i++) {auxColores.push(todosLosColores[i].nombre)}
// cargarColores()

//Coleccion
document.getElementById("vercoleccion1").addEventListener('click', eVerColec);
document.getElementById("vercoleccion2").addEventListener('click', eVerColec);

