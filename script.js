// --- 1. NAVEGACIÓN UNIVERSAL (INICIO, MENÚS Y SUB-VENTANAS) ---
function abrirHerramienta(id) {
    // Oculta todas las capas activas
    document.querySelectorAll('.ventana-capa').forEach(capa => {
        capa.style.display = 'none';
    });

    // Muestra la ventana solicitada (ya sea el menú de 11, la de colores o las sub-ventanas)
    const destino = document.getElementById(id);
    if (destino) {
        destino.style.display = 'block';
        window.scrollTo(0,0);
        
        // Si es la calculadora, calculamos el valor inicial
        if(id === 'calc-colores') calcularResistenciaColor();
    }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    
    // Lógica inteligente de "Atrás":
    if (id === 'calc-colores') {
        // De la calculadora vuelve al menú de 11
        document.getElementById('cat-calculadoras').style.display = 'block';
    } else if (id === 'cat-calculadoras' || id === 'conexiones-esquematicas') {
        // De los menús principales vuelve al inicio (los 2 cuadros grandes)
        // No hace falta hacer nada si tu inicio no es una 'ventana-capa'
    } else {
        // Si cierras una sub-ventana de conexiones, vuelve al menú de conexiones
        const menuConexiones = document.getElementById('conexiones-esquematicas');
        if(menuConexiones) menuConexiones.style.display = 'block';
    }
}

// --- 2. LÓGICA CALCULADORA DE COLORES ---
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

    const resultDiv = document.getElementById('res-color-total');
    if(resultDiv) {
        resultDiv.innerHTML = `<strong>Valor: ${valorFinal}${unidad}</strong><br>Tolerancia: ±${t}%`;
    }
    
    // Actualizar colores visuales
    actualizarColores(b1, b2, m, t);
}

function actualizarColores(b1, b2, m, t) {
    const v1 = document.getElementById('v-band1');
    const v2 = document.getElementById('v-band2');
    const vm = document.getElementById('v-multi');
    const vt = document.getElementById('v-tol');

    if(v1) v1.style.backgroundColor = document.getElementById('band1').options[document.getElementById('band1').selectedIndex].style.backgroundColor;
    if(v2) v2.style.backgroundColor = document.getElementById('band2').options[document.getElementById('band2').selectedIndex].style.backgroundColor;
    if(vm) vm.style.backgroundColor = document.getElementById('multi').options[document.getElementById('multi').selectedIndex].style.backgroundColor;
    if(vt) vt.style.backgroundColor = document.getElementById('tol').options[document.getElementById('tol').selectedIndex].style.backgroundColor;
}
