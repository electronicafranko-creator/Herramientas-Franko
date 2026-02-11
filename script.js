function abrirSubventana(id) {
    document.getElementById('ventana-inicio').style.display = 'none';
    document.getElementById(id).style.display = 'block';
}

function cerrarSubventana(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('ventana-inicio').style.display = 'block';
}

function abrirHerramienta(id) {
    document.querySelectorAll('.ventana-capa').forEach(v => v.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'herram-resistencias') { document.getElementById('lista-valores').innerHTML = ''; agregarFilaResistencia(); agregarFilaResistencia(); }
    if(id === 'herram-fuentes') { document.getElementById('lista-valores-fnt').innerHTML = ''; agregarFilaFuente(); agregarFilaFuente(); }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    const esCalc = ['herram-ley-ohm'].includes(id);
    document.getElementById(esCalc ? 'cat-calculadoras' : 'cat-conexiones').style.display = 'block';
}

// RESISTENCIAS
function agregarFilaResistencia() {
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="res-input" placeholder="0"><select class="unit-select"><option value="1">Ω</option><option value="1000">kΩ</option></select>`;
    document.getElementById('lista-valores').appendChild(div);
}

function calcularResistencias() {
    const modo = document.getElementById('modo-calculo').value;
    let vals = [];
    document.querySelectorAll('.res-input').forEach((input, index) => {
        let v = parseFloat(input.value);
        let u = parseFloat(document.querySelectorAll('.unit-select')[index].value);
        if(!isNaN(v)) vals.push(v * u);
    });
    if(vals.length < 2) return;
    let total = modo === 'serie' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    document.getElementById('resultado-final').innerText = `Total: ${total.toFixed(2)} Ω`;
}

// FUENTES (CON SIMPLIFICACIÓN DE DECIMALES)
function agregarFilaFuente() {
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.style.flexDirection = 'column';
    div.style.borderBottom = "1px solid #eee";
    div.innerHTML = `<input type="number" class="f-v" placeholder="Voltaje V"><input type="number" class="f-a" placeholder="Amperaje A">`;
    document.getElementById('lista-valores-fnt').appendChild(div);
}

function calcularFuentes() {
    let vs = [], as = [];
    document.querySelectorAll('.f-v').forEach(i => { if(i.value) vs.push(parseFloat(i.value)); });
    document.querySelectorAll('.f-a').forEach(i => { if(i.value) as.push(parseFloat(i.value)); });
    const modo = document.getElementById('modo-calculo-fnt').value;
    let tV = modo === 'serie' ? vs.reduce((a,b)=>a+b,0) : Math.max(...vs);
    let tA = modo === 'serie' ? Math.min(...as) : as.reduce((a,b)=>a+b,0);
    document.getElementById('resultado-v').innerText = `Total: ${tV.toFixed(2)} V`;
    document.getElementById('resultado-a').innerText = `Total: ${tA.toFixed(2)} A`;
}

// LEY DE OHM
function calcularLeyOhm() {
    let v = parseFloat(document.getElementById('ohm-v').value);
    let i = parseFloat(document.getElementById('ohm-i').value);
    let r = parseFloat(document.getElementById('ohm-r').value);
    let p = parseFloat(document.getElementById('ohm-p').value);

    if(!isNaN(v) && !isNaN(i)) {
        document.getElementById('ohm-r').value = (v/i).toFixed(2);
        document.getElementById('ohm-p').value = (v*i).toFixed(2);
    } else if(!isNaN(v) && !isNaN(r)) {
        document.getElementById('ohm-i').value = (v/r).toFixed(2);
        document.getElementById('ohm-p').value = (v*v/r).toFixed(2);
    } else if(!isNaN(i) && !isNaN(r)) {
        document.getElementById('ohm-v').value = (i*r).toFixed(2);
        document.getElementById('ohm-p').value = (i*i*r).toFixed(2);
    }
}

function limpiarOhm() {
    document.querySelectorAll('.form-ohm input').forEach(i => i.value = '');
}
