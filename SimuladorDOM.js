// setTimeout(()=>{
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
        return resultado
    }

    function opciones(objeto, array) {
        const arrayOpciones = []
        for (objeto of array) {
            arrayOpciones.push(objeto.id + ". " + objeto.nombre)
        }
        console.log("arrayOpciones", arrayOpciones)
        return (arrayOpciones.join(`\n`))
    }

    function mostrar(objeto, array, lego) {
        let info = ""
        for (objeto of array) {
            if (lego == objeto.id) {
                info = (`Elegiste ${objeto.nombre} (ID: ${objeto.id}):\nEste bloque mide ${objeto.ancho}mm x ${objeto.largo}mm, y tiene una altura de 10mm.`)
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

//Inicio
setTimeout(()=>{
    nombre=prompt(`¿Cómo te llamás?`)
    document.getElementById("bienvenida").innerHTML=`Hola ${nombre}, te damos la bienvenida`
}, 500)


//Conversor de escalas
setTimeout(()=>{
    
    msg=["Ingresa el ancho real en metros. Para separar la parte decimal usa un punto.","Ingresa el alto real en metros. Para separar la parte decimal usa un punto.","Ingresa el largo real en metros. Para separar la parte decimal usa un punto."]  

    const anchoReal = ingresoDeMedidas(msg,0)
    const altoReal = ingresoDeMedidas(msg,1)
    const largoReal = ingresoDeMedidas(msg,2)

    const nuevoAncho = conversorEscala(anchoReal)
    const nuevoAlto = conversorEscala(altoReal)
    const nuevoLargo = conversorEscala(largoReal)

    let texto1=`Tu modelo será escalado a una medida de ${nuevoAncho} mm de ancho x ${nuevoAlto} mm de alto x ${nuevoLargo} mm de largo`
    crearNodo("div3","p",texto1,"subtexto")

}, 3500)

//Selección y calculadora de legos
setTimeout(()=>{
    
    let legoElegido = parseInt(prompt(`¿Cuál LEGO® querés usar? (Ingresá el número correspondiente)\n${opciones(Lego, legoBasics)}`))

    while ((legoElegido > 6) || isNaN(legoElegido)){
        legoElegido = parseInt(prompt(`La opción ingresada no es válida. Ingresá el número correspondiente a tu pieza deseada\n${opciones(Lego, legoBasics)}`))
    }
    
    let texto2=`${(mostrar(Lego, legoBasics, legoElegido))}`
    crearNodo("div3","p",texto2,"subtexto")

}, 7700)

setTimeout(()=>{
    
    let lego = medida(Lego, legoBasics, legoElegido)
    console.log("legoElegido, leg", legoElegido, lego)

    const legoAncho = divisionFloor(nuevoAncho, lego)
    const legoAlto = divisionFloor(nuevoAlto, 10)
    const legoLargo = divisionFloor(nuevoLargo, lego)

    let totalLaterales = (legoAncho * legoAlto * 2) + (legoLargo * legoAlto * 2)
    console.log("totalLaterales",totalLaterales)

    let totalTecho = (medida2(Lego, legoBasics, legoElegido, nuevoLargo, divisionFloor) * legoAncho)
    console.log("totalTecho, legoAncho",totalTecho, legoAncho)

    let texto3=`Para construir tu modelo vas a necesitar:\n· Aproximadamente ${totalLaterales} LEGO® para los laterales.\n· Aproximadamente ${totalTecho} AZULEJOS LEGO® para el techo.\n\nTené en cuenta que para el suelo es necesario una BASE LEGO® y que si hay aberturas la cantidad de bloques será menor`
    crearNodo("div3","p",texto3,"subtexto")
    
}, 10000)

//Selección de colores
setTimeout(()=>{
    
    let miColor = prompt(`Elegí los colores de tu modelo LEGO®. Indicá el nombre de tu color deseado`)
    miColor = miColor.toLowerCase()

    let searchResults = todosLosColores.filter ((color) => ((color.nombre).toLowerCase() == miColor || (color.categoria).toLowerCase() == miColor))

    while (searchResults.length == 0) {
        miColor = prompt(`Color no encontrado :( Probá con otro color`)
        miColor = miColor.toLowerCase()
        searchResults = todosLosColores.filter ((color) => ((color.nombre).toLowerCase() == miColor || (color.categoria).toLowerCase() == miColor))
    }

    auxColores = []
    for (let i = 0; i < searchResults.length; i++) { auxColores.push(searchResults[i].nombre) }

    if (auxColores.length>1){
        miColor = prompt(`¿Cuál de estos?\n ${auxColores.join(" | ")}`)
        miColor = miColor.toLowerCase()
        console.log("miColor",miColor)
        while (!(auxColores.includes(miColor))){
            miColor = prompt(`Color inválido. Elegí uno de los siguientes colores\n ${auxColores.join(" | ")}`)
            miColor = miColor.toLowerCase()
        }
    }
    
    let texto4=`Listo. Añadimos el ${miColor.toUpperCase()} a tu lista de colores deseados`
    crearNodo("div3","p",texto4,"subtexto")


}, 11200)