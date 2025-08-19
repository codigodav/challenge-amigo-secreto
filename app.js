let amigos = [];

const inputAmigo = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

// Función para agregar un nombre
function agregarAmigo() {
    const nombre = inputAmigo.value.trim();

    // Expresión regular: solo letras, acentos, ñ y espacios, mínimo 2 letras
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;

    // Validación básica de formato
    if (nombre === "" || !regex.test(nombre)) {
        alert("Por favor, inserte un nombre");
        return;
    }

    // Validación: evitar letras todas iguales (ej: "aa", "zzz", "mmm")
    const soloLetras = nombre.replace(/\s+/g, ""); // Quitar espacios
    if (/^([a-zA-ZáéíóúÁÉÍÓÚñÑ])\1+$/.test(soloLetras)) {
        alert("Por favor, ingrese un nombre real");
        return;
    }

    amigos.push(nombre);
    mostrarLista();
    inputAmigo.value = "";
    inputAmigo.focus();
}


// Mostrar lista en el HTML
function mostrarLista() {
    listaAmigos.innerHTML = "";
    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Función para sortear y luego limpiar
function sortearAmigo() {
    if (amigos.length === 0) {
        resultado.textContent = "No hay nombres para sortear";
        return;
    }

    const indice = Math.floor(Math.random() * amigos.length);
    const ganador = amigos[indice];
    resultado.textContent = `El amigo secreto es: ${ganador}`;

    // Limpiar después de 2 segundos
    setTimeout(() => {
        amigos = [];
        mostrarLista();
        resultado.textContent = "";
    }, 2000);
}

// Permitir que Enter agregue un nombre
inputAmigo.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarAmigo();
    }
});