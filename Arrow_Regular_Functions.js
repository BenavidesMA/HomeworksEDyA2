/*Parte 1

En términos generales, las funciones flecha son una forma más corta de escribir funciones en JavaScript. 
Las funciones regulares utilizan la palabra function, mientras que las funciones flecha utilizan =>.

En términos más técnicos, las principales diferencias entre las funciones flecha y las funciones regulares en JavaScript está en la forma en que manejan this.
Las funciones regulares tienen su propio this, que depende de cómo se ejecuta la función, mientras que las funciones flecha heredan el this del contexto donde fueron creadas. 
Además, las funciones flecha tienen una sintaxis más corta y no pueden usarse como constructores con new.*/

//Parte 2

function par_Impar(numero) {
    if (numero % 2 === 0) {
        console.log("El número es par");
    } else {
        console.log("El número es impar");
    }
}

par_Impar(9);

const par_Impar = (numero) => {
    if (numero % 2 === 0) {
        console.log("El número es par");
    } else {
        console.log("El número es impar");
    }
};

par_Impar(9);
