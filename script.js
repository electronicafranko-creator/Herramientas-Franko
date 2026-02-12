// NAVEGACIÓN
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
    document.querySelectorAll('.ventana-capa').forEach(v => v.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    
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
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('cat-conexiones').style.display = 'block';
}

// LÓGICA RESISTENCIAS
function cambiarEsquema() {
    const modo = document.getElementById('modo-calculo').value;
    document.getElementById('img-serie').style.display = modo === 'serie' ? 'block' : 'none';
    document.getElementById('img-paralelo').style.display = modo === 'serie' ? 'none' : 'block';
    calcularResistencias();
}

function agregarFilaResistencia() {
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="res-input" placeholder="0" oninput="calcularResistencias()" inputmode="decimal">
        <select class="unit-select" onchange="calcularResistencias()"><option value="1">Ω</option><option value="1000">kΩ</option><option value="1000000">MΩ</option></select>`;
    document.getElementById('lista-valores').appendChild(div);
}

function calcularResistencias() {
    const filas = document.querySelectorAll('#lista-valores .fila-valor');
    const modo = document.getElementById('modo-calculo').value;
    const factor = parseFloat(document.getElementById('unidad-resultado').value);
    let vals = [];
    filas.forEach(f => {
        let v = parseFloat(f.querySelector('.res-input').value);
        let u = parseFloat(f.querySelector('.unit-select').value);
        if(!isNaN(v) && v > 0) vals.push(v * u);
    });
    if(vals.length < 2) { document.getElementById('resultado-final').innerText = "Total: --"; return; }
    let total = modo === 'serie' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    document.getElementById('resultado-final').innerText = `Total: ${(total/factor).toLocaleString(undefined,{maximumFractionDigits:3})}`;
}

// LÓGICA BOBINAS
function cambiarEsquemaBobina() {
    const modo = document.getElementById('modo-calculo-bobina').value;
    document.getElementById('img-serie-bobina').style.display = modo === 'serie' ? 'block' : 'none';
    document.getElementById('img-paralelo-bobina').style.display = modo === 'serie' ? 'none' : 'block';
    calcularBobinas();
}

function agregarFilaBobina() {
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="bob-input" placeholder="0" oninput="calcularBobinas()" inputmode="decimal">
        <select class="unit-select-bobina" onchange="calcularBobinas()"><option value="0.000001">µH</option><option value="0.001">mH</option><option value="1">H</option></select>`;
    document.getElementById('lista-valores-bobina').appendChild(div);
}

function calcularBobinas() {
    const filas = document.querySelectorAll('#lista-valores-bobina .fila-valor');
    const modo = document.getElementById('modo-calculo-bobina').value;
    const factor = parseFloat(document.getElementById('unidad-resultado-bobina').value);
    let vals = [];
    filas.forEach(f => {
        let v = parseFloat(f.querySelector('.bob-input').value);
        let u = parseFloat(f.querySelector('.unit-select-bobina').value);
        if(!isNaN(v) && v > 0) vals.push(v * u);
    });
    if(vals.length < 2) { document.getElementById('resultado-final-bobina').innerText = "Total: --"; return; }
    let total = modo === 'serie' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    document.getElementById('resultado-final-bobina').innerText = `Total: ${(total/factor).toLocaleString(undefined,{maximumFractionDigits:4})}`;
}

// LÓGICA CAPACITORES
function cambiarEsquemaCapacitor() {
    const modo = document.getElementById('modo-calculo-cap').value;
    document.getElementById('img-serie-cap').style.display = modo === 'serie' ? 'block' : 'none';
    document.getElementById('img-paralelo-cap').style.display = modo === 'serie' ? 'none' : 'block';
    calcularCapacitores();
}

function agregarFilaCapacitor() {
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="cap-input" placeholder="0" oninput="calcularCapacitores()" inputmode="decimal">
        <select class="unit-select-cap" onchange="calcularCapacitores()"><option value="0.000000000001">pF</option><option value="0.000000001">nF</option><option value="0.000001" selected>µF</option><option value="1">F</option></select>`;
    document.getElementById('lista-valores-cap').appendChild(div);
}

function calcularCapacitores() {
    const filas = document.querySelectorAll('#lista-valores-cap .fila-valor');
    const modo = document.getElementById('modo-calculo-cap').value;
    const factor = parseFloat(document.getElementById('unidad-resultado-cap').value);
    let vals = [];
    filas.forEach(f => {
        let v = parseFloat(f.querySelector('.cap-input').value);
        let u = parseFloat(f.querySelector('.unit-select-cap').value);
        if(!isNaN(v) && v > 0) vals.push(v * u);
    });
    if(vals.length < 2) { document.getElementById('resultado-final-cap').innerText = "Total: --"; return; }
    let total = modo === 'paralelo' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    document.getElementById('resultado-final-cap').innerText = `Total: ${(total/factor).toLocaleString(undefined,{maximumFractionDigits:6})}`;
}

// LÓGICA FUENTES (V y A)
function cambiarEsquemaFuente() {
    const modo = document.getElementById('modo-calculo-fnt').value;
    document.getElementById('img-serie-fnt').style.display = modo === 'serie' ? 'block' : 'none';
    document.getElementById('img-paralelo-fnt').style.display = modo === 'serie' ? 'none' : 'block';
    calcularFuentes();
}

function agregarFilaFuente() {
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.style.flexDirection = 'column'; div.style.borderBottom = '1px solid #eee'; div.style.paddingBottom = '10px';
    div.innerHTML = `<div style="display:flex; gap:5px; margin-bottom:5px;"><input type="number" class="fnt-v-input" placeholder="Voltaje (V)" oninput="calcularFuentes()" inputmode="decimal" style="flex:1;"><b>V</b></div>
        <div style="display:flex; gap:5px;"><input type="number" class="fnt-a-input" placeholder="Amperaje (A)" oninput="calcularFuentes()" inputmode="decimal" style="flex:1;"><b>A</b></div>`;
    document.getElementById('lista-valores-fnt').appendChild(div);
}

function calcularFuentes() {
    const modo = document.getElementById('modo-calculo-fnt').value;
    let volts = [], amps = [];
    document.querySelectorAll('.fnt-v-input').forEach(i => { if(i.value) volts.push(parseFloat(i.value)); });
    document.querySelectorAll('.fnt-a-input').forEach(i => { if(i.value) amps.push(parseFloat(i.value)); });
    if(volts.length < 1) return;
    let tV = modo === 'serie' ? volts.reduce((a,b)=>a+b,0) : Math.max(...volts);
    let tA = modo === 'serie' ? Math.min(...amps) : amps.reduce((a,b)=>a+b,0);
    document.getElementById('resultado-v').innerText = `Voltaje Total: ${tV} V`;
    document.getElementById('resultado-a').innerText = `Amperaje Total: ${tA} A`;
}
