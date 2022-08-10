window.onload = inicio()

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
    return (arrayOpciones.join(" / "))
}

function mostrar(objeto, array, lego) {
    let info = ""
    for (objeto of array) {
        let {nombre:nombreObj, id:idObj, ancho:anchoObj, largo:largoObj} = objeto //DESESTRUCTURACIÓN
        if (lego == idObj) {
            info = (`Elegiste el ${nombreObj} (ID: ${idObj}):\nEste bloque mide ${anchoObj}x${largoObj}mm, y tiene una altura de 10mm.`)
        }
    }
    return info
}
 
function medida(objeto, array, opcion) {
    for (objeto of array) {
        if (opcion == objeto.id){
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
        (lego == objeto.id) && (divisor = objeto.largo) //OPERANDO AND
    }
    let cantidadLargo = divisionFloor(ancho, divisor)
    let cantidadLargoTotal

    for (let i = 0; i <= cantidadLargo; i++) {
        cantidadLargoTotal = cantidadLargo + (cantidadLargo - 1)
    }

    return cantidadLargoTotal
}

// function aDataAPI(ruta){
//     let array=[]
//     fetch(ruta)
//     .then( (res) => res.json())
//     .then( (objetos) => {
        
//         objetos.forEach((objeto) => {
//             todosLosColores.push(objeto)
//         })
//     })
//     return array
// }


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
    sessionStorage.clear()
}


function allStorage() {

    let values = []
        keys = Object.keys(localStorage)

    for (let i = 0; i < keys.length; i += 1){
        values.push( localStorage.getItem(keys[i]) );
    }
    
    console.log(values)
    return values;
}

function inicio() {
    actualizar()
    allStorage()
}

function aFakePost(titulo,data){
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: titulo,
            body: data,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
        
}

function crearModeloInfo(){
    
    let miModelo

    miModelo = (new infoModelo ((sessionStorage.getItem("nombreprotvalue")), (sessionStorage.getItem("descripcionprotvalue")), (`Ancho: ${sessionStorage.getItem('anchovalue')}mts | Alto: ${sessionStorage.getItem('altovalue')}mts | Largo: ${sessionStorage.getItem('largovalue')}mts`), (`Color: ${sessionStorage.getItem('colorvalue')}`), (sessionStorage.getItem('medidasdelmodelo')), (sessionStorage.getItem('datoslego')), (sessionStorage.getItem('infototal'))))

    modelosStorage.unshift(miModelo)
    clave=(sessionStorage.getItem("nombreprotvalue"))

    if ((miModelo.nombref)!==null){
        localStorage.setItem(clave, JSON.stringify(modelosStorage[0]))
    }

    let values= allStorage()
    
    for (let i=0; i < values.length; i++){
        let modelito = JSON.parse(values[i])
        if ((modelito.nombref)!==null){
            let auxData=`<em><br>${modelito.descrip}<br>${modelito.medidasreales}<br>${modelito.colormod}</em><br><br>${modelito.medidasescaladas}<br>${modelito.legoausar}<br>${modelito.infofinal}`
            let auxTitulo= `${modelito.nombref}`
            crearNodo("coleccionados", "details", `<summary>${auxTitulo}</summary><p class="resultados2">${auxData}</p>`, "tituloMod")

            aFakePost(auxTitulo,auxData)
        }

    } 

    const details = document.querySelectorAll("details");
    details.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            details.forEach((detail) => {
            if (detail !== targetDetail) {
                detail.removeAttribute("open");
            }})
        })
    })
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

    sessionStorage.setItem('anchovalue',anchoReal);
    sessionStorage.setItem('altovalue', altoReal);
    sessionStorage.setItem('largovalue', largoReal);

    nuevoAncho = conversorEscala(anchoReal)
    nuevoAlto = conversorEscala(altoReal)
    nuevoLargo = conversorEscala(largoReal)

    document.getElementById("descubri").style.opacity = "40%";
    document.getElementById("paso1").style.display = "none";

    let texto1 = `Las medidas de tu modelo serán:<br>${nuevoAncho}mm de ancho, ${nuevoAlto}mm de alto y ${nuevoLargo}mm de largo`
    crearNodo("resultado1", "p", `<p id="resultCalcular"></p>`, "resultados")
    let nodoinfo = document.getElementById("resultCalcular")
    nodoinfo.innerHTML = texto1

    sessionStorage.setItem('medidasdelmodelo', texto1);

    document.getElementById("opcLego").removeAttribute('disabled')
}

function eSelect(e) {

    legoElegido = e.target.value;

    let texto2 = `${(mostrar(Lego, legoBasics, legoElegido))}`
    crearNodo("selector1", "div", `<p id="info"></p>`, "resultados")
    let nodoinfo = document.getElementById("info")
    nodoinfo.innerHTML = texto2

    document.getElementById("confirmar").removeAttribute('disabled')
    document.getElementById("confirmar").addEventListener('click', eConfirmar);

    sessionStorage.setItem('datoslego', texto2);

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

    document.getElementById("fin").style.visibility = "visible";

    sessionStorage.setItem('infototal', texto3);
}

function eFinalizar(e) {

    e.target.removeEventListener('click', eFinalizar)


    document.getElementById("fin").remove()
    crearNodo("resultado2", "div", `<p id="fc"><hr>Felicitaciones, ya podés armar tu modelo</p>`, "textofin")

    document.getElementById("volver").style.visibility = "hidden";

    setTimeout(() => {
        document.getElementById("guardarOno").style.visibility = "visible";
    }, 500)

}

function eRefresh() {
    let f5 = document.getElementById("refresh")
    f5.onclick = actualizar()
}

function eReturnColor(e) {

    let results = document.getElementById('searchresult')
    let miColor = e.target.value.toLowerCase()

    if(e.target.value === '') {
        results.innerHTML = '';
        return;
    }
    
    let searchResults = todosLosColores.filter ((color) => ((color.nombre).toLowerCase() == miColor || (color.categoria).toLowerCase() == miColor))

    results.innerHTML = '';
    
    searchResults.forEach((element) => {
        crearNodo("searchresult","label",`<input class="colores" type="radio" name="color" value="${element.nombre}">${(element.nombre).toUpperCase()}`,"resultados3")
    })

    document.querySelectorAll(".colores").forEach (elem => elem.addEventListener('click', ()=> {
        sessionStorage.setItem('colorvalue', elem.value)
        document.getElementById("guardarProt").removeAttribute('disabled')
    }))
   
}

function eGuardar() {
    document.getElementById("caja1").style.display = "none";
    document.getElementById("caja2").style.display = "block";
}

function eRegistrarModelo() {

    const nombreProt = document.getElementById("coleccion").value
    const descripcionProt = document.getElementById("descripcion").value

    let values= allStorage()

    for (let i=0; i < values.length; i++){
        let modelito = JSON.parse(values[i])
        while ((modelito.nombref)==nombreProt){
            let texto2 = `Ya existe un modelo con ese nombre, por favor ingresá uno nuevo`
            document.getElementById("error").innerHTML = texto2
            document.getElementById("error").style.color = "orange";
    
            nombreProt = document.getElementById("coleccion").value
        }
    }

    while (((nombreProt.length) == '') || ((descripcionProt.length) == ''))  {
        let texto1 = `Por favor ingresá TODOS los datos solicitados`
        document.getElementById("error").innerHTML = texto1
        document.getElementById("error").style.color = "orange";

        nombreProt = document.getElementById("coleccion").value
        descripcionProt = document.getElementById("descripcion").value

    }
    document.getElementById("error").remove()

    sessionStorage.setItem('nombreprotvalue', nombreProt);
    sessionStorage.setItem('descripcionprotvalue', descripcionProt);

    document.getElementById("archiva").style.opacity = "40%";
    document.getElementById("inputs2").style.display = "none";


    Swal.fire({
        icon: 'success',
        title: 'Añadiste un nuevo modelo a tu colección!',
        showConfirmButton: true,
        timer: 3500,
        confirmButtonColor: '#0b5ed7',
    })
    

    document.getElementById("guardarProt").remove()
    // crearNodo("boton3", "p", `<hr>Añadiste un nuevo modelo a tu colección!`, "textofin")

    crearNodo("boton3", "div", `<button class="btn btn-primary" id="vercoleccion3">Ver colección</button>`, "col")
    document.getElementById("vercoleccion3").addEventListener('click', eVerColec);

}

function eVerColec() {
    document.getElementById("caja1").style.display = "none";
    document.getElementById("caja2").style.display = "none";
    document.getElementById("caja3").style.display = "block";
    
    crearModeloInfo()

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

// const todosLosColores = aDataAPI('colores.json')

class Colores {
    constructor(categoria, nombre) {
        this.categoria = categoria
        this.nombre = nombre
    }
}

const todosLosColores = [new Colores("Negro", "negro"), new Colores("Blanco", "blanco"), new Colores("Blanco", "transparente"), new Colores("Gris", "gris oscuro"), new Colores("Gris", "gris medio"), new Colores("Metal", "oro"), new Colores("Metal", "plata"), new Colores("Metal", "bronce"), new Colores("Azul", "azul marino"), new Colores("Azul", "azul oscuro"), new Colores("Azul", "petróleo"), new Colores("Azul", "celeste"), new Colores("Azul", "aqua"), new Colores("Rojo", "rojo"), new Colores("Rojo", "rojo oscuro"), new Colores("Rojo", "caoba"), new Colores("Rojo", "carmesí"), new Colores("Rojo", "rosa"), new Colores("Amarillo", "amarillo vibrante"), new Colores("Amarillo", "ocre"), new Colores("Amarillo", "narciso"), new Colores("Amarillo", "mostaza"), new Colores("Violeta", "violeta"), new Colores("Violeta", "lila"), new Colores("Violeta", "púrpura"), new Colores("Violeta", "magenta"), new Colores("Violeta", "lavanda"), new Colores("Verde", "verde"), new Colores("Verde", "verde claro"), new Colores("Verde", "verde oscuro"), new Colores("Verde", "lima"), new Colores("Verde", "oliva"), new Colores("Naranja", "naranja vibrante"), new Colores("Naranja", "coral"), new Colores("Marrón", "marrón"), new Colores("Marrón", "marrón oscuro"), new Colores("Marrón", "marrón claro"), new Colores("Marrón", "chocolate")]


class infoModelo{
    constructor(nombref, descrip, medidasreales, colormod, medidasescaladas, legoausar, infofinal) {
        this.nombref = nombref
        this.descrip = descrip
        this.medidasreales = medidasreales
        this.colormod=colormod
        this.medidasescaladas = medidasescaladas
        this.legoausar = legoausar
        this.infofinal = infofinal

    }
}

// Variables globales
let nuevoAncho = 0
let nuevoAlto = 0
let nuevoLargo = 0
let legoElegido = 0
let modelosStorage = []


//Conversor de escalas
document.getElementById("calcular").addEventListener('click', eCalcular);

//Selección y calculadora de legos
document.getElementById("opcLego").addEventListener('change', eSelect)

//Retorno
document.getElementById("volver").addEventListener('click', eRefresh);

//Fin
document.getElementById("fin").addEventListener('click', eFinalizar);

//Refresh
document.getElementById("refresh").addEventListener('click', eRefresh);

//Guardar
document.getElementById("guardar").addEventListener('click', eGuardar);

//Registro de modelo
document.getElementById("guardarProt").addEventListener('click', eRegistrarModelo);


//
document.getElementById("eliminar").onclick= (e) =>{
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Perderás todos los modelos guardados",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0b5ed7',
        cancelButtonColor: 'orange',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, eliminar todo!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Eliminada!',
            'Tu colección ahora está vacía, como tu corazón :(',
            'success'
            )
            localStorage.clear()
            location.href="index.html";
        }
        else{
            e.preventDefault()
        }
    })
};

//Coleccion
document.getElementById("vercoleccion1").addEventListener('click', eVerColec)
document.getElementById("vercoleccion2").addEventListener('click', eVerColec)

//Color
document.getElementById('searchBar').addEventListener('input', eReturnColor)
