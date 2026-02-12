// --- NAVEGACIÓN TOTALMENTE RESPETUOSA ---
function abrirSubventana(id) {
    // Solo ocultamos el inicio para que no estorbe
    const inicio = document.getElementById('ventana-inicio');
    if(inicio) inicio.style.display = 'none';
    
    // Mostramos la categoría (cat-conexiones o cat-calculadoras)
    const destino = document.getElementById(id);
    if(destino) destino.style.display = 'block';
}

function cerrarSubventana(id) {
    // Ocultamos la categoría y volvemos a mostrar el inicio
    const ventana = document.getElementById(id);
    if(ventana) ventana.style.display = 'none';
    
    const inicio = document.getElementById('ventana-inicio');
    if(inicio) inicio.style.display = 'block';
}

function abrirHerramienta(id) {
    // Cerramos ambos menús principales para estar seguros
    if(document.getElementById('cat-conexiones')) document.getElementById('cat-conexiones').style.display = 'none';
    if(document.getElementById('cat-calculadoras')) document.getElementById('cat-calculadoras').style.display = 'none';

    // Mostramos la herramienta específica (tus 4 de siempre o la nueva de colores)
    const destino = document.getElementById(id);
    if (destino) {
        destino.style.display = 'block';
        window.scrollTo(0,0);
        
        // Ejecutamos la lógica de carga de tus herramientas originales
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
        // Nueva lógica de colores
        else if(id === 'calc-colores' && typeof calcularResistenciaColor === "function") {
            calcularResistenciaColor();
        }
    }
}

function cerrarHerramienta(id) {
    const ventana = document.getElementById(id);
    if(ventana) ventana.style.display = 'none';
    
    // Si el ID de la herramienta empieza por 'herram-', vuelve a Conexiones
    if (id.includes('herram')) {
        const conex = document.getElementById('cat-conexiones');
        if(conex) conex.style.display = 'block';
    } 
    // Si es la de colores, vuelve a Calculadoras
    else if (id === 'calc-colores') {
        const calcs = document.getElementById('cat-calculadoras');
        if(calcs) calcs.style.display = 'block';
    }
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


