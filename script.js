// --- TUS FUNCIONES DE NAVEGACIÓN ORIGINALES ---
function abrirSubventana(id) {
    document.getElementById('ventana-inicio').style.display = 'none';
    document.getElementById(id).style.display = 'block';
}

function cerrarSubventana(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('ventana-inicio').style.display = 'block';
}

function abrirHerramienta(id) {
    // Esta línea cierra el menú que esté abierto (conexiones o calculadoras)
    document.getElementById('cat-conexiones').style.display = 'none';
    document.getElementById('cat-calculadoras').style.display = 'none'; 
    
    document.querySelectorAll('.ventana-capa').forEach(v => v.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    
    // Mantenemos tu lógica de carga para conexiones
    if(id === 'herram-resistencias') {
        document.getElementById('lista-valores').innerHTML = '';
        agregarFilaResistencia(); agregarFilaResistencia();
        cambiarEsquema();
    } 
    else if(id === 'herram-bobinas') {
        document.getElementById('lista-valores-bobina').innerHTML = '';
        agregarFilaBobina(); agregarFilaBobina();
        cambiarEsquemaBobina();
    }
    else if(id === 'herram-capacitores') {
        document.getElementById('lista-valores-cap').innerHTML = '';
        agregarFilaCapacitor(); agregarFilaCapacitor();
        cambiarEsquemaCapacitor();
    }
    else if(id === 'herram-fuentes') {
        document.getElementById('lista-valores-fnt').innerHTML = '';
        agregarFilaFuente(); agregarFilaFuente();
        cambiarEsquemaFuente();
    }
    // Nueva lógica para inicializar calculadora de colores
    else if(id === 'calc-colores') {
        calcularResistenciaColor();
    }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    // Si cerramos algo de conexiones, volvemos a su categoría
    if(id.startsWith('herram')) {
        document.getElementById('cat-conexiones').style.display = 'block';
    } 
    // Si cerramos algo de calculadoras, volvemos a calculadoras
    else {
        document.getElementById('cat-calculadoras').style.display = 'block';
    }
}

// --- TUS LÓGICAS DE CÁLCULO (Resistencias, Bobinas, Capacitores, Fuentes) ---
// (Manten todas tus funciones: cambiarEsquema, agregarFilaResistencia, calcularResistencias, etc. tal cual las tienes)

// --- NUEVA LÓGICA: CALCULADORA DE COLORES ---
function calcularResistenciaColor() {
    const b1 = document.getElementById('band1').value;
    const b2 = document.getElementById('band2').value;
    const m = parseFloat(document.getElementById('multi').value);
    const t = document.getElementById('tol').value;

    const valorBase = parseInt(b1 + b2);
    const resultado = valorBase * m;

    let unidad = " Ω";
    let valorFinal = resultado;

    // Conversión real sin simplificar resistencia
    if (resultado >= 1000000) {
        valorFinal = resultado / 1000000;
        unidad = " MΩ";
    } else if (resultado >= 1000) {
        valorFinal = resultado / 1000;
        unidad = " kΩ";
    }

    // Mostrar texto
    document.getElementById('resultado-colores').innerHTML = `Total: ${valorFinal.toLocaleString()}${unidad} <br> <small>Tolerancia: ±${t}%</small>`;

    // Actualizar Colores Visuales
    document.getElementById('v-band1').style.backgroundColor = document.getElementById('band1').options[document.getElementById('band1').selectedIndex].style.backgroundColor;
    document.getElementById('v-band2').style.backgroundColor = document.getElementById('band2').options[document.getElementById('band2').selectedIndex].style.backgroundColor;
    document.getElementById('v-multi').style.backgroundColor = document.getElementById('multi').options[document.getElementById('multi').selectedIndex].style.backgroundColor;
    document.getElementById('v-tol').style.backgroundColor = document.getElementById('tol').options[document.getElementById('tol').selectedIndex].style.backgroundColor;
}
