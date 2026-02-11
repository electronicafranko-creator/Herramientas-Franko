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
    document.getElementById('cat-calculadoras').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    
    if(id === 'herram-resistencias') { document.getElementById('lista-valores').innerHTML = ''; agregarFilaResistencia(); agregarFilaResistencia(); }
    if(id === 'herram-bobinas') { document.getElementById('lista-valores-bobina').innerHTML = ''; agregarFilaBobina(); agregarFilaBobina(); }
    if(id === 'herram-capacitores') { document.getElementById('lista-valores-cap').innerHTML = ''; agregarFilaCapacitor(); agregarFilaCapacitor(); }
    if(id === 'herram-fuentes') { document.getElementById('lista-valores-fnt').innerHTML = ''; agregarFilaFuente(); agregarFilaFuente(); }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    const esCalc = ['herram-ley-ohm'].includes(id);
    document.getElementById(esCalc ? 'cat-calculadoras' : 'cat-conexiones').style.display = 'block';
}

// --- RESISTENCIAS ---
function agregarFilaResistencia() {
    const div = document.createElement('div'); div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="res-input" placeholder="0"><select class="unit-select"><option value="1">Ω</option><option value="1000">kΩ</option></select>`;
    document.getElementById('lista-valores').appendChild(div);
}
function calcularResistencias() {
    const modo = document.getElementById('modo-calculo').value;
    let vals = [];
    document.querySelectorAll('.res-input').forEach((inp, i) => {
        let v = parseFloat(inp.value);
        let u = parseFloat(document.querySelectorAll('.unit-select')[i].value);
        if(!isNaN(v)) vals.push(v * u);
    });
    if(vals.length < 2) return;
    let total = modo === 'serie' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    document.getElementById('resultado-final').innerText = `Total: ${total.toFixed(2)} Ω`;
}
function cambiarEsquema() {
    const modo = document.getElementById('modo-calculo').value;
    document.getElementById('img-serie').style.display = modo === 'serie' ? 'block' : 'none';
    document.getElementById('img-paralelo').style.display = modo === 'serie' ? 'none' : 'block';
}

// --- BOBINAS ---
function agregarFilaBobina() {
    const div = document.createElement('div'); div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="bob-input" placeholder="0 µH">`;
    document.getElementById('lista-valores-bobina').appendChild(div);
}
function calcularBobinas() {
    let vals = [];
    document.querySelectorAll('.bob-input').forEach(inp => { if(inp.value) vals.push(parseFloat(inp.value)); });
    if(vals.length < 2) return;
    const modo = document.getElementById('modo-calculo-bobina').value;
    let total = modo === 'serie' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    document.getElementById('resultado-final-bobina').innerText = `Total: ${total.toFixed(2)} µH`;
}
function cambiarEsquemaBobina() {
    const modo = document.getElementById('modo-calculo-bobina').value;
    document.getElementById('img-serie-bobina').style.display = modo === 'serie' ? 'block' : 'none';
    document.getElementById('img-paralelo-bobina').style.display = modo === 'serie' ? 'none' : 'block';
}

// --- CAPACITORES ---
function agregarFilaCapacitor() {
    const div = document.createElement('div'); div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="cap-input" placeholder="0 µF">`;
    document.getElementById('lista-valores-cap').appendChild(div);
}
function calcularCapacitores() {
    let vals = [];
    document.querySelectorAll('.cap-input').forEach(inp => { if(inp.value) vals.push(parseFloat(inp.value)); });
    if(vals.length < 2) return;
    const modo = document.getElementById('modo-calculo-cap').value;
    let total = modo === 'paralelo' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    document.getElementById('resultado-final-cap').innerText = `Total: ${total.toFixed(2)} µF`;
}
function cambiarEsquemaCapacitor() {
    const modo = document.getElementById('modo-calculo-cap').value;
    document.getElementById('img-serie-cap').style.display = modo === 'serie' ? 'block' : 'none';
    document.getElementById('img-paralelo-cap').style.display = modo === 'serie' ? 'none' : 'block';
}

// --- FUENTES (CORREGIDO DECIMALES) ---
function agregarFilaFuente() {
    const div = document.createElement('div'); div.className = 'fila-valor';
    div.style.flexDirection = 'column'; div.style.borderBottom = "1px solid #eee";
    div.innerHTML = `<input type="number" class="f-v" placeholder="Voltaje V"><input type="number" class="f-a" placeholder="Amperaje A">`;
    document.getElementById('lista-valores-fnt').appendChild(div);
}
function calcularFuentes() {
    let vs = [], as = [];
    document.querySelectorAll('.f-v').forEach(i => { if(i.value) vs.push(parseFloat(i.value)); });
    document.querySelectorAll('.f-a').forEach(i => { if(i.value) as.push(parseFloat(i.value)); });
    const modo = document.getElementById('modo-calculo-fnt').value;
    if(vs.length < 1) return;
    let tV = modo === 'serie' ? vs.reduce((a,b)=>a+b,0) : Math.max(...vs);
    let tA = modo === 'serie' ? Math.min(...as) : as.reduce((a,b)=>a+b,0);
    document.getElementById('resultado-v').innerText = `V Total: ${tV.toFixed(2)} V`;
    document.getElementById('resultado-a').innerText = `A Total: ${tA.toFixed(2)} A`;
}
function cambiarEsquemaFuente() {
    const modo = document.getElementById('modo-calculo-fnt').value;
    document.getElementById('img-serie-fnt').style.display = modo === 'serie' ? 'block' : 'none';
    document.getElementById('img-paralelo-fnt').style.display = modo === 'serie' ? 'none' : 'block';
}

// --- LEY DE OHM ---
function calcularLeyOhm() {
    let v = parseFloat(document.getElementById('ohm-v').value);
    let i = parseFloat(document.getElementById('ohm-i').value);
    let r = parseFloat(document.getElementById('ohm-r').value);
    let p = parseFloat(document.getElementById('ohm-p').value);
    if(!isNaN(v) && !isNaN(i)) { document.getElementById('ohm-r').value = (v/i).toFixed(2); document.getElementById('ohm-p').value = (v*i).toFixed(2); }
    else if(!isNaN(v) && !isNaN(r)) { document.getElementById('ohm-i').value = (v/r).toFixed(2); document.getElementById('ohm-p').value = (v*v/r).toFixed(2); }
    else if(!isNaN(i) && !isNaN(r)) { document.getElementById('ohm-v').value = (i*r).toFixed(2); document.getElementById('ohm-p').value = (i*i*r).toFixed(2); }
}
function limpiarOhm() { document.querySelectorAll('.form-ohm input').forEach(i => i.value = ''); }
