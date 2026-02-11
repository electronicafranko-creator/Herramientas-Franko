// NAVEGACIÓN MEJORADA
function abrirSubventana(id) {
    document.getElementById('ventana-inicio').style.display = 'none';
    document.getElementById(id).style.display = 'block';
}

function cerrarSubventana(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('ventana-inicio').style.display = 'block';
}

function abrirHerramienta(id) {
    // Ocultar ambos menús de nivel 2
    document.getElementById('cat-conexiones').style.display = 'none';
    document.getElementById('cat-calculadoras').style.display = 'none';
    
    document.getElementById(id).style.display = 'block';
    
    // Inicializar cada herramienta según su ID (Resistencias, Bobinas, etc.)
    if(id === 'herram-resistencias') {
        document.getElementById('lista-valores').innerHTML = '';
        agregarFilaResistencia(); agregarFilaResistencia();
    } else if(id === 'herram-fuentes') {
        document.getElementById('lista-valores-fnt').innerHTML = '';
        agregarFilaFuente(); agregarFilaFuente();
    }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    // Determinar a qué menú volver
    const calcs = ['herram-ley-ohm'];
    if (calcs.includes(id)) {
        document.getElementById('cat-calculadoras').style.display = 'block';
    } else {
        document.getElementById('cat-conexiones').style.display = 'block';
    }
}

// LÓGICA LEY DE OHM
function calcularLeyOhm() {
    let v = parseFloat(document.getElementById('ohm-v').value);
    let i = parseFloat(document.getElementById('ohm-i').value);
    let r = parseFloat(document.getElementById('ohm-r').value);
    let p = parseFloat(document.getElementById('ohm-p').value);

    // V e I conocidos
    if (!isNaN(v) && !isNaN(i)) {
        document.getElementById('ohm-r').value = (v / i).toFixed(2);
        document.getElementById('ohm-p').value = (v * i).toFixed(2);
    }
    // V e R conocidos
    else if (!isNaN(v) && !isNaN(r)) {
        document.getElementById('ohm-i').value = (v / r).toFixed(2);
        document.getElementById('ohm-p').value = ((v * v) / r).toFixed(2);
    }
    // I y R conocidos
    else if (!isNaN(i) && !isNaN(r)) {
        document.getElementById('ohm-v').value = (i * r).toFixed(2);
        document.getElementById('ohm-p').value = ((i * i) * r).toFixed(2);
    }
    // P y V conocidos
    else if (!isNaN(p) && !isNaN(v)) {
        document.getElementById('ohm-i').value = (p / v).toFixed(2);
        document.getElementById('ohm-r').value = ((v * v) / p).toFixed(2);
    }
}

function limpiarOhm() {
    document.getElementById('ohm-v').value = '';
    document.getElementById('ohm-i').value = '';
    document.getElementById('ohm-r').value = '';
    document.getElementById('ohm-p').value = '';
}

// (El resto de las funciones de Resistencias, Bobinas, Fuentes se mantienen igual...)
