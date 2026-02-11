// --- NAVEGACIÓN ---
function abrirSubventana(id) {
    document.getElementById('ventana-inicio').style.display = 'none';
    document.getElementById(id).style.display = 'block';
}

function cerrarSubventana(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('ventana-inicio').style.display = 'block';
}

function abrirHerramienta(id) {
    document.getElementById('cat-conexiones').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    
    if(id === 'herram-resistencias') {
        document.getElementById('lista-valores').innerHTML = '';
        agregarFilaResistencia();
        agregarFilaResistencia();
        cambiarEsquema();
    } 
    else if(id === 'herram-bobinas') {
        document.getElementById('lista-valores-bobina').innerHTML = '';
        agregarFilaBobina();
        agregarFilaBobina();
        cambiarEsquemaBobina();
    }
    else if(id === 'herram-capacitores') {
        document.getElementById('lista-valores-cap').innerHTML = '';
        agregarFilaCapacitor();
        agregarFilaCapacitor();
        cambiarEsquemaCapacitor();
    }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('cat-conexiones').style.display = 'block';
}

// --- LÓGICA DE RESISTENCIAS ---
function cambiarEsquema() {
    const modo = document.getElementById('modo-calculo').value;
    const imgSerie = document.getElementById('img-serie');
    const imgParalelo = document.getElementById('img-paralelo');
    if (modo === 'serie') {
        imgSerie.style.display = 'block';
        imgParalelo.style.display = 'none';
    } else {
        imgSerie.style.display = 'none';
        imgParalelo.style.display = 'block';
    }
    calcularResistencias();
}

function agregarFilaResistencia() {
    const contenedor = document.getElementById('lista-valores');
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `
        <input type="number" class="res-input" placeholder="0" oninput="calcularResistencias()" inputmode="decimal">
        <select class="unit-select" onchange="calcularResistencias()">
            <option value="1">Ω</option>
            <option value="1000">kΩ</option>
            <option value="1000000">MΩ</option>
        </select>
    `;
    contenedor.appendChild(div);
}

function calcularResistencias() {
    const filas = document.querySelectorAll('#lista-valores .fila-valor');
    const modo = document.getElementById('modo-calculo').value;
    const factorSalida = parseFloat(document.getElementById('unidad-resultado').value);
    let ohmios = [];
    filas.forEach(f => {
        const val = parseFloat(f.querySelector('.res-input').value);
        const uni = parseFloat(f.querySelector('.unit-select').value);
        if(!isNaN(val) && val > 0) ohmios.push(val * uni);
    });
    if(ohmios.length < 2) {
        document.getElementById('resultado-final').innerText = "Total: --";
        return;
    }
    let total = 0;
    if(modo === 'serie') {
        total = ohmios.reduce((a, b) => a + b, 0);
    } else {
        total = 1 / ohmios.reduce((a, b) => a + (1/b), 0);
    }
    let final = total / factorSalida;
    document.getElementById('resultado-final').innerText = `Total: ${final.toLocaleString(undefined, {maximumFractionDigits: 3})}`;
}

// --- LÓGICA DE BOBINAS ---
function cambiarEsquemaBobina() {
    const modo = document.getElementById('modo-calculo-bobina').value;
    const imgSerie = document.getElementById('img-serie-bobina');
    const imgParalelo = document.getElementById('img-paralelo-bobina');
    if (modo === 'serie') {
        imgSerie.style.display = 'block';
        imgParalelo.style.display = 'none';
    } else {
        imgSerie.style.display = 'none';
        imgParalelo.style.display = 'block';
    }
    calcularBobinas();
}

function agregarFilaBobina() {
    const contenedor = document.getElementById('lista-valores-bobina');
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `
        <input type="number" class="bob-input" placeholder="0" oninput="calcularBobinas()" inputmode="decimal">
        <select class="unit-select-bobina" onchange="calcularBobinas()">
            <option value="0.000001">µH</option>
            <option value="0.001">mH</option>
            <option value="1">H</option>
        </select>
    `;
    contenedor.appendChild(div);
}

function calcularBobinas() {
    const filas = document.querySelectorAll('#lista-valores-bobina .fila-valor');
    const modo = document.getElementById('modo-calculo-bobina').value;
    const factorSalida = parseFloat(document.getElementById('unidad-resultado-bobina').value);
    let henrios = [];
    filas.forEach(f => {
        const val = parseFloat(f.querySelector('.bob-input').value);
        const uni = parseFloat(f.querySelector('.unit-select-bobina').value);
        if(!isNaN(val) && val > 0) henrios.push(val * uni);
    });
    if(henrios.length < 2) {
        document.getElementById('resultado-final-bobina').innerText = "Total: --";
        return;
    }
    let total = 0;
    if(modo === 'serie') {
        total = henrios.reduce((a, b) => a + b, 0);
    } else {
        total = 1 / henrios.reduce((a, b) => a + (1/b), 0);
    }
    let final = total / factorSalida;
    document.getElementById('resultado-final-bobina').innerText = `Total: ${final.toLocaleString(undefined, {maximumFractionDigits: 4})}`;
}

// --- LÓGICA DE CAPACITORES ---
function cambiarEsquemaCapacitor() {
    const modo = document.getElementById('modo-calculo-cap').value;
    const imgSerie = document.getElementById('img-serie-cap');
    const imgParalelo = document.getElementById('img-paralelo-cap');
    if (modo === 'serie') {
        imgSerie.style.display = 'block';
        imgParalelo.style.display = 'none';
    } else {
        imgSerie.style.display = 'none';
        imgParalelo.style.display = 'block';
    }
    calcularCapacitores();
}

function agregarFilaCapacitor() {
    const contenedor = document.getElementById('lista-valores-cap');
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `
        <input type="number" class="cap-input" placeholder="0" oninput="calcularCapacitores()" inputmode="decimal">
        <select class="unit-select-cap" onchange="calcularCapacitores()">
            <option value="0.000000000001">pF</option>
            <option value="0.000000001">nF</option>
            <option value="0.000001" selected>µF</option>
            <option value="1">F</option>
        </select>
    `;
    contenedor.appendChild(div);
}

function calcularCapacitores() {
    const filas = document.querySelectorAll('#lista-valores-cap .fila-valor');
    const modo = document.getElementById('modo-calculo-cap').value;
    const factorSalida = parseFloat(document.getElementById('unidad-resultado-cap').value);
    let faradios = [];
    filas.forEach(f => {
        const val = parseFloat(f.querySelector('.cap-input').value);
        const uni = parseFloat(f.querySelector('.unit-select-cap').value);
        if(!isNaN(val) && val > 0) faradios.push(val * uni);
    });
    if(faradios.length < 2) {
        document.getElementById('resultado-final-cap').innerText = "Total: --";
        return;
    }
    let total = 0;
    if(modo === 'paralelo') {
        total = faradios.reduce((a, b) => a + b, 0);
    } else {
        total = 1 / faradios.reduce((a, b) => a + (1/b), 0);
    }
    let final = total / factorSalida;
    document.getElementById('resultado-final-cap').innerText = `Total: ${final.toLocaleString(undefined, {maximumFractionDigits: 6})}`;
}
