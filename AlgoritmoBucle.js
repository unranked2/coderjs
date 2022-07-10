
// Crear un algoritmo que repita un bloque de instrucciones.
//En cada repetición es necesario efectuar una operación o comparación para obtener una salida por alerta o consola.


for (let i=0; i<5; i++){
    numero=prompt("Adiviná el numero del 1 al 15")
    if (numero!=7){
        alert("Fallaste. Te quedan " + (4-i) + " chances")
    }
    else{
        alert("Felicitaciones, ganaste!")
        break
    }

}