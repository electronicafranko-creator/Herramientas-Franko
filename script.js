// --- NAVEGACIÓN UNIVERSAL ---
function abrirHerramienta(id) {
    // Oculta absolutamente todas las capas
    document.querySelectorAll('.ventana-capa').forEach(capa => {
        capa.style.display = 'none';
    });

    // Muestra la que pediste
    const destino = document.getElementById(id);
    if (destino) {
        destino.style.display = 'block';
        window.scrollTo(0,0);
        // Si es la calculadora, inicializa el cálculo
        if(id === 'calc-colores') calcularResistenciaColor();
    }
}

function cerrarHerramienta(id) {
    // Oculta la ventana actual
    document.getElementById(id).style.display = 'none';
    
    // LÓGICA DE RETORNO:
    if (id === 'calc-colores') {
        // Si cierras la calculadora, vas al menú de las 11
        document.getElementById('cat-calculadoras').style.display = 'block';
    } else {
        // Si cierras 'Conexiones' o el 'Menú de 11', vuelves al INICIO real
        // Aquí forzamos que se vea tu pantalla principal (la de los 2 cuadros grandes)
        document.querySelectorAll('.ventana-capa').forEach(c => c.style.display = 'none');
        // Si tu inicio no es una "capa", esto hará que se vea el fondo original
    }
}

// --- LÓGICA CALCULADORA DE COLORES ---
function calcularResistenciaColor() {
    const b1 = document.getElementById('band1').value;
    const b2 = document.getElementById('band2').value;
    const m = document.getElementById('multi').value;
    const t = document.getElementById('tol').value;

    const resultado = (parseInt(b1 + b2)) * parseFloat(m);
    
    let unidad = " Ω";
    let valorFinal = resultado;

    if (resultado >= 1000000) {
        valorFinal = resultado / 1000000;
        unidad = " MΩ";
    } else if (resultado >= 1000) {
        valorFinal = resultado / 1000;
        unidad = " kΩ";
    }

    document.getElementById('res-color-total').innerHTML = `<strong>Valor: ${valorFinal}${unidad}</strong><br>Tolerancia: ±${t}%`;
    
    // Actualiza colores del dibujo
    document.getElementById('v-band1').style.backgroundColor = document.getElementById('band1').options[document.getElementById('band1').selectedIndex].style.backgroundColor;
    document.getElementById('v-band2').style.backgroundColor = document.getElementById('band2').options[document.getElementById('band2').selectedIndex].style.backgroundColor;
    document.getElementById('v-multi').style.backgroundColor = document.getElementById('multi').options[document.getElementById('multi').selectedIndex].style.backgroundColor;
    document.getElementById('v-tol').style.backgroundColor = document.getElementById('tol').options[document.getElementById('tol').selectedIndex].style.backgroundColor;
}

// --- RECONECTANDO CONEXIONES ESQUEMÁTICAS ---
// Si tenías funciones como 'cambiarImagen' o 'zoom', pégalas aquí abajo:
function cambiarEsquema(ruta) {
    const visor = document.getElementById('visor-esquemas'); // Asegúrate que este ID sea el de tu imagen
    if(visor) visor.src = ruta;
}
