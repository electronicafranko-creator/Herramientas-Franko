// --- NAVEGADOR ROBUSTO ---
function abrirHerramienta(id) {
    console.log("Intentando abrir:", id); // Esto nos dirá en la consola si el botón funciona
    
    // 1. Ocultamos todas las secciones que tengan la clase 'ventana-capa'
    const todas = document.querySelectorAll('.ventana-capa');
    todas.forEach(capa => {
        capa.style.display = 'none';
    });

    // 2. Buscamos la sección que quieres abrir
    const destino = document.getElementById(id);
    
    if (destino) {
        destino.style.display = 'block';
        window.scrollTo(0,0);
        
        // Si es la calculadora de colores, activamos su lógica
        if (id === 'calc-colores') {
            if (typeof calcularResistenciaColor === "function") {
                calcularResistenciaColor();
            }
        }
    } else {
        alert("Error: No se encontró la sección '" + id + "'. Revisa que el ID en el HTML sea igual.");
    }
}

function cerrarHerramienta(id) {
    const ventana = document.getElementById(id);
    if (ventana) {
        ventana.style.display = 'none';
    }

    // Lógica para saber a dónde volver
    if (id === 'calc-colores') {
        // Si cierras la calculadora, intenta volver al menú de 11
        const menu11 = document.getElementById('cat-calculadoras');
        if (menu11) menu11.style.display = 'block';
    } else {
        // Para cualquier otra cosa (Conexiones o Sub-ventanas), vuelve al inicio
        // Aquí no hace falta código extra si tu menú inicial siempre está visible de fondo
    }
}

// --- LÓGICA DE CALCULADORA DE COLORES ---
function calcularResistenciaColor() {
    try {
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

        const resDiv = document.getElementById('res-color-total');
        if (resDiv) {
            resDiv.innerHTML = `<strong>Valor: ${valorFinal}${unidad}</strong><br>Tolerancia: ±${t}%`;
        }

        // Pintar la resistencia visual
        const v1 = document.getElementById('v-band1');
        const v2 = document.getElementById('v-band2');
        const vm = document.getElementById('v-multi');
        const vt = document.getElementById('v-tol');

        if(v1) v1.style.backgroundColor = document.getElementById('band1').options[document.getElementById('band1').selectedIndex].style.backgroundColor;
        if(v2) v2.style.backgroundColor = document.getElementById('band2').options[document.getElementById('band2').selectedIndex].style.backgroundColor;
        if(vm) vm.style.backgroundColor = document.getElementById('multi').options[document.getElementById('multi').selectedIndex].style.backgroundColor;
        if(vt) vt.style.backgroundColor = document.getElementById('tol').options[document.getElementById('tol').selectedIndex].style.backgroundColor;
    } catch (e) {
        console.log("Esperando a que los elementos carguen...");
    }
}
